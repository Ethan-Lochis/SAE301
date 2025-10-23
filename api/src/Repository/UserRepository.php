<?php


error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'EntityRepository.php';
require_once 'src/Class/User.php';

/**
 * Classe UserRepository
 * 
 * Gère l'accès aux données de l'entité User
 * Toutes les opérations CRUD doivent passer par cette classe
 */
class UserRepository extends EntityRepository
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Récupère un User par son ID
     * 
     * @param mixed $id L'identifiant du User
     * @return ?User L'objet User ou null si non trouvé
     */
    public function find($id): ?User
    {
        $requete = $this->cnx->prepare("SELECT * FROM User WHERE id=:value");
        $requete->bindParam(':value', $id);
        $requete->execute();
        $answer = $requete->fetch(PDO::FETCH_OBJ);

        if ($answer == false)
            return null;

        $entity = new User($answer->id);
        return $entity;
    }

    public function loggin($entity): bool
    {

        $requete = $this->cnx->prepare(
            "SELECT * FROM `User` WHERE `username` = :username AND `password` = :password"
        );



        $username = $entity->getUsername();
        $pwd = $entity->getPassword();

        $password = hash('sha256', $pwd);


        $requete->bindParam(':username', $username);
        $requete->bindParam(':password', $password);

        $requete->execute();

        // Vérifie s'il existe au moins une ligne correspondante
        $user = $requete->fetch();

        if ($user) {
            $_SESSION['auth'] = true;
            $_SESSION['username'] = $username;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Récupère tous les Users
     * 
     * @return array Tableau d'objets User
     */
    public function findAll(): array
    {
        // TODO: Implémenter la requête SQL
        // Exemple :
        /*
        $requete = $this->cnx->prepare("SELECT * FROM User");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $res = [];
        foreach ($answer as $obj) {
            $entity = new User($obj->id);
            // $entity->setName($obj->name);
            // TODO: Hydrater chaque objet
            array_push($res, $entity);
        }

        return $res;
        */

        return []; // À remplacer par votre implémentation
    }

    /**
     * Sauvegarde un nouveau User dans la base de données
     * 
     * @param mixed $entity L'objet User à sauvegarder
     * @return bool true si succès, false sinon
     */
    public function save($entity): bool
    {

        $requete = $this->cnx->prepare(
            "INSERT INTO `User`(`username`, `password`) VALUES (:username,:password)"
        );
        $username = $entity->getUsername();
        $pwd = $entity->getPassword();

        $password = hash('sha256', $pwd);


        $requete->bindParam(':username', $username);
        $requete->bindParam(':password', $password);
        $answer = $requete->execute();

        if ($answer) {
            $id = $this->cnx->lastInsertId();
            $entity->setId((int) $id);
            return true;
        }

        return false;

    }

    /**
     * Supprime un User de la base de données
     * 
     * @param mixed $id L'identifiant du User à supprimer
     * @return bool true si succès, false sinon
     */
    public function delete($id): bool
    {
        // TODO: Implémenter la requête DELETE
        // Exemple :
        /*
        $requete = $this->cnx->prepare("DELETE FROM User WHERE id=:value");
        $requete->bindParam(':value', $id);
        return $requete->execute();
        */

        return false; // À remplacer par votre implémentation
    }

    /**
     * Met à jour un User existant dans la base de données
     * 
     * @param mixed $entity L'objet User à mettre à jour
     * @return bool true si succès, false sinon
     */
    public function update($entity): bool
    {
        // TODO: Implémenter la requête UPDATE
        // Exemple :
        /*
        $requete = $this->cnx->prepare(
            "UPDATE User SET name=:name, description=:description WHERE id=:id"
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

    // TODO: Ajouter vos méthodes de recherche personnalisées ici
    // Exemple :
    //
    // public function findAllByCategory($categoryId): array {
    //     $requete = $this->cnx->prepare("SELECT * FROM User WHERE category_id=:cat");
    //     $requete->bindParam(':cat', $categoryId);
    //     $requete->execute();
    //     // ...
    // }
    public function findImages($id)
    {
    }
}
