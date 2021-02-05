import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import { ReactComponent as Lupa } from 'core/assets/images/lupa.svg'
import './styles.scss'
import { makeRequest } from 'core/utils/request';
import { Category } from 'core/types/Products';

export type FilterForm = {
    name?:string;
    categoryId?:number;

}

type Props = {
    onSearch: (filter: FilterForm) => void;
}

const ProductFilters = ({onSearch}: Props) => {

    const [isLoadingCategories, setIsLoadingCategories] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    const [name,setName] = useState('');
    const [category,setCategory] = useState<Category>();

    useEffect(() => {
        setIsLoadingCategories(true)
        makeRequest({ url: '/categories' })
            .then(response => setCategories(response.data.content))
            .finally(() => {
                setIsLoadingCategories(false)
            })
    }, []);

    const handleChangeName = (name:string) =>{
        setName(name);

        onSearch({ name,  categoryId: category?.id })
    }

    const handleChangeCategory = (category:Category) => {
        setCategory(category)

        onSearch({ name,  categoryId: category?.id })
    }

    const clearFilters = () => {
        setCategory(undefined)
        setName('');

        onSearch({ name:(''),  categoryId: undefined })

    }

    return (
        <div className="card-base product-filters-container">
            <div className="input-search">
                <input type="text" 
                    className="form-control input-test" 
                    placeholder="Pesquisar Produto"
                    value={name}
                    onChange={event => handleChangeName(event.target.value)} />
                <Lupa />
            </div>
            <Select
                name="categories"
                key={`select-${category?.id}`}
                isLoading={isLoadingCategories}
                value={category}
                options={categories}
                getOptionLabel={(option: Category) => option.name}
                getOptionValue={(option: Category) => String(option.id)}
                className="filter-select-contaiter"
                classNamePrefix="product-categories-select"
                placeholder="Filtrar por Categorias"
                onChange={value => handleChangeCategory(value as Category)}
            />
            <button className="btn btn-outline-secondary rounded"
            onClick={clearFilters}>
                LIMPAR FILTRO
                
            </button>
        </div>
    )

}

export default ProductFilters;