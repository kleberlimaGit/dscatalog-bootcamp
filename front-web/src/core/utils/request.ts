import axios, {Method} from 'axios';


type RequestParam = {
 method?: Method;
 url:string;
 data?: object;
 params?: object;
}

const BASE_URL = 'http://localhost:3000';

export const makeRequest = ({ method = 'GET', url, data, params}: RequestParam) =>{
    return axios({
        method, // nao foi passado um valor pois chave e valor tem o mesmo nome
        url: `${BASE_URL}${url}` ,
        data,
        params,
    });
};