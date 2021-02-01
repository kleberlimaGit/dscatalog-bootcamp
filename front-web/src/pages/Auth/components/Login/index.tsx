import React, { useState } from 'react';
import ButtonIcon from 'core/components/Button-icon';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthCard from '../Card';
import { useForm } from 'react-hook-form';
import { makeLogin } from 'core/utils/request';
import { saveSessionData } from 'core/utils/auth';
import './styles.scss';

type FormState ={
    username:string;
    password:string;
}

type LocationState = {
    from :string;
}

const Login = () => {
    const {register, handleSubmit, errors} = useForm<FormState>();
    const [hasError, setHasError] = useState(false);
    const history = useHistory();
    const location = useLocation<LocationState>();
    const [passwordIcon,setPasswordIcon] = useState('fa-eye-slash');
    const [inputType, setInputType] = useState('password');


    const { from } = location.state || { from: { pathname: "/admin" } };

    const onSubmit = (data: FormState) =>{
        //console.log(data);
       makeLogin(data)
       .then(response => {
           setHasError(false);
           saveSessionData(response.data);
           history.replace(from);
       })
       .catch(()=> {
           setHasError(true)
       })
    }

    const handleShowPassword = () =>{
        if(passwordIcon === "fa-eye-slash"){
            setPasswordIcon('fa-eye')
            setInputType('text')
        }else{
            setPasswordIcon('fa-eye-slash')
            setInputType('password') 
        }
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
                
                <div className="content-password">
                    <input type={inputType}
                    className={`form-control input-base input-password ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Senha" 
                    name="password" ref={register({required: "Campo obrigatório"})}/>
                    <span className={`input-eye d-inline-block far ${passwordIcon}`} onClick={handleShowPassword}></span>
                    {errors.password && (
                    <span className="invalid-feedback d-block">
                        {errors.password.message}
                    </span>
                    )}
                </div>
                
                
                <Link to="/auth/recover" className="login-link-recover">
                    Esqueci a senha?
                </Link>
                <div className="login-submit-button">
                    <ButtonIcon text="logar"/>
                </div>

                <div className="d-flex justify-content-center login-text-reg">
                    <span className="not-registered">
                        Não tem Cadastro?
                    </span>
                    <Link to="/auth/register" className="format-link-reg">
                        Cadastrar
                    </Link>
                </div>

            </form>

        </AuthCard>
    )

}


export default Login;