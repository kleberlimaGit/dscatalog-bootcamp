import React from 'react';
import { ReactComponent as ComputerCard} from '../../../../core/assets/images/Computer.svg'
import ProductPrice from '../../../../core/components/ProductPrice';
import './styles.scss';

const ProductCard = () => (
<div className="card-base product-card-container">
    <ComputerCard/>
    <div className="product-info">
        <h6 className="product-name">
            Computador Desktop - Intel Core i7
        </h6>
        <ProductPrice price="2.779,00"/>
    </div>
</div>

);


export default ProductCard;