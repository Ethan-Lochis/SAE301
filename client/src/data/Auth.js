import {getRequest} from '../lib/api-request.js';
import { JSONpostRequest } from '../lib/api-request.js';
import { postRequest } from '../lib/api-request.js';
import { patchRequest } from '../lib/api-request.js';

let AuthData = {};

AuthData.loggin = async function(form){
    console.log(Credential)
    let data = await postRequest('auth', JSON.stringify(form));
    return data
}

AuthData.register = async function(form){
    let data = await JSONpostRequest('auth/register', JSON.stringify(form));
    return data
}

AuthData.AmILogged = async function () {
    let response = await getRequest('auth');
    return response;
}

AuthData.info = async function () {
    let data = await getRequest('auth');
    return data
}

AuthData.disconnect = async function () {
    let data = await getRequest('disconnect')
    console.log("déconnexion.....")
}

AuthData.patch = async function (value) {
    let data = await patchRequest('auth', value)
    return data
}


export {AuthData};