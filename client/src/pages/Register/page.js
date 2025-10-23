import template from "./template.html?raw";

import { RegisterView } from "../../ui/Register/index.js";
import { htmlToFragment } from "../../lib/utils.js";
import { AuthData } from "../../data/Auth.js";

// Module contrôleur
let C = {};

// Module vue
let V = {};

/**
 * Gestionnaire de l'envoi du formulaire
 */
C.sendHandler = async function (event) {
  let form = event.target.closest("form");

  // Vérifie que le clic vient d'un bouton
  if (event.target.tagName === "BUTTON") {
    event.preventDefault();

    let formData = new FormData(form);
    let username = formData.get("username").trim();
    let password = formData.get("password").trim();
    let confirmPassword = formData.get("confirm-password").trim();

    // Vérification du nom d'utilisateur
    if (!username) {
      alert("Le nom d'utilisateur ne peut pas être vide !");
      return;
    }

    // Vérification du mot de passe
    if (!password) {
      alert("Le mot de passe ne peut pas être vide !");
      return;
    }

    if (password.length < 6) {
      alert("Le mot de passe est trop court (minimum 6 caractères) !");
      return;
    }

    // Vérification du pattern : au moins une lettre et un chiffre, pas d'espaces
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[^\s]{6,30}$/;
    if (!passwordPattern.test(password)) {
      alert(
        "Le mot de passe doit contenir au moins une lettre et un chiffre, et pas d'espaces !"
      );
      return;
    }

    // Vérification de la confirmation du mot de passe
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    // Si tout est valide, envoi des données au serveur
    let data = {
      param: "register",
      username: username,
      password: password,
    };

    try {
      let result = await AuthData.register(data);

      if (result === true) {
        alert("Votre compte a été créé !");
        window.location.href = "/login";
      } else {
        alert("Une erreur est survenue lors de la création du compte.");
      }
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      alert("Impossible de créer le compte pour le moment.");
    }
  }
};

/**
 * Initialisation de la page
 */
C.init = async function () {
  return V.init();
};

/**
 * Initialisation de la vue
 */
V.init = function () {
  let fragment = V.createPageFragment();
  V.attachEvents(fragment);
  return fragment;
};

/**
 * Création du fragment HTML de la page
 */
V.createPageFragment = function () {
  let pageFragment = htmlToFragment(template);

  // Génération du formulaire via RegisterView
  let AuthDOM = RegisterView.dom();

  // Remplacer le slot "Formulaire" par le formulaire réel
  pageFragment.querySelector('slot[name="Formulaire"]').replaceWith(AuthDOM);

  return pageFragment;
};

/**
 * Attachement des événements sur la page
 */
V.attachEvents = function (pageFragment) {
  let root = pageFragment.querySelector("#userForm");
  root.addEventListener("click", C.sendHandler);
};

/**
 * Export de la page d'inscription
 */
export function RegisterPage() {
  return C.init();
}
