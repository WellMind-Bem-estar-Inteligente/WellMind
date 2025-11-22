import { useEffect, useState } from "react";
import type { TipoUsuario } from "../../types/tipos/tipoUsuario";
import { Link, useLocation } from "react-router-dom";

export default function Menu(){

    const [usuario, setUsuario] = useState<TipoUsuario>();

    useEffect(() =>{
        const dadosSalvos = sessionStorage.getItem("usuario");
        if (dadosSalvos) {
            setUsuario(JSON.parse(dadosSalvos));
        }
    }, []);

    const location = useLocation();

    return(
        <div>
            {usuario? (
                <div className="">
                    <Link className="" to="/">Home</Link>
                    <Link className="" to="/integrantes">Integrantes</Link>
                    <Link className="" to="/perguntas">Formulário</Link>
                </div>
            ) : (
                <div className="">
                    <Link className="" to="/">Home</Link>
                    <Link className="" to="/integrantes">Integrantes</Link>
                    <Link className="" to="/login-or-create-account">Entrar</Link>
                </div>
            )   
            }
        </div>
    )
} 