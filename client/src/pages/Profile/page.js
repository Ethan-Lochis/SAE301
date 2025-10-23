import { htmlToFragment } from "../../lib/utils.js";
import { AuthData } from "../../data/Auth.js";
import { ProfileView } from "../../ui/Profile/index.js";
import template from "./template.html?raw";

// ---------------------------------------------------------
// Contrôleur (C) : gère la logique de la page Profil
// ---------------------------------------------------------
let C = {};

/**
 * Gestion du clic sur le bouton de déconnexion
 */
C.handleDisconnect = async function (event) {
    if (event.target.id === "logoutBtn") {
        await AuthData.disconnect();

        // Redirection vers la page de connexion après déconnexion
        window.router.navigate("/login");
    }
};

/**
 * Initialisation de la page
 */
C.init = async function () {
    // Vérifie si l'utilisateur est authentifié
    if (window.router.isAuthenticated) {
        const data = await AuthData.info();
        return V.init(data);
    }

    // Si non authentifié, ne rien afficher
    return null;
};

// ---------------------------------------------------------
// Vue (V) : gère la structure HTML de la page Profil
// ---------------------------------------------------------
let V = {};

/**
 * Initialisation de la vue avec les données utilisateur
 */
V.init = async function (data) {
    const fragment = await V.createPageFragment(data);
    V.attachEvents(fragment);
    return fragment;
};

/**
 * Création du fragment HTML de la page à partir du template
 */
V.createPageFragment = async function (data) {
    // Conversion du template en fragment DOM
    const pageFragment = htmlToFragment(template);

    // Génération du contenu du profil via ProfileView
    const detailDOM = ProfileView.dom(data);

    // Remplacement du slot "Profile" par le contenu généré
    pageFragment.querySelector('slot[name="Profile"]').replaceWith(detailDOM);

    return pageFragment;
};

/**
 * Attachement des événements à la page
 */
V.attachEvents = function (pageFragment) {
    const root = pageFragment.querySelector("#profile");

    if (root) {
        root.addEventListener("click", C.handleDisconnect);
    }
};

/**
 * Export de la page Profile
 */
export function ProfilePage() {
    return C.init();
}
