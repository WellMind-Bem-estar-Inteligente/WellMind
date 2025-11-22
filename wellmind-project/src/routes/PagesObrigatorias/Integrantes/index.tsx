import { Link } from "react-router-dom";
import CardIntegrantes from "../../../components/CardIntegrante/CardIntegrante";
import type { TipoIntegrante } from "../../../types/tipos/tipoIntegrante";
import {integrantes} from "../../../data/integrantes";

export default function Integrantes(){
    
    const todosIntegrante: TipoIntegrante[] = integrantes;

    return(
        <main className="">
            <h1 className="">Integrantes</h1>
            <div className="">{todosIntegrante.map((i) => (
                <Link to={`/integrantes/${i.id}`}>
                    <CardIntegrantes integrante={i}/>
                </Link>
            ))}
            </div>
            <p>Clique no Card para ver detalhes dos integrantes da 1TDSPH</p>
        </main>
    );
} 
  