import { ProductData } from "../../data/product.js";
import { GalleryData } from "../../data/gallery.js";
import { htmlToFragment } from "../../lib/utils.js";
import { DetailView } from "../../ui/detail/index.js";
import template from "./template.html?raw";

// ---------------------------------------------------------
// Modèle (M) : Gestion des données
// ---------------------------------------------------------
let M = {
    products: [],
    gallery: [],
};

/**
 * Récupère un produit à partir de son ID
 */
M.getProductById = function (id) {
    return M.products.find((product) => product.id == id);
};

// ---------------------------------------------------------
// Contrôleur (C) : Gestion des interactions utilisateur
// ---------------------------------------------------------
let C = {};

/**
 * Gestion du clic sur le bouton "Ajouter au panier"
 */
C.handler_clickOnProduct = function (event) {
    if (event.target.dataset.buy !== undefined) {
        let id = event.target.dataset.buy;
        alert(`Produit ajouté au panier ! (Quand il y en aura un)`);
    }
};

/**
 * Gestion du clic sur une image miniature de la galerie
 */
C.handler_clickOnImage = function (event) {
    if (event.target.tagName === "IMG") {
        let clickedImg = event.target;
        let mainImg = document.querySelector("#main-img");

        // Échange des sources entre l’image principale et la miniature cliquée
        let tempSrc = mainImg.src;
        mainImg.src = clickedImg.src;
        clickedImg.src = tempSrc;
    }
};

/**
 * Initialisation de la page Produit
 */
C.init = async function (params) {
    const productId = params.id;

    // Récupération des données du produit et de la galerie
    M.products = await ProductData.fetch(productId);
    M.gallery = await GalleryData.fetch(productId);

    console.log(M.products);

    // On prend le premier produit (puisque fetch renvoie un tableau)
    let product = M.products[0];

    return V.init(product);
};

// ---------------------------------------------------------
// Vue (V) : Gestion du rendu HTML
// ---------------------------------------------------------
let V = {};

/**
 * Initialisation de la vue avec les données du produit
 */
V.init = async function (data) {
    let fragment = await V.createPageFragment(data);
    V.attachEvents(fragment);
    return fragment;
};

/**
 * Création du fragment HTML à partir du template
 */
V.createPageFragment = async function (data) {
    let pageFragment = htmlToFragment(template);

    // Génération du contenu du produit
    let detailDOM = await DetailView.dom(data, M.products[0].id);
    console.log(detailDOM);

    // Remplacement du slot "detail" par le contenu généré
    pageFragment.querySelector('slot[name="detail"]').replaceWith(detailDOM);

    return pageFragment;
};

/**
 * Attachement des événements sur la page
 */
V.attachEvents = function (pageFragment) {
    // Bouton "Ajouter au panier"
    const addToCartBtn = pageFragment.querySelector("[data-buy]");
    addToCartBtn.addEventListener("click", C.handler_clickOnProduct);

    // Galerie d’images
    let gallery = pageFragment.querySelector("#figure");
    gallery.addEventListener("click", C.handler_clickOnImage);

    return pageFragment;
};

// ---------------------------------------------------------
// Export de la page Détail Produit
// ---------------------------------------------------------
export function ProductDetailPage(params) {
    console.log("ProductDetailPage", params);
    return C.init(params);
}
