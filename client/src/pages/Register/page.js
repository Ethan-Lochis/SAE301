import template from "./template.html?raw";

import { RegisterView } from "../../ui/Register/index.js";
import { htmlToFragment } from "../../lib/utils.js";
import { AuthData } from "../../data/Auth.js";

let M = {};

let C = {};

C.sendHandler = function (event) {
  

  let form = event.target.closest("form");
  if (event.target.tagName == "BUTTON") {
    event.preventDefault();
    let formData = new FormData(form);

    let username = formData.get("username");
    let password = formData.get("password");

    console.log("Nom d'utilisateur :", username);
    console.log("Mot de passe :", password);
    console.log(formData)
    let data = {
      param: 'register',
      username: username,
      password: password,
    }
    AuthData.register(data)
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

