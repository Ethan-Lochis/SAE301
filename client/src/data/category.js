import {getRequest} from '../lib/api-request.js';


let CategoryData = {};

CategoryData.fetchAll = async function(){
    let data = await getRequest('categories');
    console.log(data);
    return data
}


export {CategoryData};