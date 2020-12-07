import ProductPrice from 'core/components/ProductPrice';
import { Product } from 'core/types/Products';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss'


type Props = {
    product: Product;

}

const Card = ({ product }: Props) => {
    return (
        <div className="card-base product-card-admin">
            <div className="row">
                <div className="col-2 text-center border-right py-3">
                    <img src={product.imgUrl}
                        alt={product.name} className="product-card-image-admin" />
                </div>
                <div className="col-7">
                    <h3 className="product-card-name-admin ">
                        {product.name}
                    </h3>
                    <ProductPrice price={product.price} />
                    <div>
                       {/* {product.categories.map(category => (
                            <span className="badge badge-pill badge-secondary mr-2">{category}</span>
                        ))}*/}
                        <span className="badge badge-pill badge-secondary mr-2">Categoria 1</span>
                        <span className="badge badge-pill badge-secondary mr-2">Categoria 2</span>

                    </div>
                </div>
                <div className="col-3 d-flex flex-column justify-content-center">
                    <Link to={`/admin/products/${product.id}`} type="button" className="btn btn-outline-secondary btn-lg mb-2 btn-edit">EDITAR</Link>
                    <button type="button" className="btn btn-outline-danger btn-lg">EXCLUIR</button>

                </div>
            </div>
        </div>
    )
}

export default Card;