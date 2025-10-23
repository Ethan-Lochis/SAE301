import { htmlToFragment } from "../../lib/utils";
import { GalleryData } from "../../data/gallery";
import template from "./template.html?raw";

/* --------------------------------------------
 * VUE DU FOOTER
 * -------------------------------------------- */
let FooterView = {
  html: function () {
    return template;
  },

  dom: function () {
    return htmlToFragment(template);
  },
};

export { FooterView };

/* --------------------------------------------
 * GÉNÉRATION DYNAMIQUE D’IMAGES (fonction utilitaire)
 * -------------------------------------------- */
function generateImages(data) {
  const fragment = document.createDocumentFragment();
  const items = Array.isArray(data) ? data.flat() : [];

  items.forEach((item) => {
    const img = document.createElement("img");
    img.src = `/assets/Products/${encodeURI(item.url)}`; // encodeURI pour éviter les erreurs d’URL
    img.alt = item.name ? `Image de ${item.name}` : `Produit ${item.id}`;
    img.className =
      "w-1/4 aspect-square flex-shrink-0 snap-start cursor-pointer";
    fragment.appendChild(img);
  });

  return fragment;
}

/* --------------------------------------------
 * MODULE GALLERY
 * -------------------------------------------- */
let M = {}; // Modèle
let Gallery = {}; // Contrôleur principal

/**
 * Initialise la galerie en récupérant les données et en créant la vue
 */
Gallery.init = async function (id) {
  M.gallery = await GalleryData.fetch(id);
  return V.init(M.gallery);
};

/* --------------------------------------------
 * VUE DE LA GALLERY
 * -------------------------------------------- */
let V = {};

/**
 * Génère les éléments <img> à partir des données de la galerie
 */
V.generateImages = function (data) {
  const fragment = document.createDocumentFragment();
  const items = Array.isArray(data) ? data.flat() : [];

  items.forEach((item) => {
    const img = document.createElement("img");
    img.src = `/assets/Products/${encodeURI(item.url)}`;
    img.alt = item.name ? `Image de ${item.name}` : `Produit ${item.id}`;
    img.className =
      "h-full aspect-square flex-shrink-0 snap-start cursor-pointer";
    fragment.appendChild(img);
  });

  return fragment;
};

/**
 * Crée le fragment HTML complet de la galerie
 */
V.createPageFragment = function (data) {
  // Créer le fragment depuis le template
  const pageFragment = htmlToFragment(template);

  // Remplacer le slot prévu par les images générées
  pageFragment
    .querySelector('slot[name="Gallery"]')
    .replaceWith(V.generateImages(data));

  return pageFragment;
};

/**
 * Initialise et retourne le fragment complet de la galerie
 */
V.init = function (data) {
  return V.createPageFragment(data);
};

export { Gallery };
