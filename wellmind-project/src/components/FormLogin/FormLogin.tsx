import type { TipoPropsFormLogin } from "../../types/Forms/tipoFormLogin"

export default function FormLogin({register, onSubmit}: TipoPropsFormLogin){
    return(
        <div>
            <form className="" onSubmit={onSubmit}>
                <div>
                    <label className="">Nome: </label>
                    <input className="" type="text" {...register("nome", { required: true, maxLength: 200})} />
                </div>
                <div className="">
                    <label className="">Email: </label>
                    <input className="" type="email" {...register("email", { required: true, maxLength: 200})} />
                </div>
                <div className="">
                    <div>
                        <button className="" type="submit">Entrar</button>
                    </div>
                </div>
            </form>
        </div>
    ); 
}