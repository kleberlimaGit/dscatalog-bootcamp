import React from 'react'
import AuthCard from '../Card';
import './styles.scss'


const Cadastro =  () => {
    return (
        <AuthCard title = "Cadastro">

            <form action="#">
                <input type="text" name=""  className="form-control input-base mb-4 mt-5" required placeholder="Nome"/>
                <input type="text" name=""  className="form-control input-base mb-4" required placeholder="Sobrenome"/>
                <input type="text" name=""  className="form-control input-base mb-4" required placeholder="Email"/>
                <input type="password" name="password"  className="form-control input-base mb-4" required placeholder="Digite aqui a Senha"/>
                <input type="password" name="repeatPassword"  className="form-control input-base mb-4"  required placeholder="Repita aqui a Senha"/>
                
                <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-danger text-uppercase px-3 btn-register">cancelar</button>
                    <button className="btn btn-primary text-uppercase px-3 btn-register">Cadastrar</button>
                </div>    
            </form>


        </AuthCard>

    );
}


export default Cadastro