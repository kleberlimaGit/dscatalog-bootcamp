import React from 'react';
import './styles.scss';
import { ReactComponent as AuthImage } from 'core/assets/images/Desenho-login.svg';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Recovery from './components/Recovery';


const Auth = () => (
    <div className="auth-container">
        <div className="auth-info">
            <h1 className="auth-info-title">
                Divulgue seus produtos <br />
                no Ds Catalog
                </h1>
            <p className="auth-info-subtitle">
                Faça parte do nosso catálogo de divulgação e <br />
                    aumente a venda dos seus produtos.
                </p>
            <AuthImage className="auth-img"/>
        </div>
        <div className="auth-content">
                <Switch>
                    <Route path="/auth/login">
                        <Login/>
                    </Route>
                    <Route path="/auth/register">
                        <Cadastro/>
                    </Route>
                    <Route path="/auth/recover">
                        <Recovery/>
                    </Route>

                </Switch>
            
        </div>
    </div>

);


export default Auth;