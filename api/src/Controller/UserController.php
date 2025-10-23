<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'EntityController.php';
require_once 'src/Repository/UserRepository.php';

/**
 * Classe UserController
 * 
 * Gère les requêtes HTTP concernant l'entité User
 * Hérite de Controller pour bénéficier de la méthode jsonResponse()
 */
class UserController extends EntityController
{

    private UserRepository $repository;

    public function __construct()
    {
        $this->repository = new UserRepository();
    }

    /**
     * Traite les requêtes GET
     * 
     * GET /api/{strtolower(User)}s        → Récupère tous les Users
     * GET /api/{strtolower(User)}s/{id}   → Récupère un User spécifique
     * 
     * @param HttpRequest $request
     * @return mixed Données à convertir en JSON, ou false en cas d'erreur
     */

    // Gère uniquement le renoie du cookie de session
    protected function processGetRequest(HttpRequest $request)
    {
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        if (isset($_SESSION['auth']) && $_SESSION['auth'] === 'true') {
            $username = $_SESSION['username'] ?? null;
            return ['username' => $username, 'auth' => true];
        }

        return false;
    }

    /**
     * Traite les requêtes POST
     * 
     * POST /api/{strtolower(User)}s       → Crée un nouveau User
     * 
     * @param HttpRequest $request
     * @return mixed Le User créé avec son ID, ou false en cas d'erreur
     */
    protected function processPostRequest(HttpRequest $request)
    {

        $json = $request->getJson();
        $obj = json_decode($json);

        if (!isset($obj->username) || !isset($obj->password)) {
            echo 'false';
            return;
        }

        $entity = new User(0);
        $entity->setUsername($obj->username);
        $entity->setPassword($obj->password);

        $parameter = $request->getParam("param");
        $ok = false;

        if ($parameter === 'register') {
            $ok = $this->repository->save($entity);
        } elseif ($parameter === 'loggin') {
            $ok = $this->repository->loggin($entity);

            if ($ok) {
                if (session_status() !== PHP_SESSION_ACTIVE) {
                    session_start();
                }
                session_regenerate_id();;
                $_SESSION['username'] = $entity->getUsername();
                $_SESSION['auth'] = 'true';
            }
        } else {
            echo 'false';
            return;
        }

        echo $ok ? 'true' : 'false';
    }



    /**
     * Traite les requêtes DELETE
     * 
     * DELETE /api/{strtolower(User)}s/{id} → Supprime un User
     * 
     * @param HttpRequest $request
     * @return mixed true si supprimé, false sinon
     */
    protected function processDeleteRequest(HttpRequest $request)
    {
        return false; // À remplacer par votre implémentation
    }

    /**
     * Traite les requêtes PATCH
     * 
     * PATCH /api/{strtolower(User)}s/{id}  → Met à jour un User
     * 
     * @param HttpRequest $request
     * @return mixed Le User modifié, ou false en cas d'erreur
     */
    protected function processPatchRequest(HttpRequest $request)
    {
        return false; // À remplacer par votre implémentation
    }

    /**
     * Traite les requêtes PUT
     * 
     * PUT /api/{strtolower(User)}s/{id}    → Remplace complètement un User
     * 
     * @param HttpRequest $request
     * @return mixed Le User remplacé, ou false en cas d'erreur
     */
    protected function processPutRequest(HttpRequest $request)
    {
        return false;
    }
}
