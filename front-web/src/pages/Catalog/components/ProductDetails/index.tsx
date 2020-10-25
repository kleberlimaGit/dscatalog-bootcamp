import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {ReactComponent as ArrowIcon} from '../../../../core/assets/images/Seta.svg'
import {ReactComponent as Computer} from '../../../../core/assets/images/Computer.svg'

import './styles.scss'
import ProductPrice from '../../../../core/components/ProductPrice';

type ParamsType = {
    productId: string;
}


const ProductDetails = () => {
    const {productId} = useParams<ParamsType>();
    console.log(productId);
    return (
        <div className="product-details-container">
            <div className="card-base product-details ">
            <Link to="/products" className="product-details-goback d-flex">
                <ArrowIcon className="icon-goback"/>
                <h1>VOLTAR</h1>
            </Link>
            <div className="row">
                <div className="col-6 pr-5">
                    <div className="product-details-card text-center">
                       <Computer className="product-details-image"/> 
                    </div>
                    <h1 className="product-type">Computador Desktop - Intel Core i7</h1>
                    <ProductPrice price={2779}/>
                </div>

                <div className="col-6 product-details-card">
                    <h2 className="product-description-title">
                        Descrição do Produto
                    </h2>
                    <p className="product-description">
                        Seja um mestre em multitarefas com a capacidade para exibir quatro aplicativos simultâneos na tela. 
                        A tela está ficando abarrotada? Crie áreas de trabalho virtuais para obter mais espaço e trabalhar com os itens que você deseja. 
                        Além disso, todas as notificações e principais configurações são reunidas em uma única tela de fácil acesso.
                    </p>
                </div>

            </div>
            </div>
            
        </div>
    );
};


export default ProductDetails;