import { useParams, Link  } from "react-router-dom";
import type { TipoIntegrante } from "../../../types/tipos/tipoIntegrante";
import { FaGithub, FaLinkedin} from "react-icons/fa";
import {integrantes} from "../../../data/integrantes";

export default function IntegrantesDetails(){ 
    const {id} = useParams<string>();

    const integrante: TipoIntegrante[] = integrantes.filter(i => i.id === Number(id));
    const encontrado = integrante[0];
    
    return(
        <main className="">
            <h1 className="">Detalhes do {encontrado.nome}</h1>
            <div>
                <div className="">
                    <img className="" src={encontrado.urlImg} alt={`Imagem do ${encontrado.nome}`} />
                    <p>{encontrado.paragrafo}</p>
                    <div className="">
                        <Link className="" target="_blank" rel="noopner noreferrer" to={`${encontrado.urlGit}`}><FaGithub/></Link>
                        <Link className="" target="_blank" rel="noopner noreferrer" to={`${encontrado.urlLinkedIn}`}><FaLinkedin/></Link>  
                    </div>
                </div>
            </div>
        </main>
    );
}