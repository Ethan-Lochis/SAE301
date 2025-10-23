import { htmlToFragment } from "../../lib/utils.js";
import { AuthData } from "../../data/Auth.js";
import { ProfileView } from "../../ui/Profile/index.js";
import template from "./template.html?raw";

// Contrôleur
let C = {};

/**
 * Gestion du clic sur le bouton de déconnexion
 */
C.handleDisconnect = async function (ev) {
  if (ev.target.id === "logoutBtn") {
    await AuthData.disconnect();
    // Optionnel : rediriger ou mettre à jour l'état de l'application
    window.router.navigate("/login");
  }
};

/**
 * Initialisation de la page
 */
C.init = async function () {
  if (window.router.isAuthenticated) {
    const data = await AuthData.info();
    return V.init(data);
  }
  return null; // Pas authentifié, ne rien afficher
};

// Vue
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
 * Création du fragment HTML de la page
 */
V.createPageFragment = async function (data) {
  // Créer le fragment depuis le template
  const pageFragment = htmlToFragment(template);

  // Générer le composant détail du profil
  const detailDOM = ProfileView.dom(data);

  // Remplacer le slot prévu par le composant
  pageFragment.querySelector('slot[name="Profile"]').replaceWith(detailDOM);

  return pageFragment;
};

/**
 * Attacher les événements à la page
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
