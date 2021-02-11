import React from 'react'
import { useHistory } from 'react-router-dom'
import BaseCard from '../../BaseCard';
import './styles.scss'

const List = () => {
    const history = useHistory();



    const handleCreate = () => {
        history.push('/admin/categories/create');
    }

    return (
        <div className="category-list-content">
            <div className="d-flex justify-content-between btn-category">
                <button className="btn btn-primary btn-lg px-5 btn-radiuos" onClick={handleCreate} >
                    ADICIONAR
                </button>
            </div>
            <div className="mt-5">
                <BaseCard userOrCategory={"Computador"}/>
                <BaseCard userOrCategory={"Computador"}/>
                <BaseCard userOrCategory={"Computador"}/>
                <BaseCard userOrCategory={"Computador"}/>
                <BaseCard userOrCategory={"Computador"}/>
            </div>
        </div>
    )

}

export default List;