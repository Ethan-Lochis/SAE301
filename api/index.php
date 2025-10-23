<?php

// Mon cookie de session n'etait pas persistant entre les pages, rajouter ces paramètre de cookie m'as permis de résoudre cela
session_set_cookie_params([
  'lifetime' => 0,
  'path' => '/',
  'domain' => 'mmi.unilim.fr',
  'secure' => true,         
  'httponly' => true,
  'samesite' => 'None'       
]);

session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once "src/Controller/ProductController.php";
require_once "src/Controller/CategoriesController.php";
require_once "src/Controller/GalleryController.php";
require_once "src/Controller/UserController.php";
require_once "src/Controller/DisconnectController.php";
require_once "src/Class/HttpRequest.php";


/** IMPORTANT
 * 
 *  De part le .htaccess, toutes les requêtes seront redirigées vers ce fichier index.php
 * 
 *  On pose le principe que toutes les requêtes, pour être valides, doivent être dee la forme :
 * 
 *  http://.../api/ressources ou  http://.../api/ressources/{id}
 * 
 *  Par exemple : http://.../api/products ou  http://.../api/products/3
 */



/**
 *  $router est notre "routeur" rudimentaire.
 * 
 *  C'est un tableau associatif qui associe à chaque nom de ressource 
 *  le Controller en charge de traiter la requête.
 *  Ici ProductController est le controleur qui traitera toutes les requêtes ciblant la ressource "products"
 *  On ajoutera des "routes" à $router si l'on a d'autres ressource à traiter.
 */
$router = [
    "gallery" => new GalleryController(),
    "products" => new ProductController(),
    "categories" => new CategoriesController(),
    "auth" => new UserController(),
    "disconnect" => new DisconnectController(),
];

// objet HttpRequest qui contient toutes les infos utiles sur la requêtes (voir class/HttpRequest.php)
$request = new HttpRequest();

// gestion des requêtes preflight (CORS)
if ($request->getMethod() == "OPTIONS") {
    http_response_code(200);
    exit();
}

// on récupère la ressource ciblée par la requête
$route = $request->getRessources();

if (isset($router[$route])) { // si on a un controleur pour cette ressource
    $ctrl = $router[$route];  // on le récupère
    $json = $ctrl->jsonResponse($request); // et on invoque jsonResponse pour obtenir la réponse (json) à la requête (voir class/Controller.php et ProductController.php)
    if ($json !== false && $json !== null) { // <-- accepte [] ou {}
        header("Content-type: application/json;charset=utf-8");
        echo $json;
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Not found"]);
    }

    die();
}
http_response_code(404);
echo json_encode(["error" => "Not found"]); // si on a pas de controlleur pour traiter la requête -> 404
die();

?>