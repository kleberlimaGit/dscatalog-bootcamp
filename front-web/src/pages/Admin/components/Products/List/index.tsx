import Pagination from 'core/components/Pagination';
import { ProductResponse } from 'core/types/Products';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Card'
import CardLoader from '../Loaders/ProductCardLoader';
import './styles.scss'


const List = () => {      
    const [productsResponse, setProductResponse] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

    console.log(productsResponse)

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            direction: 'DESC',
            orderBy: 'id'
        }



        setIsLoading(true);
        makeRequest({ url: `/products?page=${activePage}`, params })
            .then(response => {
                setProductResponse(response.data)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [activePage]);



    useEffect(() => {
        getProducts();
    }, [getProducts]);



    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    const onRemove = (productId: number) => {
        makePrivateRequest({ url: `/products/${productId}`, method: "DELETE" })
            .then(() => {
                toast.success('Produto removido com sucesso.');
                getProducts();
            })
            .catch(() => {
                toast.error('Erro ao tentar remover produto.');
            })
    }

    return (
        <div className="admin-products-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate} >
                ADICIONAR
            </button>
            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Card product={product} key={product.id} onRemove={onRemove} />
                    ))
                )}

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

