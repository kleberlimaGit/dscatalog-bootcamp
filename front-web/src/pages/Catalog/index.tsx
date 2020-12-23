import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import './styles.scss'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { makeRequest } from '../../core/utils/request';
import { ProductResponse } from '../../core/types/Products';
import ProductCardLoader from './components/Loaders/ProductCardLoader';

const Catalog = () => {

    const [productsResponse, setProductResponse] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);


    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#407bff'
            }
        },
    });


    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 12
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

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">Catálogo de produtos</h1>

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
            onChange={page => setActivePage(page)}
            /> */}

        </div>
    );

};

export default Catalog;