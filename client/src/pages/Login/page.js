import template from "./template.html?raw";

import { LoginView } from "../../ui/Login/index.js";
import { htmlToFragment } from "../../lib/utils.js";

let M = {};

let C = {};

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
  let AuthDOM = LoginView.dom();

  // Remplacer le slot par les produits
  pageFragment.querySelector('slot[name="Formulaire"]').replaceWith(AuthDOM);
  return pageFragment;
};

V.attachEvents = function (pageFragment) {
  let root = pageFragment.querySelector("#userForm");
  root.addEventListener("click",C.sendHandler)
};

export function AuthPage() {
  return C.init();
}


  
  C.sendHandler = function (event) {
    event.preventDefault();

    const form = event.target.closest("form");
    if (event.target.tagName == 'BUTTON'){ // pour être sûr de cibler le bon formulaire
    const formData = new FormData(form);

    const username = formData.get("username");
    const password = formData.get("password");

    console.log("Nom d'utilisateur :", username);
    console.log("Mot de passe :", password);

    fetch(form.action, {
      // method: "POST",
      // body: formData
    })
      .then(res => res.json())
      .then(data => console.log("Réponse du serveur :", data))
      .catch(err => console.error("Erreur :", err));
  }}

