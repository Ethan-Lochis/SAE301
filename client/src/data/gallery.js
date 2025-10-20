import {getRequest} from '../lib/api-request.js';


let GalleryData = {};

GalleryData.fetchAll = async function(){
    let data = await getRequest('gallery');
    console.log(data);
    return data
}

GalleryData.fetch = async function(id){
    let data = await getRequest('gallery/'+id);
    return data;
}

export {GalleryData};