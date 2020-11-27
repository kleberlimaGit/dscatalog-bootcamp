import ButtonIcon from 'core/components/Button-icon';
import React from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';


const Login = () => {
    return (
        <AuthCard title="Login">
            <form className="login-form">
                
                <input type="email" 
                className="form-control input-base margin-input-32"
                placeholder="Email" />

                <input type="password" 
                className="form-control input-base" 
                placeholder="Senha" />
                
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