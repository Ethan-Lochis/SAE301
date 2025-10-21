import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";
import { Gallery } from "../gallery/index.js";

let DetailView = {
  html: function (data) {
    return genericRenderer(template, data);
  },

  dom: async function (data, id) {
    // Récupère le fragment d’images
    let images = await Gallery.init(id);

    // Transforme le template HTML en fragment DOM
    let dom = htmlToFragment(DetailView.html(data));

    // Sélectionne le conteneur de la galerie
    let gallery = dom.querySelector('#gallery');

    // Insère les images dans le conteneur
    if (gallery && images) {
      gallery.appendChild(images);
    }

    // Retourne le fragment complet à afficher
    return dom;
  }
};

export { DetailView };
