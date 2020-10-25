import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import ProductCard from './components/ProductCard';
import './styles.scss'
import { makeRequest } from '../../core/utils/request';
import { ProductResponse } from '../../core/types/Products';
import ProductCardLoader from './components/Loaders/ProductCardLoader';

const Catalog = () => {
// quando o componente iniciar, buscar a lista de produtos


// quando a lista de produtos estiver disponivel, popular um estado no componente e listar os produtos dinamicamente

const [productsResponse, setProductResponse] = useState<ProductResponse>();
const [isLoading, setIsLoading] = useState(false);
console.log(productsResponse);
useEffect(() => {
    const params = {
        page:0,
        linesPerPage: 12
    }

    // iniciar o loader
    setIsLoading(true);
    makeRequest({url:'/products', params})
    .then(response => setProductResponse(response.data))
    .finally(() => {
        setIsLoading(false)
    })
},[]);

return (
    <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de produtos</h1>
        
        <div className="catalog-products">
         {isLoading ? <ProductCardLoader/> : ( 
                productsResponse?.content.map(product =>(
                    <Link to={`/products/${product.id}`} key={product.id}>
                        <ProductCard product={product} />
                    </Link>   
         )

            ))} 
      
        </div>
    </div>
);

};

export default Catalog;