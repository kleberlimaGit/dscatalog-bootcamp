import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import ProductCard from './components/ProductCard';
import './styles.scss'
import Pagination from 'core/components/Pagination';
import { makeRequest } from '../../core/utils/request';
import { ProductResponse } from '../../core/types/Products';
import ProductCardLoader from './components/Loaders/ProductCardLoader';

const Catalog = () => {

const [productsResponse, setProductResponse] = useState<ProductResponse>();
const [isLoading, setIsLoading] = useState(false);
const [activePage, setActivePage] = useState(0);



useEffect(() => {
    const params = {
        page:activePage,
        linesPerPage: 12
    }


    // iniciar o loader
    setIsLoading(true);
    makeRequest({url:'/products', params})
    .then(response => {
        setProductResponse(response.data)
    })
    .finally(() => {
        setIsLoading(false)
    })
},[activePage]);

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
        { isLoading ? "" : productsResponse && (
            <Pagination 
            totalPages={productsResponse.totalPages}
            activePage={activePage}
            onChange={page => setActivePage(page)}
            />
            )}
    </div>
);

};

export default Catalog;