import { useNavigate } from "react-router-dom";
import FormCadastro from "../../../components/FormCadastro/FormCadastro";
import { useForm } from "react-hook-form";
import type { tipoCadastro } from "../../../types/tipoForm/tipoCadastro";
import { useState } from "react";

const URL_API = import.meta.env.VITE_URL_API;

export default function Cadastro(){

    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<tipoCadastro>();
    const [loading, setLoading] = useState(false);

    const onSubmit =  handleSubmit(async (data) =>{
        setLoading(true);
        const dados = {
            email: data.email, 
            nome: data.nome,
            idade: Number(data.idade),
            genero: data.genero.toUpperCase()
        }; 
        await fetch(`${URL_API}/usuario`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        }); 
        alert("Cadastro feito com sucesso!");
        navigate("/");
        window.location.reload();
        sessionStorage.setItem("usuario", JSON.stringify(data));
        setLoading(false);
    }); 

    return(
        <main className="mt-105 lg:mt-60 flex flex-col items-center text-[var(--color-font-black)] font-bold text-[1.2rem]">
            {
                loading 
                ? <p className="text-[var(--color-font-black)] m-5">Cadastrando usuário...</p>
                : <>
                    <h1>Cadastro</h1>
                    <p className="text-center text-[var(--color-font-black)] m-5">Você não possui cadastro, cadastre-se agora</p>
                    <FormCadastro
                        register={register}
                        onSubmit={onSubmit}
                    />
                  </>
            }
        </main>
    );
}
