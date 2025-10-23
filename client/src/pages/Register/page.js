import template from "./template.html?raw";

import { RegisterView } from "../../ui/Register/index.js";
import { htmlToFragment } from "../../lib/utils.js";
import { AuthData } from "../../data/Auth.js";

let M = {};

let C = {};

C.sendHandler = async function (event) {
  let form = event.target.closest("form");

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

    // Vérifications du mot de passe
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

    // Si tout est valide, envoi des données
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

C.init = async function () {
  return V.init();
};

let V = {};

V.init = function () {
  let fragment = V.createPageFragment();
  V.attachEvents(fragment);
  return fragment;
};

V.createPageFragment = function () {
  // Créer le fragment depuis le template
  let pageFragment = htmlToFragment(template);
  // Générer les produits
  let AuthDOM = RegisterView.dom();

  // Remplacer le slot par les produits
  pageFragment.querySelector('slot[name="Formulaire"]').replaceWith(AuthDOM);
  return pageFragment;
};

V.attachEvents = function (pageFragment) {
  let root = pageFragment.querySelector("#userForm");
  root.addEventListener("click", C.sendHandler);
};

export function RegisterPage() {
  return C.init();
}
