import type { TipoPropsFormCadastro } from "../../types/Forms/tipoFormCadastro";

export default function FormCadastro({register, onSubmit}: TipoPropsFormCadastro){
    return( 
        <div>
            <form className="" onSubmit={onSubmit}>
                <div className="">
                    <label className="">Email: </label>
                    <input className="" type="email" {...register("email", { required: true, maxLength: 200})} />
                </div>
                <div className="">
                    <label className="">Nome: </label>
                    <input className="" type="text" {...register("nome", { required: true, maxLength: 200})} />
                </div>
                <div>
                    <label className="">Idade: </label>
                    <input className="" type="number" {...register("idade", { required: true})} />
                </div>
                <div className="">
                    <label className="">Gênero: </label>
                    <input className="" type="text" {...register("genero", { required: true, maxLength: 100})} />
                </div>
                <div className="">
                    <div>
                        <button className="" type="submit">Cadastrar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}