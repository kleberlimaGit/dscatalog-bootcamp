import React, { useEffect, useState } from 'react';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import BaseForm from '../../BaseForm';
import { useHistory, useParams } from 'react-router-dom';
import { Category } from 'core/types/Products';
import DescriptionField from './DescriptionField';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { stateFromHTML } from 'draft-js-import-html'
import './styles.scss';

export type FormState = {
    name: string;
    price: string;
    description: EditorState;
    categories: Category[];
    imgUrl: string;
}

type ParamsType = {
    productId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const [isLoadingCategories, setIsLoadingCategories] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    const isEditing = productId !== 'create';

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/products/${productId}` })
                .then(response => {
                    const contentState = stateFromHTML(response.data.description);
                    const descriptionAsEditorState = EditorState.createWithContent(contentState);
                    setValue('name', response.data.name)
                    setValue('price', response.data.price)
                    setValue('imgUrl', response.data.imgUrl)
                    setValue('categories',response.data.categories)
                    setValue('description', descriptionAsEditorState)
                })
        }

    }, [productId, isEditing, setValue])

    useEffect(() => {
        setIsLoadingCategories(true)
        makeRequest({ url: '/categories' })
            .then(response => setCategories(response.data.content))
            .finally(() => {
                setIsLoadingCategories(false)
            })
    }, []);


    const getDescriptionFromEditor = (editorState: EditorState) => {
        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }

    const onSubmit = (data: FormState) => {

        const payload = {
            ...data,
            description: getDescriptionFromEditor(data.description)
        }

        makePrivateRequest({
            url: isEditing ? `/products/${productId}` : '/products',
            method: isEditing ? 'PUT' : 'POST',
            data: payload
        })
            .then(() => {
                toast.success(' Produto cadastrado com sucesso!', {
                    autoClose: 2500
                });
                history.push('/admin/products');
            })
            .catch(() => {
                toast.error('Erro ao salvar produto');
            })
    }

    

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={`${isEditing ? 'editar produto' : 'cadastrar um produto'}`} buttonName={`${isEditing ? 'SALVAR' : 'CADASTRAR'}`}>
                <div className="row">
                    <div className="col-6">
                        <div className="margin-input-32">
                            <input
                                ref={register({
                                    required: "Campo obrigatório",
                                    minLength: { value: 5, message: 'O campo deve ter no mínimo 5 caracteres.' },
                                    maxLength: { value: 60, message: 'O campo deve ter no máximo 60 caracteres.' }
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
                            <Controller
                                as={Select}
                                name="categories"
                                rules={{ required: true }}
                                control={control}
                                isLoading={isLoadingCategories}
                                options={categories}
                                getOptionLabel={(option: Category) => option.name}
                                getOptionValue={(option: Category) => String(option.id)}
                                classNamePrefix="categories-select"
                                placeholder="Categorias"
                                defaultValue = ""
                                isMulti
                            />
                            {errors.categories && (
                                <div className="invalid-feedback d-block">
                                    Campo obrigatório
                                </div>)}
                        </div>

                        <div className="margin-input-32">
                            <input 
                                ref={register({ required: "Campo obrigatório" })}
                                type="number"
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
                                name="imgUrl"
                                className="form-control input-base"
                                placeholder="Imagem do produto" />
                            {errors.imgUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl.message}
                                </div>
                            )}

                        </div>

                    </div>
                    <div className="col-6">
                        <DescriptionField control={control}/>
                    </div>
                </div>

            </BaseForm>
        </form>
    )
}

export default Form;