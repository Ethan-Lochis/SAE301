<?php

require_once 'EntityController.php';
require_once "src/Repository/GalleryRepository.php";

/**
 * Classe GalleryController
 * 
 * Gère les requêtes HTTP concernant l'entité Gallery
 * Hérite de Controller pour bénéficier de la méthode jsonResponse()
 */
class GalleryController extends EntityController {

    private GalleryRepository $repository;

    public function __construct() {
        $this->repository = new GalleryRepository();
    }

    /**
     * Traite les requêtes GET
     * 
     * GET /api/{strtolower(Gallery)}s        → Récupère tous les Gallerys
     * GET /api/{strtolower(Gallery)}s/{id}   → Récupère un Gallery spécifique
     * 
     * @param HttpRequest $request
     * @return mixed Données à convertir en JSON, ou false en cas d'erreur
     */
    protected function processGetRequest(HttpRequest $request) {
        $id = $request->getId();
        
        if ($id) {
            // GET /api/{strtolower(Gallery)}s/{id}
            $entity = $this->repository->findImages($id);
            return $entity == null ? false : $entity;
        } else {
            return $this->repository->findAll();
        }
    }

    /**
     * Traite les requêtes POST
     * 
     * POST /api/{strtolower(Gallery)}s       → Crée un nouveau Gallery
     * 
     * @param HttpRequest $request
     * @return mixed Le Gallery créé avec son ID, ou false en cas d'erreur
     */
    protected function processPostRequest(HttpRequest $request) {
        // TODO: Implémenter la création
        // Exemple :
        /*
        $json = $request->getJson();
        $obj = json_decode($json);
        
        // Validation basique
        if (!isset($obj->name)) {
            return false;
        }
        
        $entity = new Gallery(0);
        $entity->setName($obj->name);
        // TODO: Hydrater l'objet avec les données reçues
        
        $ok = $this->repository->save($entity);
        return $ok ? $entity : false;
        */
        
        return false; // À remplacer par votre implémentation
    }

    /**
     * Traite les requêtes DELETE
     * 
     * DELETE /api/{strtolower(Gallery)}s/{id} → Supprime un Gallery
     * 
     * @param HttpRequest $request
     * @return mixed true si supprimé, false sinon
     */
    protected function processDeleteRequest(HttpRequest $request) {
        // TODO: Implémenter la suppression
        // Exemple :
        /*
        $id = $request->getId();
        
        if (!$id) {
            return false;
        }
        
        return $this->repository->delete($id);
        */
        
        return false; // À remplacer par votre implémentation
    }

    /**
     * Traite les requêtes PATCH
     * 
     * PATCH /api/{strtolower(Gallery)}s/{id}  → Met à jour un Gallery
     * 
     * @param HttpRequest $request
     * @return mixed Le Gallery modifié, ou false en cas d'erreur
     */
    protected function processPatchRequest(HttpRequest $request) {
        // TODO: Implémenter la modification
        // Exemple :
        /*
        $id = $request->getId();
        
        if (!$id) {
            return false;
        }
        
        $entity = $this->repository->find($id);
        if (!$entity) {
            return false;
        }
        
        $json = $request->getJson();
        $obj = json_decode($json);
        
        // Mise à jour des propriétés (uniquement celles fournies)
        if (isset($obj->name)) {
            $entity->setName($obj->name);
        }
        // TODO: Mettre à jour les autres propriétés
        
        $ok = $this->repository->update($entity);
        return $ok ? $entity : false;
        */
        
        return false; // À remplacer par votre implémentation
    }

    /**
     * Traite les requêtes PUT
     * 
     * PUT /api/{strtolower(Gallery)}s/{id}    → Remplace complètement un Gallery
     * 
     * @param HttpRequest $request
     * @return mixed Le Gallery remplacé, ou false en cas d'erreur
     */
    protected function processPutRequest(HttpRequest $request) {
        // TODO: Implémenter le remplacement complet (optionnel)
        // Note : PATCH est généralement préféré à PUT
        return false;
    }
}
