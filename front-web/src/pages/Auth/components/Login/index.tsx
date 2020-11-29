import React, { useState } from 'react';
import ButtonIcon from 'core/components/Button-icon';
import { Link, useHistory } from 'react-router-dom';
import AuthCard from '../Card';
import { useForm } from 'react-hook-form';
import './styles.scss';
import { makeLogin } from 'core/utils/request';
import { saveSessionData } from 'core/utils/auth';

type FormData ={
    username:string;
    password:string;
}

const Login = () => {
    const {register, handleSubmit, errors} = useForm<FormData>();
    const [hasError, setHasError] = useState(false);
    const history = useHistory();

    const onSubmit = (data: FormData) =>{
        //console.log(data);
       makeLogin(data)
       .then(response => {
           setHasError(false);
           saveSessionData(response.data);
           history.push('/admin')
       })
       .catch(()=> {
           setHasError(true)
       })
    }

    return (
        <AuthCard title="Login">
            {hasError && (
                <div className="alert alert-danger mt-3">
                    Usuário ou senha inválidos!
                </div>
            )}

            <form className="login-form" onSubmit = {handleSubmit(onSubmit)}>
                <div className="margin-input-32">
                <input type="email" 
                className={`form-control input-base ${errors.username ? 'is-invalid': ''}`}
                placeholder="Email" 
                name="username" ref={register({
                    required: "Campo obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido"
                    }
                  })}/>
                {errors.username && (
                    <span className="invalid-feedback d-block">
                        {errors.username.message}
                    </span>
                )}
                </div>
                
                <div>
                    <input type="password" 
                    className={`form-control input-base ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Senha" 
                    name="password" ref={register({required: "Campo obrigatório"})}/>
                    {errors.password && (
                    <span className="invalid-feedback d-block">
                        {errors.password.message}
                    </span>
                    )}
                </div>
                
                
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