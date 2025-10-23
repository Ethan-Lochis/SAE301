<?php
require_once 'EntityRepository.php';
require_once 'src/Class/Gallery.php';

/**
 * Classe GalleryRepository
 * 
 * Gère l'accès aux données de l'entité Gallery
 * Toutes les opérations CRUD doivent passer par cette classe
 */
class GalleryRepository extends EntityRepository
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Récupère les images d'une galerie par l'ID du produit
     * 
     * @param mixed $id L'identifiant du produit
     * @return array Tableau d'objets Gallery (vide si non trouvé)
     */
    public function findImages($id): array
    {
        $requete = $this->cnx->prepare("SELECT * FROM Gallery WHERE product_id = :value"); // prepare la requête SQL
        $requete->bindParam(':value', $id); // fait le lien entre le "tag" :value et la valeur de $id
        $requete->execute(); // execute la requête
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        if ($answer == false || count($answer) === 0)
            return []; // retourne un tableau vide si aucune ligne trouvée


        $res = [];
        foreach ($answer as $obj) {
            $p = new Gallery($obj->id);
            $p->setURL($obj->url);
            array_push($res, $p);
        }

        return $res;
    }

    /**
     * Récupère tous les Gallerys
     * 
     * @return array Tableau d'objets Gallery
     */
    public function findAll(): array
    {
        // TODO: Implémenter la requête SQL
        // Exemple :
        /*
        $requete = $this->cnx->prepare("SELECT * FROM Gallery");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $res = [];
        foreach ($answer as $obj) {
            $entity = new Gallery($obj->id);
            // $entity->setName($obj->name);
            // TODO: Hydrater chaque objet
            array_push($res, $entity);
        }

        return $res;
        */

        return []; // À remplacer par votre implémentation
    }

    /**
     * Sauvegarde un nouveau Gallery dans la base de données
     * 
     * @param mixed $entity L'objet Gallery à sauvegarder
     * @return bool true si succès, false sinon
     */
    public function save($entity): bool
    {
        // TODO: Implémenter la requête INSERT
        // Exemple :
        /*
        $requete = $this->cnx->prepare(
            "INSERT INTO Gallery (name, description) VALUES (:name, :description)"
        );
        $name = $entity->getName();
        $description = $entity->getDescription();
        $requete->bindParam(':name', $name);
        $requete->bindParam(':description', $description);
        $answer = $requete->execute();

        if ($answer) {
            $id = $this->cnx->lastInsertId();
            $entity->setId((int)$id);
            return true;
        }

        return false;
        */

        return false; // À remplacer par votre implémentation
    }

    /**
     * Supprime un Gallery de la base de données
     * 
     * @param mixed $id L'identifiant du Gallery à supprimer
     * @return bool true si succès, false sinon
     */
    public function delete($id): bool
    {
        // TODO: Implémenter la requête DELETE
        // Exemple :
        /*
        $requete = $this->cnx->prepare("DELETE FROM Gallery WHERE id=:value");
        $requete->bindParam(':value', $id);
        return $requete->execute();
        */

        return false; // À remplacer par votre implémentation
    }

    /**
     * Met à jour un Gallery existant dans la base de données
     * 
     * @param mixed $entity L'objet Gallery à mettre à jour
     * @return bool true si succès, false sinon
     */
    public function update($entity): bool
    {
        // TODO: Implémenter la requête UPDATE
        // Exemple :
        /*
        $requete = $this->cnx->prepare(
            "UPDATE Gallery SET name=:name, description=:description WHERE id=:id"
        );
        $id = $entity->getId();
        $name = $entity->getName();
        $description = $entity->getDescription();
        $requete->bindParam(':id', $id);
        $requete->bindParam(':name', $name);
        $requete->bindParam(':description', $description);
        return $requete->execute();
        */

        return false; // À remplacer par votre implémentation
    }

    public function find($id)    {}

    // TODO: Ajouter vos méthodes de recherche personnalisées ici
    // Exemple :
    //
    // public function findAllByCategory($categoryId): array {
    //     $requete = $this->cnx->prepare("SELECT * FROM Gallery WHERE category_id=:cat");
    //     $requete->bindParam(':cat', $categoryId);
    //     $requete->execute();
    //     // ...
    // }
}
