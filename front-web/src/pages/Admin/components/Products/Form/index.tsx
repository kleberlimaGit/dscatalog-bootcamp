import React from 'react';
import { makePrivateRequest } from 'core/utils/request';
import { toast} from 'react-toastify';
import { useForm } from 'react-hook-form';
import BaseForm from '../../BaseForm';
import './styles.scss';
import { useHistory } from 'react-router-dom';

type FormState = {
    name: string,
    price: string,
    description: string,
    imageUrl: string;
}


const Form = () => {
    const { register, handleSubmit, errors } = useForm<FormState>();
    const history = useHistory();
    const onSubmit = (data: FormState) => {
        makePrivateRequest({ url: '/products', method: 'POST', data })
        .then(()=>{
            toast.success(' Produto cadastrado com sucesso!', {
                autoClose: 2500
            });
            history.push('/admin/products');
        })
        .catch(()=>{
            toast.error('Erro ao salvar produto');
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title="cadastrar um produto">
                <div className="row">
                    <div className="col-6">
                        <div className="margin-input-32">
                            <input
                                ref={register({
                                    required: "Campo obrigatório",
                                    minLength:{value :5, message: 'O campo deve ter no mínimo 5 caracteres.'},
                                    maxLength:{value:60, message: 'O campo deve ter no máximo 60 caracteres.'}
                                })}
                                type="text"
                                name="name"
                                className="form-control input-base"
                                placeholder="Nome do produto" />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>


                        <div className="margin-input-32">
                            <input
                                ref={register({ required: "Campo obrigatório" })}
                                type="text"
                                name="price"

                                className="form-control input-base"
                                placeholder="Preço" />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>

                        <div>
                            <input
                                ref={register({ required: "Campo obrigatório" })}
                                type="text"
                                name="imageUrl"
                                className="form-control input-base"
                                placeholder="Imagem do produto" />
                            {errors.imageUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imageUrl.message}
                                </div>
                            )}

                        </div>

                    </div>
                    <div className="col-6">
                        <textarea name="description"
                            ref={register}
                            id="" cols={30} rows={10}
                            className="form-control input-base area-text-config"
                            placeholder="Descrição" />
                    </div>
                </div>

            </BaseForm>
        </form>
    )
}

export default Form;