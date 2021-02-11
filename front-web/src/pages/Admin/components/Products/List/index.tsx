import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { Category, ProductResponse } from 'core/types/Products';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import Card from '../Card'
import CardLoader from '../Loaders/ProductCardLoader';
import './styles.scss'
import ProductFilters from 'core/components/ProductFilters';



const List = () => {      
    const [productsResponse, setProductResponse] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [name,setName] = useState('');
    const [category,setCategory] = useState<Category>();
    const history = useHistory();

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#407bff'
            }
        },
    });

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            direction: 'DESC',
            orderBy: 'id',
            name: name,
            categoryId: category?.id
        }



        setIsLoading(true);
        makeRequest({ url: `/products?page=${activePage}`, params })
            .then(response => {
                setProductResponse(response.data)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [activePage,name, category]);



    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handleChangeName = (name:string) =>{
        setActivePage(0);
        setName(name);

    }

    const handleChangeCategory = (category:Category) => {
        setActivePage(0);
        setCategory(category)

    }

    const clearFilters = () => {
        setActivePage(0);
        setCategory(undefined)
        setName('');

    }

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
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary btn-lg px-5 btn-radiuos" onClick={handleCreate} >
                    ADICIONAR
                </button>
                <ProductFilters name={name}
                category={category}
                handleChangeCategory={handleChangeCategory}
                handleChangeName={handleChangeName}
                clearFilters={clearFilters}/>
            </div>    
            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Card product={product} key={product.id} onRemove={onRemove} />
                    ))
                )}

                {isLoading ? "" : productsResponse && (
                <div className="page-format d-flex justify-content-center mt-5">
                <MuiThemeProvider theme={theme}>
                    <Pagination color="primary" count={productsResponse.totalPages} 
                        size="large"
                        page={activePage + 1}
                        onChange={(event, page) => {
                            setActivePage(page - 1)
                        }} />
                </MuiThemeProvider>
            </div>
                )}
            </div>
        </div>
    );
}

export default List;

