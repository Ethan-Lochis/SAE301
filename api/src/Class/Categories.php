<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once('Entity.php');

/**
 * Class Category
 * 
 * Représente un produit avec uniquement 3 propriétés (id, name, category)
 * Implémente l'interface JsonSerializable pour pouvoir convertir un objet Category en JSON.
 */
class Category extends Entity implements JsonSerializable
{
    private int $id;           // ID du produit
    private ?string $name = null; // Nom du produit (nullable pour éviter erreur si non initialisé)

    /**
     * Constructeur
     */
    public function __construct(int $id)
    {
        $this->id = $id;
    }

    /**
     * Récupère l'ID du produit
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * Définit l'ID du produit
     *
     * @return self
     */
    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    /**
     * Récupère le nom du produit
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * Définit le nom du produit
     *
     * @return self
     */
    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Implémentation de JsonSerializable
     * Retourne un tableau associatif que json_encode peut convertir en JSON
     */
    public function jsonSerialize(): mixed
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
        ];
    }
}
