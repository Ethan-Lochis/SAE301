import template from "./template.html?raw";

import { LoginView } from "../../ui/Login/index.js";
import { htmlToFragment } from "../../lib/utils.js";
import { AuthData } from "../../data/Auth.js";

// ---------------------------------------------------------
// Contrôleur (C) : gère la logique de la page de connexion
// ---------------------------------------------------------
let C = {};

/**
 * Gestion de la soumission du formulaire de connexion
 */
C.sendHandler = async function (event) {
    let form = event.target.closest("form");

    // Vérifie que le clic provient bien d’un bouton
    if (event.target.tagName === "BUTTON") {
        event.preventDefault();

        // Récupération des données du formulaire
        let formData = new FormData(form);
        let username = formData.get("username");
        let password = formData.get("password");

        // Préparation des données à envoyer à l’API
        let data = {
            param: "loggin",
            username: username,
            password: password,
        };

        // Appel à l’API d’authentification
        let response = await AuthData.loggin(data);

        // Si les identifiants sont valides
        if (response === true || response === "true") {
            window.router.setAuth(true);
            window.router.navigate("/profile");
        } else {
            alert("Identifiants incorrects !");
        }
    }
};

/**
 * Initialisation de la page de connexion
 */
C.init = async function () {
    return V.init();
};

// ---------------------------------------------------------
// Vue (V) : gère le rendu de la page de connexion
// ---------------------------------------------------------
let V = {};

/**
 * Initialisation de la vue
 */
V.init = function () {
    let fragment = V.createPageFragment();
    V.attachEvents(fragment);
    return fragment;
};

/**
 * Création du fragment HTML à partir du template
 */
V.createPageFragment = function () {
    // Crée un fragment à partir du template HTML
    let pageFragment = htmlToFragment(template);

    // Génère le formulaire via LoginView
    let AuthDOM = LoginView.dom();

    // Remplace le slot "Formulaire" par le formulaire réel
    pageFragment.querySelector('slot[name="Formulaire"]').replaceWith(AuthDOM);

    return pageFragment;
};

/**
 * Attachement des événements au DOM
 */
V.attachEvents = function (pageFragment) {
    let root = pageFragment.querySelector("#userForm");
    root.addEventListener("click", C.sendHandler);
};

// ---------------------------------------------------------
// Export de la page de connexion
// ---------------------------------------------------------
export function AuthPage() {
    return C.init();
}
