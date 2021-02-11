import React from 'react'
import { useHistory } from 'react-router-dom'
import BaseCard from '../../BaseCard';
import './styles.scss'

const List = () => {
    const history = useHistory();



    const handleCreate = () => {
        history.push('/admin/users/create');
    }

    return (
        <div className="user-list-content">
            <div className="d-flex justify-content-between btn-user">
                <button className="btn btn-primary btn-lg px-5 btn-radiuos" onClick={handleCreate} >
                    ADICIONAR
                </button>
            </div>
            <div className="mt-5">
                <BaseCard userOrCategory={"João Paulo Alvin"}/>
                <BaseCard userOrCategory={"João Paulo Alvin"}/>
                <BaseCard userOrCategory={"João Paulo Alvin"}/>
                <BaseCard userOrCategory={"João Paulo Alvin"}/>
                <BaseCard userOrCategory={"João Paulo Alvin"}/>
            </div>
        </div>
    )

}

export default List;