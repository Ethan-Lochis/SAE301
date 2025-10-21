import {getRequest} from '../lib/api-request.js';


let CategoryData = {};

CategoryData.fetchAll = async function(){
    let data = await getRequest('categories');
    return data
}


export {CategoryData};