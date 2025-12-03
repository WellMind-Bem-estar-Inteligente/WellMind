import { useEffect } from "react";
import type { tipoHabito } from "../../../types/tipos/tipoHabito";
import type { tipoPerguntas } from "../../../types/tipoForm/tipoPerguntas";

const URL_API = import.meta.env.VITE_URL_API;  
const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY;

export default function Feedback() {
    const usuarioSessionRaw = sessionStorage.getItem("usuario");
    
    const respostasSessionRaw = sessionStorage.getItem("respostasEncontradas");

    useEffect(() => {
        const fetchdata = async () => {
            const response = await fetch(`${URL_API}/habito`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const habitos: tipoHabito[] = await response.json();

            const usuarioSession = usuarioSessionRaw ? JSON.parse(usuarioSessionRaw) : null;
            const idDoUsuario = usuarioSession?.idUsuario ?? null;

            const respostas: tipoPerguntas[] = respostasSessionRaw? JSON.parse(respostasSessionRaw): [];


            function gerarPrompt(habitos: tipoHabito[], respostas: tipoPerguntas[]) {
                const regras = `
            REGRAS IMPORTANTES PARA ANÁLISE DAS RESPOSTAS:
            - ESTRESSE E FOCO → escala de 1 a 5
            - HUMOR E ENERGIA → escala de 1 a 5
            - SONO → escala de 1 a 24
            - HIDRATAÇÃO (litros de água consumidos) → escala de 1 a 10
            - ALIMENTAÇÃO (quantidade de refeições feitas) → escala de 1 a 10
            - OBSERVAÇÕES → texto livre (qualquer texto escrito pelo usuário)
                `.trim();

                // montar bloco de respostas com nome do hábito
                const respostasFormatadas = respostas
                    .map((r) => {
                        const h = habitos.find(h => h.idHabito === r.idHabito);
                        const nome = h?.tipo ?? `Hábito ${r.idHabito}`;
                        
                        return `
            Hábito: ${nome}
            Valor informado: ${r.resposta ?? "nenhum"}
            Observações: ${r.observacoes ?? "nenhuma"}
                        `.trim();
                    })
                    .join("\n\n");

                // prompt final completo enviado para IA
                const promptFinal = `
            Você é uma IA especialista em bem-estar corporativo.

            Construa um feedback sobre a saúde desse funcionário na empresa,
            considerando suas respostas no diário do dia.

            ${regras}

            RESPOSTAS DO USUÁRIO:
            ${respostasFormatadas}

            Agora gere um FEEDBACK COMPLETO, com no máximo 1000 caracteres, contendo:
            1. Um breve resumo da condição geral do funcionário hoye.
            2. Três recomendações práticas (curtas e aplicáveis).
            3. Um alerta se algum valor estiver fora do ideal.
            4. Um tom humano, acolhedor e motivador.
                `.trim();

                return promptFinal;
            }


           async function gerarFeedback(prompt: string) {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${GROQ_KEY}`
                },
                body: JSON.stringify({
                    model: "llama3-8b-8192",
                    messages: [
                        { role: "user", content: prompt }
                    ]
                })
            });

            const data = await response.json();
            console.log("Resposta Groq:", data);

            return data.choices?.[0]?.message?.content || "Erro ao gerar feedback.";
        }

            

            function montarJsonFeedback(respostas: tipoPerguntas[], feedbackTexto: string, idUsuario: number) {
                return respostas.map(r => ({
                    idUsuario: idUsuario,
                    mensagem: feedbackTexto
                }));
            }

            const prompt = gerarPrompt(habitos, respostas);
            const feedbackIA = await gerarFeedback(prompt);

            const json_feedback = montarJsonFeedback(respostas, feedbackIA, idDoUsuario);

            for (const item of json_feedback) {
                const responseSave = await fetch(`${URL_API}/feedback`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        idUsuario: item.idUsuario,
                        mensagem: item.mensagem
                    })
                });

                if (!responseSave.ok) {
                    console.error("Erro ao salvar feedback:", await responseSave.text());
                }
            }
        } 
        fetchdata();
    }, []);

    return (
        <main className="mt-20 flex flex-col items-center text-black font-bold text-[1.2rem]">
            <h1>Feedback do Dia</h1>        
            <p>{}</p>   
        </main>
    );
}
