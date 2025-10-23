import template from "./template.html?raw";

import { LoginView } from "../../ui/Login/index.js";
import { htmlToFragment } from "../../lib/utils.js";
import { AuthData } from "../../data/Auth.js";


let M = {};

let C = {};

C.sendHandler = async function(event) {
  let form = event.target.closest("form");

  if (event.target.tagName === "BUTTON") {
    event.preventDefault();

    let formData = new FormData(form);
    let username = formData.get("username");
    let password = formData.get("password");

    let data = {
      param: 'loggin',
      username: username,
      password: password,
    };

    let response = await AuthData.loggin(data);

    if (response === true || response === "true") {
      window.router.setAuth(true); 
      window.router.navigate('/profile');
    } else {
      alert("Identifiants incorrects !");
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
  let AuthDOM = LoginView.dom();

  // Remplacer le slot par les produits
  pageFragment.querySelector('slot[name="Formulaire"]').replaceWith(AuthDOM);
  return pageFragment;
};

V.attachEvents = function (pageFragment) {
  let root = pageFragment.querySelector("#userForm");
  root.addEventListener("click", C.sendHandler);
};

export function AuthPage() {
  return C.init();
}
