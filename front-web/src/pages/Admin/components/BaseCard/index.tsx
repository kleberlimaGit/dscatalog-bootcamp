import React from 'react';
import './styles.scss'
type Props = {
    userOrCategory: string,
}

const BaseCard = ( {userOrCategory}: Props) =>{
    return(
        <div className="admin-category-list">
            <div className="row">
                <div className="col-md-6 d-flex align-items-center">
                    <h4>{userOrCategory}</h4>
                </div>
                <div className="col-md-6 d-flex justify-content-center">
                    <button className="btn btn-outline-secondary btn-base-card mr-5">Editar</button>
                    <button className="btn btn-outline-danger btn-base-card ">Excluir</button>
                </div>
            </div>
        </div>
    );

}

export default BaseCard;