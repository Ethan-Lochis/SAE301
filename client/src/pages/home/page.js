import template from "./template.html?raw";
// Template --> template

import { ProductData } from "../../data/product.js";
import { ProductView } from "../../ui/product/index.js";
import { htmlToFragment } from "../../lib/utils.js";

let M = {
  products: [],
};

let C = {};

C.handler_clickOnCart = function (ev) {
  if (ev.target.dataset.buy !== undefined) {
    let id = ev.target.dataset.buy;
    alert(`Le produit d'identifiant ${id} ? Excellent choix !`);
  }
};

// Gère le click sur la carte
C.handler_clickOnProduct = function (ev) {
    let card = ev.target.closest("[data-product]");
    if (card !== null) {
      if (ev.target.dataset.buy == undefined){

        let id = card.dataset.product;
        let name = card.dataset.name;
        window.location.href += "products/" + id + "/" + name;
      }
  }
};

C.init = async function () {
  M.products = await ProductData.fetchAll();
  console.log("produits", M.products);
  return V.init(M.products);
};

let V = {};

V.init = function (data) {
  let fragment = V.createPageFragment(data);
  V.attachEvents(fragment);
  return fragment;
};

V.createPageFragment = function (data) {
  // Créer le fragment depuis le template
  let pageFragment = htmlToFragment(template);
  // Générer les produits
  let productsDOM = ProductView.dom(data);

  // Remplacer le slot par les produits
  pageFragment.querySelector('slot[name="products"]').replaceWith(productsDOM);
  return pageFragment;
};

V.attachEvents = function (pageFragment) {
  // changement de la fonction pour le 2è enfant (slot products)
  let root = pageFragment.children[1];
  root.addEventListener("click", C.handler_clickOnCart);
  root.addEventListener("click", C.handler_clickOnProduct);
  return pageFragment;
};

export function ProductsPage(params) {
  console.log("ProductsPage", params);
  return C.init();
}

export function HomePage() {
  return C.init();
}
