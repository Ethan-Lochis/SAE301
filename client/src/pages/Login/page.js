import { htmlToFragment } from "../../lib/utils";
import { postRequest } from "../../lib/api-request";
import template from "./template.html?raw";

let dom = htmlToFragment(template)
dom.querySelector("#userForm").addEventListener("submit", async function(ev) {
    ev.preventDefault(); // Empêche l'envoi classique du formulaire

    // Récupération des données du formulaire
    let formData = new FormData(this);

    // Appel à la fonction postRequest()
    let response = await postRequest("user", formData);
    console.log(formData)
    console.log(response)
    if (response) {
        console.log("Utilisateur enregistré :", response);
        alert("Inscription réussie !");
    } else {
        alert("Erreur lors de l'enregistrement.");
    }
});

export function LoginPage(){
    return dom;
}