import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss'

type Props = {
    title:string;
    buttonName:string;
    children:React.ReactNode;
}
const BaseForm = ( {title, children, buttonName}:Props) => {
    const history = useHistory();
    const handleCancel = () => {
        history.push('../')
    }

    return (
        <div className="admin-base-form card-base">
            <h1 className="base-form-title">
                {title}
            </h1>
            {children}
            <div className="base-form-actions">
                <button className="btn btn-outline-danger button-config  mr-3" onClick={handleCancel}>
                    CANCELAR
                </button>
                
                <button className="btn btn-primary  button-config ">{buttonName}</button>
            </div>
        </div>

    );

}

export default BaseForm;