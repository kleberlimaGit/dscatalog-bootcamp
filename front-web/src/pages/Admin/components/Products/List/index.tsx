import Pagination from 'core/components/Pagination';
import { ProductResponse } from 'core/types/Products';
import { makeRequest } from 'core/utils/request';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Card'
import './styles.scss'


const List = () => {

    const [productsResponse, setProductResponse] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

    console.log(productsResponse)

    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 4
        }

        // iniciar o loader
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => {
                setProductResponse(response.data)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [activePage]);



    const handleCreate = () => {
        history.push('/admin/products/create');
    }
    return (
        <div className="admin-products-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate} >
                ADICIONAR
            </button>
            <div className="admin-list-container">
                {productsResponse?.content.map(product => (
                    <Card product={product} key={product.id} />
                ))}
                
                {isLoading ? "" : productsResponse && (
                    <Pagination
                        totalPages={productsResponse.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)}
                    />
                )}
            </div>
        </div>
    );
}

export default List;

