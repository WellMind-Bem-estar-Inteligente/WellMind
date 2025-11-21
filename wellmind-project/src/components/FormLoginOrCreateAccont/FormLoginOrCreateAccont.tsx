import type { TipoPropsFormLoginOrcreateAccount } from "../../types/Forms/tipoFormLoginOrCreateAccount";

export default function FormloginOrCreateAccount({register, onSubmit}: TipoPropsFormLoginOrcreateAccount){
    return(
        <div>
            <form className="" onSubmit={onSubmit}>
                <div>
                    <label className="">Email: </label>
                    <input className="" type="email" {...register("email", { required: true, maxLength: 200})} />
                </div>
                <div className="">   
                    <div className="">
                        <button className="" type="submit">Entrar</button>
                    </div>
                </div>
            </form> 
        </div>
    );
}