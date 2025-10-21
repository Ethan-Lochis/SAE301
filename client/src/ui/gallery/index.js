import { htmlToFragment } from "../../lib/utils";
import { GalleryData } from "../../data/gallery";
import template from "./template.html?raw";

let FooterView = {
  html: function () {
    return template;
  },

  dom: function () {
    return htmlToFragment(template);
  }
};

export { FooterView };



function generateImages(data) {
  const fragment = document.createDocumentFragment();
  const items = Array.isArray(data) ? data.flat() : [];

  items.forEach(item => {
    const img = document.createElement('img');
    img.src = `/assets/Products/${encodeURI(item.url)}`; // encodeURI ici
    img.alt = item.name ? `Image de ${item.name}` : `Produit ${item.id}`;
    img.className = 'w-1/4 aspect-square flex-shrink-0 snap-start cursor-pointer';
    fragment.appendChild(img);
  });

  return fragment;
}

let M = []

let Gallery = {}

Gallery.init = async function(id) {
    M.gallery = await GalleryData.fetch(id);
    return V.init(M.gallery)
}

let V = {}

// génère les images
V.generateImages = function(data) {
  let fragment = document.createDocumentFragment();
  let items = Array.isArray(data) ? data.flat() : [];

  items.forEach(item => {
    let img = document.createElement('img');
    img.src = `/assets/Products/${encodeURI(item.url)}`; // encodeURI ici
    img.alt = item.name ? `Image de ${item.name}` : `Produit ${item.id}`;
    img.className = 'w-1/4 aspect-square flex-shrink-0 snap-start cursor-pointer';
    fragment.appendChild(img);
  });

  return fragment;
}

V.createPageFragment = function(data) {
    // Créer le fragment depuis le template
    let pageFragment = htmlToFragment(template);
    // Générer le composant detail
    pageFragment.querySelector('slot[name="Gallery"]').replaceWith(V.generateImages(data));
    return pageFragment;
}

V.init = function(data){
  return V.createPageFragment(data)
}

export { Gallery }