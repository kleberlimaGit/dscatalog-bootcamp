import ProductPrice from 'core/components/ProductPrice';
import React from 'react';
import './styles.scss'
const Card = () =>  {
    return (
        <div className="card-base product-card-admin">
            <div className="row">
                <div className="col-2 text-center border-right py-3">
                    <img src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/4-big.jpg" 
                    alt="Pc Gamer" className="product-card-image-admin"/>
                </div>
                <div className="col-7">
                    <h3 className="product-card-name-admin ">
                        computador i7
                    </h3>
                    <ProductPrice price={2999}/>
                    <div>
                    <span className="badge badge-pill badge-secondary mr-2">Categoria 1</span>
                    <span className="badge badge-pill badge-secondary mr-2">Categoria 2</span>
                    </div>
                </div>
                <div className="col-3 d-flex flex-column justify-content-center">
                <button type="button" className="btn btn-outline-secondary btn-lg mb-2 btn-edit">EDITAR</button>
                <button type="button" className="btn btn-outline-danger btn-lg">EXCLUIR</button>

                </div>
            </div>
        </div>
    )
}

export default Card;