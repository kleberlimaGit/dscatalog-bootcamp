import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name: string,
    price: string,
    categories: string
}


const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        categories: ''
    });
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = event.target.name
        const value = event.target.value


        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="cadastrar um produto">
                <div className="row">
                    <div className="col-6">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            className="form-control mb-5"
                            onChange={handleOnChange}
                            placeholder="Nome do produto" />


                        <select value={formData.categories} name="categories" className="form-control mb-5" onChange={handleOnChange}>
                            <option value="livros">Livros</option>
                            <option value="computadores">Computadores</option>
                            <option value="eletronicos">Eletrônicos</option>

                        </select>

                        <input
                            type="text"
                            value={formData.price}
                            className="form-control"
                            onChange={handleOnChange}
                            placeholder="Preço" />
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default Form;