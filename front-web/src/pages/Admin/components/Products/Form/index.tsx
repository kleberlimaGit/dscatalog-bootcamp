import { makeRequest } from 'core/utils/request';
import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name: string,
    price: string,
    categories: string,
    description: string
}


const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        categories: '',
        description: ''
    });
    type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name
        const value = event.target.value


        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://cdn.dooca.store/659/products/a38079e16f.jpg?v=1600355930',
            categories: [{ id: formData.categories }]
        }
        makeRequest({ url: '/products', method: 'POST', data: payload })
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
                            <option value="1">Livros</option>
                            <option value="3">Computadores</option>
                            <option value="2">Eletrônicos</option>

                        </select>

                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            className="form-control"
                            onChange={handleOnChange}
                            placeholder="Preço" />
                    </div>
                    <div className="col-6">
                        <textarea name="description"
                            id="" cols={30} rows={10}
                            className="form-control"
                            onChange={handleOnChange} />
                    </div>
                </div>

            </BaseForm>
        </form>
    )
}

export default Form;