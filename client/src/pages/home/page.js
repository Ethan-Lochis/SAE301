import template from "./template.html?raw";

import { ProductData } from "../../data/product.js";
import { ProductView } from "../../ui/product/index.js";
import { htmlToFragment } from "../../lib/utils.js";
import { AuthData } from "../../data/Auth.js";

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
            window.location.href += "products/" + id + "/" + name;
        }
    }
};

/**
 * Initialisation de la page Produits
 */
C.init = async function () {
    // Récupération de tous les produits depuis la base de données
    M.products = await ProductData.fetchAll();
    console.log("Produits :", M.products);

    // Vérifie l'état d'authentification
    AuthData.AmILogged();

    // Initialise la vue
    return V.init(M.products);
};

// ---------------------------------------------------------
// Vue (V) : gestion du rendu HTML
// ---------------------------------------------------------
let V = {};

/**
 * Initialisation de la vue
 */
V.init = function (data) {
    let fragment = V.createPageFragment(data);
    V.attachEvents(fragment);
    return fragment;
};

/**
 * Création du fragment HTML de la page
 */
V.createPageFragment = function (data) {
    // Création du fragment depuis le template HTML
    let pageFragment = htmlToFragment(template);

    // Génération des cartes produits à partir des données
    let productsDOM = ProductView.dom(data);

    // Remplacement du slot par le contenu généré
    pageFragment.querySelector('slot[name="products"]').replaceWith(productsDOM);

    return pageFragment;
};

/**
 * Attachement des événements sur la page
 */
V.attachEvents = function (pageFragment) {
    // Cible le conteneur des produits (2e enfant du fragment)
    let root = pageFragment.children[1];

    // Ajoute les gestionnaires d’événements
    root.addEventListener("click", C.handler_clickOnCart);
    root.addEventListener("click", C.handler_clickOnProduct);

    return pageFragment;
};

// ---------------------------------------------------------
// Exports des pages
// ---------------------------------------------------------
export function ProductsPage(params) {
    console.log("ProductsPage", params);
    return C.init();
}

export function HomePage() {
    return C.init();
}
