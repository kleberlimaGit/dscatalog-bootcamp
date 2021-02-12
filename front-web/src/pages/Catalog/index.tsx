import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import './styles.scss'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { makeRequest } from '../../core/utils/request';
import { Category, ProductResponse } from '../../core/types/Products';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import ProductFilters from 'core/components/ProductFilters';


const Catalog = () => {
    const [productsResponse, setProductResponse] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const initialPage = () => Number(window.sessionStorage.getItem("page") || null)
    const [activePage, setActivePage] = useState(initialPage);
    const [name,setName] = useState('');
    const [category,setCategory] = useState<Category>();

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 12,
            name: name,
            categoryId: category?.id
        }

        window.sessionStorage.setItem("page",String(activePage))
        // iniciar o loader
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => {
                setProductResponse(response.data)
                
            })
            .finally(() => {
                setIsLoading(false)
            })
    },[activePage,name,category])


    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#407bff'
            }
        },
    });


    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handleChangeName = (name:string) =>{
        setActivePage(0)
        setName(name);

    }

    const handleChangeCategory = (category:Category) => {
        setActivePage(0)
        setCategory(category)
    }

    const clearFilters = () => {
        setActivePage(0)
        setCategory(undefined)
        setName('');


    }

    return (
        <div className="catalog-container">
           <div className="d-flex justify-content-between">
                <h1 className="catalog-title">Catálogo de produtos</h1>
                <ProductFilters name={name}
                category={category}
                handleChangeCategory={handleChangeCategory}
                handleChangeName={handleChangeName}
                clearFilters={clearFilters}/>
           </div>

            <div className="catalog-products">
                {isLoading ? <ProductCardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id}>
                            <ProductCard product={product} />
                        </Link>
                    )

                    ))}

            </div>
            { isLoading ? "" : productsResponse && (
                <div className="page-format d-flex justify-content-center mt-5">
                    <MuiThemeProvider theme={theme}>
                        <Pagination color="primary" count={productsResponse.totalPages} size="large"
                            page={activePage + 1}
                            onChange={(event, val) => {
                                setActivePage(val - 1)
                            }} />
                    </MuiThemeProvider>
                </div>

            )}

            {/*            <Pagination 
            totalPages={productsResponse.totalPages}
            activePage={activePage}
            onChange={pageCat => setActivePage(pageCat)}
            /> */}

        </div>
    );

};

export default Catalog;