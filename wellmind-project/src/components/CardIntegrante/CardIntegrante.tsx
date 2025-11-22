import type { TipoIntegrante } from "../../types/tipos/tipoIntegrante";

export default function CardIntegrantes(props:{integrante:TipoIntegrante}){
    return(
        <div className="">
            <h2 className="">{props.integrante.nome}</h2>
            <img className="" src={props.integrante.urlImg} alt="Foto do integrante" />
        </div>
    );
} 