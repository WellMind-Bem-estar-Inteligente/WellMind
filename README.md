# WellMind — Plataforma Inteligente de Bem-Estar e Autocuidado
### Sistema Preditivo de Recomendações de Hábitos Saudáveis com Inteligência Artificial

---

## 1. Visão Geral da Solução

O **WellMind** é uma plataforma web voltada para o monitoramento contínuo da saúde física e mental. O sistema coleta diariamente indicadores comportamentais e fisiológicos do usuário — tais como qualidade do sono, níveis de estresse, hidratação, foco, nutrição e humor — e os submete a um motor de Inteligência Artificial Generativa.

A partir da análise contextual dos dados e do histórico individual, o WellMind gera diagnósticos personalizados em tempo real, fornecendo orientações práticas e adaptadas à rotina do usuário para mitigar sobrecargas e estimular a formação de hábitos saudáveis.

---

## 2. Arquitetura do Sistema

A solução é composta por uma arquitetura distribuída e desacoplada, dividida em três camadas principais:

```
+-------------------------------------------------------------------------+
|                         Camada de Apresentação                          |
|         React 19 / Vite 7 / TypeScript / Tailwind CSS 4                 |
|       Formulários com Validação Estrita (React Hook Form + Zod)         |
+------------------------------------+------------------------------------+
                                     | HTTPS / JSON
                                     v
+-------------------------------------------------------------------------+
|                          Camada de Negócio                              |
|           API RESTful em Java com Framework Quarkus                     |
|           Controle de Sessão, Orquestração e Regras de Negócio          |
+-------------------+---------------------------------+-------------------+
                    |                                 |
                    v                                 v
+------------------------------------+   +--------------------------------+
|       Persistência de Dados        |   |     Motor de Inteligência      |
|        Oracle Database 19c         |   |    Inteligência Artificial     |
|   Modelagem Relacional (3FN)       |   |    Generativa (LLM Engine)     |
+------------------------------------+   +--------------------------------+
```

### Fluxo Operacional:
1. **Coleta de Métricas:** O usuário responde ao check-in diário no frontend web, com validação estrita de dados em tempo de execução via Zod.
2. **Processamento:** A API construída em Quarkus recebe e consolida as métricas, validando as informações e registrando-as no Oracle Database.
3. **Inferência por IA:** O backend orquestra uma chamada contextualizada ao modelo generativo, confrontando o histórico do usuário com as novas variáveis registradas.
4. **Devolutiva:** O feedback consolidado é retornado ao frontend com sugestões acionáveis e atualizações do histórico de progresso.

---

## 3. Matriz Tecnológica

| Camada | Tecnologias Utilizadas |
|:---|:---|
| **Frontend** | React 19, TypeScript, Vite 7, Tailwind CSS 4, React Router DOM 7, React Hook Form, Zod |
| **Backend** | Java 17+, Quarkus (Framework Cloud-Native), RESTful API |
| **Banco de Dados** | Oracle Database (Oracle SQL Developer, Oracle Data Modeler) |
| **Hospedagem & Infraestrutura** | Vercel (Frontend SPA), Render (Backend API) |
| **Versionamento & Governança** | Git, GitHub |

---

## 4. Estrutura do Repositório

```
wellmind/
├── README.md
└── wellmind-project/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Cabecalho/
    │   │   ├── CardIntegrante/
    │   │   ├── FormCadastro/
    │   │   ├── FormLogin/
    │   │   ├── FormLoginOrCreateAccount/
    │   │   ├── FormPerguntas/
    │   │   ├── Menu/
    │   │   └── Rodape/
    │   ├── data/
    │   ├── Images/
    │   ├── routes/
    │   │   ├── PagesObrigatorias/
    │   │   └── PagesSolucao/
    │   │       ├── Cadastro/
    │   │       ├── Feedback/
    │   │       ├── Login/
    │   │       ├── LoginOrCreateAccount/
    │   │       └── Perguntas/
    │   ├── types/
    │   ├── App.tsx
    │   ├── globals.css
    │   └── main.tsx
    ├── .env.example
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

---

## 5. Especificação dos Endpoints Principais

A API RESTful disponibiliza endpoints padronizados para autenticação, obtenção de questionários e processamento de feedbacks.

### 5.1. Listar Perguntas do Check-in
* **Rota:** `GET /api/perguntas`
* **Descrição:** Retorna o conjunto padronizado de perguntas e opções para preenchimento diário.
* **Resposta esperada:** `200 OK`

### 5.2. Submeter Respostas do Dia
* **Rota:** `POST /api/respostas`
* **Descrição:** Recebe os dados de autoavaliação do usuário e inicia a análise preditiva.
* **Corpo da requisição (Payload):**
```json
{
  "userId": 1024,
  "dataRegistro": "2026-11-16",
  "horasSono": 7.5,
  "nivelEstresse": 3,
  "nivelHidratacaoLitros": 2.2,
  "humor": "PRODUTIVO",
  "qualidadeAlimentacao": 4,
  "observacoes": "Dia produtivo, porém com leve sobrecarga no período da tarde."
}
```
* **Resposta esperada:** `201 Created`

### 5.3. Consultar Feedback Gerado
* **Rota:** `GET /api/feedback/:idUser`
* **Descrição:** Recupera a análise qualitativa e quantitativa processada pelo motor de IA.
* **Resposta esperada:** `200 OK` com payload contendo diagnóstico, sugestões de hábitos e pontuação geral de bem-estar.

---

## 6. Instalação e Execução Local

### Pré-requisitos
* Node.js (versão 18.x ou superior)
* Gerenciador de pacotes npm ou yarn
* Git configurado

### Instruções de Execução

1. **Clonar o repositório:**
```bash
git clone https://github.com/WellMind-Bem-estar-Inteligente/WellMind.git
```

2. **Acessar a pasta do frontend:**
```bash
cd WellMind/wellmind-project
```

3. **Instalar as dependências do projeto:**
```bash
npm install
```

4. **Configurar variáveis de ambiente:**
Crie um arquivo `.env` na raiz do diretório `wellmind-project` com base no arquivo `.env.example`:
```bash
VITE_API_URL=https://sua-api-render.onrender.com/api
```

5. **Executar o servidor de desenvolvimento:**
```bash
npm run dev
```
A aplicação estará acessível em `http://localhost:5173`.

---

## 7. Ambientes e Links Oficiais

* **Aplicação em Produção (Deploy):** [https://wellmind-liart.vercel.app/](https://wellmind-liart.vercel.app/)
* **Repositório Oficial no GitHub:** [https://github.com/WellMind-Bem-estar-Inteligente/WellMind](https://github.com/WellMind-Bem-estar-Inteligente/WellMind)

---

## 8. Equipe de Desenvolvimento

* **Gabriel Sbrana Campos**
  * Contato: sbranaww@gmail.com
* **Moisés Waidemann Molinillo Júnior**
  * Contato: jrmolinillo12@gmail.com
* **Thiago Rodrigues da Mota**
  * Contato: thiago_mota123@hotmail.com
