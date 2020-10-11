import React from 'react';
import { ReactComponent as ComputerCard} from '../../../../core/assets/images/Computer.svg'
import './styles.scss';

const ProductCard = () => (
<div className="card-base product-card-container">
    <ComputerCard/>
    <div className="product-info">
        <h6 className="product-name">
            Computador Desktop - Intel Core i7
        </h6>
        <div className="product-price-container d-flex">
            <span className="product-currency">R$</span>
            <h3 className="product-price">
                2.799,00
            </h3>
        </div>
    </div>
</div>

);


export default ProductCard;