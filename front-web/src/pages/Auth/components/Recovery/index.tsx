import React from 'react'
import AuthCard from '../Card';
import './styles.scss';

const Recovery = () => {
    return (
        <AuthCard title="Recuperação">

            <form action="#">
                <input type="email" name="" className="form-control input-base mb-4 mt-5" placeholder="Digite o Email Cadastrado"/>
                <input type="email" name="" className="form-control input-base " placeholder="Repita o Email Cadastrado"/>

                <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-danger px-3 text-uppercase btn-recovery">cancelar</button>
                    <button className="btn btn-primary text-uppercase px-3 btn-recovery">enviar</button>
                </div>

            </form>

        </AuthCard>


    );
}

export default Recovery;