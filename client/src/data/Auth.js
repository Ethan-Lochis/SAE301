import {getRequest} from '../lib/api-request.js';
import { JSONpostRequest } from '../lib/api-request.js';


let AuthData = {};

AuthData.loggin = async function( form){
    let data = await JSONpostRequest('auth', JSON.stringify(form));
    return data
}

AuthData.register = async function(form){
    let data = await JSONpostRequest('auth/register', JSON.stringify(form));
    return data
}


export {AuthData};