import { ProductData } from "../../data/product.js";
import { ProductView } from "../../ui/product/index.js";
import { htmlToFragment } from "../../lib/utils.js";
import template from "./template1.html?raw";

// ---------------------------------------------------------
// Modèle (M) : gestion des données produits
// ---------------------------------------------------------
let M = {
    products: [],
};

// ---------------------------------------------------------
// Contrôleur (C) : logique et gestion des événements
// ---------------------------------------------------------
let C = {};


/**
 * Gestion du clic sur le bouton "Ajouter au panier"
 */
C.handler_clickOnCart = function (event) {
    if (event.target.dataset.buy !== undefined) {
        let id = event.target.dataset.buy;
        alert(`Le produit d'identifiant ${id} ? Excellent choix !`);
    }
};

/**
 * Gestion du clic sur une carte produit
 */
C.handler_clickOnProduct = function (event) {
    let card = event.target.closest("[data-product]");

    if (card !== null) {
        // Empêche d’interférer avec le bouton d’achat
        if (event.target.dataset.buy === undefined) {
            let id = card.dataset.product;
            let name = card.dataset.name;

            // Redirection vers la page du produit
            window.location.href = "/products/" + id + "/" + name;
        }
    }
};

/**
 * Initialisation de la page filtrée (par catégorie)
 */
C.init = async function (params) {
    // Récupère les produits correspondant à la catégorie
    M.products = await ProductData.fetchByCat(params);
    console.log("Produits filtrés :", M.products);

    // Initialise la vue
    return V.init(M.products);
};

// ---------------------------------------------------------
// Vue (V) : gestion du rendu HTML
// ---------------------------------------------------------
let V = {};

/**
 * Initialise la vue
 */
V.init = function (data) {
    let fragment = V.createPageFragment(data);
    V.attachEvents(fragment);
    return fragment;
};

/**
 * Crée le fragment HTML de la page
 */
V.createPageFragment = function (data) {
    // Crée le fragment depuis le template HTML
    let pageFragment = htmlToFragment(template);

    // Génère les cartes produits
    let productsDOM = ProductView.dom(data);

    // Remplace le slot du template par les produits générés
    pageFragment.querySelector('slot[name="products"]').replaceWith(productsDOM);

    return pageFragment;
};

/**
 * Attache les événements à la page
 */
V.attachEvents = function (pageFragment) {
    let root = pageFragment.firstElementChild;
     root.addEventListener("click", C.handler_clickOnCart);
    root.addEventListener("click", C.handler_clickOnProduct);
    return pageFragment;
};

// ---------------------------------------------------------
// Export de la page filtrée
// ---------------------------------------------------------
export function FilteredPage(params) {
    console.log("FilteredPage", params.slug);
    return C.init(params.slug);
}
