import Menu from "../Menu/Menu";
import { Link, useLocation, useParams } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';
import logo from "../../Images/ImgCabecalho/wellmind-logo.png";

export default function Cabecalho(){
    const {id} = useParams<string>();
    const location = useLocation();
    const isHome = location.pathname === "/";
    const isIntegrantesDetails = location.pathname.startsWith("/integrantes/") && id;
    return(
        <header>
            <div className="flex flex-col">

                <div className="flex flex-wrap">

                    {isIntegrantesDetails ? (<Link className="" to="/integrantes"><FiArrowLeft /></Link>) : !isHome ? (<Link className="" to="/"><FiArrowLeft /></Link>) : (<div className=""></div>)}
                    
                    <div className="flex flex-col">
                        <Link to="/"><img className="" src={logo} alt="Imagem do Logo do WellMind Bem-estar"/></Link>
                        <h1>WellMind Bem-estar</h1>
                    </div>
                </div>

                <Menu/>

            </div>
        </header>
    );
} 