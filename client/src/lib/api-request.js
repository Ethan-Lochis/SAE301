/**
 *  Besoin de comprendre comment fonctionne fetch ?
 *  C'est ici : https://fr.javascript.info/fetch
 */

let API_URL = "https://mmi.unilim.fr/~lochis1/SAE301/api/";

/**
 *  getRequest
 *
 *  Requête en GET l'URI uri.
 *  Une requête en GET correspond à une demande de "lecture" de la ressource d'URI uri.
 *
 *  Par exemple "http://.../products" pour lire tous les produits
 *  Ou "http://.../products/3" pour lire le produit d'identifiant 3
 *
 *  Le serveur renverra les données au format JSON.
 *  La fonction les retourne après conversion en objet Javascript (ou false si la requête a échoué)
 *
 *  ATTENTION : La fonction est asynchrone, donc quand on l'appelle il ne faut pas oublier "await".
 *  Exemple : let data = await getRequest(http://.../api/products);
 */
let getRequest = async function (uri) {
  let options = {
    credentials: "include",
    method: "GET",
  };

  try {
    let url = API_URL + uri;
    console.log(url);
    var response = await fetch(url, options);
  } catch (e) {
    console.error("Echec de la requête : " + e);
    return []; // ✅ Retourne un tableau vide au lieu de false → évite les crashs
  }

  // ✅ Gérer 404 proprement : retourne [] au lieu de false
  if (response.status === 404) {
    console.warn(`Ressource ${uri} introuvable (404), retour tableau vide.`);
    return [];
  }

  // ✅ Autres erreurs API → retourner []
  if (!response.ok) {
    console.error("Erreur de requête : " + response.status);
    return [];
  }

  // ✅ Lire en texte brut d'abord, sinon JSON.parse crash si vide
  let raw = await response.text();

  // ✅ Si vide → retourne []
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Erreur de parsing JSON :", e, "Contenu reçu :", raw);
    return []; // ✅ Toujours assurer un tableau en sortie
  }
};

/**
 *  postRequest
 *
 *  Requête en POST l'URI uri. Par exemple "http://.../products"
 *
 *  Une requête en POST correspond à une demande de création d'une ressource (dans l'exemple, création d'un produit)
 *  Pour créer la ressource, on fournit les données utiles via le paramètre data.
 *
 *  Le serveur retourne en JSON la nouvelle ressource créée en base avec son identifiant.
 *  La fonction retourne les données après conversion en objet Javascript (ou false si la requête a échoué)
 */

let postRequest = async function (uri, data) {
  // Défition des options de la requêtes
  let options = {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data, // inutile de refaire JSON.stringify si tu l’as déjà fait avant
  };

  try {
    var response = await fetch(API_URL + uri, options); // exécution (asynchrone) de la requête et attente de la réponse
  } catch (e) {
    console.error("Echec de la requête : " + e); // affichage de l'erreur dans la console
    return false;
  }
  if (response.status != 200) {
    console.error("Erreur de requête : " + response.status); // affichage de l'erreur dans la console
    return false; // si le serveur a renvoyé une erreur, on retourne false
  }
  let $obj = await response.json(); // extraction du json retourné par le serveur (opération asynchrone aussi)
  return $obj; // et on retourne le tout (response.json() a déjà converti le json en objet Javscript)
};

let JSONpostRequest = async function (uri, data) {
  // Défition des options de la requêtes
  let options = {
    // credentials: "include",
    method: "POST",
    header: {
      Content_Type: "application/json", // type de données envoyées (nécessaire si upload fichier)
    },
    body: data,
  };

  try {
    var response = await fetch(API_URL + uri, options); // exécution (asynchrone) de la requête et attente de la réponse
  } catch (e) {
    console.error("Echec de la requête : " + e); // affichage de l'erreur dans la console
    return false;
  }
  if (response.status != 200) {
    console.error("Erreur de requête : " + response.status); // affichage de l'erreur dans la console
    return false; // si le serveur a renvoyé une erreur, on retourne false
  }
  let $obj = await response.json(); // extraction du json retourné par le serveur (opération asynchrone aussi)
  return $obj; // et on retourne le tout (response.json() a déjà converti le json en objet Javscript)
};

/**
 *  deleteRequest
 *
 *  Requête en DELETE l'URI uri. Par exemple "http://.../products/3"
 *
 *  Une requête en DELETE correspond à une demande de suppression d'une ressource.
 *  Par exemple : patchRequest("http://.../products/3") pour supprimer le produit d'identifiant 3
 *
 *  La fonction retourne true ou false selon le succès de l'opération
 */
let deleteRequest = async function (uri) {
  // Pas implémenté. TODO if needed.
};

/**
 *  patchRequest
 *
 *  Requête en PATCH l'URI uri. Par exemple "http://.../products/3"
 *
 *  Une requête en PATCH correspond à une demande de modification/mise à jour d'une ressource.
 *  Pour modifier la ressource, on fournit les données utiles via le paramètre data.
 *  Par exemple : patchRequest("http://.../products/3", {category:1} ) pour modifier la catégorie du produit d'identifiant 3
 *
 *  La fonction retourne true ou false selon le succès de l'opération
 */
let patchRequest = async function (uri, data) {
  // Définition des options de la requête
  let options = {
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: data, // inutile de refaire JSON.stringify si déjà fait avant l'appel
  };

  try {
    var response = await fetch(API_URL + uri, options); // exécution asynchrone de la requête
  } catch (e) {
    console.error("Échec de la requête : " + e);
    return false;
  }

  if (response.status != 200) {
    console.error("Erreur de requête : " + response.status);
    return false;
  }

  let $obj = await response.json(); // extraction du JSON
  return $obj; // retourne l'objet JavaScript
};


export { getRequest, postRequest, JSONpostRequest, patchRequest };
