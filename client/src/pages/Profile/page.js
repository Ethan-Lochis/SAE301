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

C.handleChangeUsername = async function (ev) {
  if (ev.target.id === "edit-username") {
    let usernameArea = document.querySelector("#username");
    let oldName = usernameArea.textContent.trim();

    // Remplace le texte par un champ et un bouton
    usernameArea.innerHTML = `
      <input style="width: 300px;" type="text" id="editUsername" value="${oldName}" />
      <button id="saveUsername" style="color: white; font-size: 2.5rem; background-color: var(--var-clr-main); padding: 1rem">Valider</button>
    `;

    let input = document.querySelector("#editUsername");
    input.focus();

    let save = document.querySelector("#saveUsername");

    save.addEventListener("click", async (ev) => {
      ev.stopPropagation();

      let newName = input.value.trim();

      if (newName === "") {
        // Champ vide → on rétablit l'ancien nom
        usernameArea.textContent = oldName;
        return;
      }

      // Champ non vide → envoi de la requête
      let data = {
        param: "updateUsername",
        username: newName,
        passWord: "", // inutile sert juste a gérer plus facilement les données envoyées
      };
      console.log("Données envoyées :", data);

      try {
        let changes = await AuthData.patch(JSON.stringify(data));
        console.log("Réponse serveur :", changes);
      } catch (e) {
        console.error("Erreur lors de la requête :", e);
      }

      // On remplace immédiatement le champ par le nouveau nom
      usernameArea.textContent = newName;
    });
  }
};

C.handleChangepassWord = async function (ev) {
  if (ev.target.id === "ChangePWD") {
    ev.target.style.display = "none"; // cache le bouton

    let passWordArea = document.querySelector("#passWord");

    // Remplace le texte par un champ et un bouton
    passWordArea.innerHTML = `
      <input style="width: 300px;" type="password" id="editpassWord" placeholder="Nouveau mot de passe" />
      <button id="savepassWord" style="color: white; font-size: 1.5rem; background-color: var(--var-clr-main); padding: 1rem">Valider</button>
    `;

    let input = document.querySelector("#editpassWord");
    input.focus();

    let save = document.querySelector("#savepassWord");

    save.addEventListener("click", async (ev) => {
      ev.stopPropagation();

      let newPassword = input.value.trim();

      // Validation : au moins 6 caractères, 1 lettre et 1 chiffre
      let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if (!regex.test(newPassword)) {
        alert("Le mot de passe doit contenir au moins 6 caractères, une lettre et un chiffre.");
        return;
      }

      // Si le champ est vide (sécurité supplémentaire)
      if (newPassword === "") {
        passWordArea.innerHTML = `
          <button id="ChangePWD" style="color: white; font-size: 1.5rem; background-color: var(--var-clr-main); padding: 1rem">Changer son mot de passe</button>
        `;
        document.querySelector("#ChangePWD").addEventListener("click", C.handleChangepassWord);
        return;
      }

      // Envoi de la requête
      let data = {
        param: "updatePWD",
        username: "", 
        passWord: newPassword,
      };

      try {
        let changes = await AuthData.patch(JSON.stringify(data));
        console.log("Réponse serveur :", changes);
      } catch (e) {
        console.error("Erreur lors de la requête :", e);
      }

      // Remet le bouton "changer son mot de passe"
      passWordArea.innerHTML = `
        <button class="bg-main text-fg py-4 px-8 text-2xl mt-28 cursor-pointer hover:bg-Darkmain" id="ChangePWD">Changer de mot de passe</button>
      `;
      document.querySelector("#ChangePWD").addEventListener("click", C.handleChangepassWord);
    });
  }
};


/**
 * Initialisation de la page
 */
C.init = async function () {
  // Vérifie si l'utilisateur est authentifié
  if (window.router.isAuthenticated) {
    let data = await AuthData.info();
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
  let fragment = await V.createPageFragment(data);
  V.attachEvents(fragment);
  return fragment;
};

/**
 * Création du fragment HTML de la page à partir du template
 */
V.createPageFragment = async function (data) {
  // Conversion du template en fragment DOM
  let pageFragment = htmlToFragment(template);

  // Génération du contenu du profil via ProfileView
  let detailDOM = ProfileView.dom(data);

  // Remplacement du slot "Profile" par le contenu généré
  pageFragment.querySelector('slot[name="Profile"]').replaceWith(detailDOM);

  return pageFragment;
};

/**
 * Attachement des événements à la page
 */
V.attachEvents = function (pageFragment) {
  let root = pageFragment.querySelector("#profile");

  if (root) {
    root.addEventListener("click", C.handleDisconnect);
    root.addEventListener("click", C.handleChangeUsername);
    root.addEventListener("click", C.handleChangepassWord);
  }
};

/**
 * Export de la page Profile
 */
export function ProfilePage() {
  return C.init();
}
