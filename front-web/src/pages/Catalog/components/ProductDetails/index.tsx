import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from 'core/assets/images/Seta.svg'

import './styles.scss'
import ProductPrice from 'core/components/ProductPrice';
import { makeRequest } from 'core/utils/request';
import { Product } from 'core/types/Products';
import ProductInfoLoader from '../Loaders/ProductInfoLoader';
import ProductDescriptionLoader from '../Loaders/ProductDescripitionLoader';

type ParamsType = {
    productId: string;
}


const ProductDetails = () => {
    const { productId } = useParams<ParamsType>();
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState(false);
    console.log(productId);

    useEffect(() => {
        setIsLoading(true)
        makeRequest({ url: `/products/${productId}` })
            .then((response) => setProduct(response.data))
            .finally(() => {
                setIsLoading(false);
            })

    }, [productId])

    return (
        <div className="product-details-container">
            <div className="card-base product-details ">
                <Link to="/products" className="product-details-goback d-flex">
                    <ArrowIcon className="icon-goback" />
                    <h1>VOLTAR</h1>
                </Link>
                <div className="row product-details-content">
                    <div className="col-lg-6 pr-lg-5 pr-sm-3 mb-sm-4 px-0 col-12">
                        {isLoading ? <ProductInfoLoader/> : (
                            <>
                                
                                    <div className="product-details-card text-center mx-auto">
                                        <img src={product?.imgUrl} alt={product?.name} className="product-details-image " />
                                    </div>
                                    <h1 className="product-type">{product?.name}</h1>
                                    {product?.price && <ProductPrice price={product?.price} />}
                        
                            </>

                        )}
                    </div>


                    <div className="col-lg-6 product-details-card mx-auto">
                        {isLoading ? <ProductDescriptionLoader/> : (
                            <>
                                <h2 className="product-description-title">
                                    Descrição do Produto
                                </h2>
                                <p className="product-description">
                                    {product?.description}
                                </p>
                            </>

                        )}
                    </div>

                    </div>
            </div>

        </div>
    );
};


export default ProductDetails;