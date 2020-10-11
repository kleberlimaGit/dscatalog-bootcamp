import React from 'react';
import './styles.scss';
import {ReactComponent as MainImage} from '../../core/assets/images/Desenho.svg'
import ButtonIcon from '../../core/components/Button-icon';

const Home = () => (

<div className="row home-container d-flex">
    <div className="home-content d-flex card-base">
        <div className="col-6">
            <h1>Conheça o melhor<br/> catálogo de produtos</h1>
            <p>Ajudaremos você a encontrar os melhores<br/> produtos disponíveis no mercado</p>
            <ButtonIcon text="Inicie agora a sua busca"/>
        </div>

        <div className="col-6">
            <MainImage className="main-image"/>
        </div>

    </div>
</div>

);

export default Home;