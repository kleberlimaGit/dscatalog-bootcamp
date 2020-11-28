import React from 'react';
import ButtonIcon from 'core/components/Button-icon';
import { Link } from 'react-router-dom';
import AuthCard from '../Card';
import { useForm } from 'react-hook-form';
import './styles.scss';

type FormData ={
    email:string;
    password:string;
}

const Login = () => {
    const {register, handleSubmit} = useForm<FormData>();

    const onSubmit = (data: FormData) =>{
        console.log(data);
    }

    return (
        <AuthCard title="Login">
            <form className="login-form" onSubmit = {handleSubmit(onSubmit)}>
                
                <input type="email" 
                className="form-control input-base margin-input-32"
                placeholder="Email" 
                name="email" ref={register}/>

                <input type="password" 
                className="form-control input-base" 
                placeholder="Senha" 
                name="password" ref={register}/>
                
                <Link to="/admin/auth/recover" className="login-link-recover">
                    Esqueci a senha?
                </Link>
                <div className="login-submit-button">
                    <ButtonIcon text="logar"/>
                </div>

                <div className="d-flex justify-content-center login-text-reg">
                    <span className="not-registered">
                        Não tem Cadastro?
                    </span>
                    <Link to="/admin/auth/register" className="format-link-reg">
                        Cadastrar
                    </Link>
                </div>

            </form>

        </AuthCard>
    )

}


export default Login;