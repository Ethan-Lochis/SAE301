<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'Entity.php';

/**
 * Class Gallery
 * 
 * Représente un objet Gallery
 * 
 * Implémente l'interface JsonSerializable pour permettre la conversion en JSON
 */
class Gallery extends Entity {
    private int $id;
    private string $url;

    public function __construct(int $id) {
        $this->id = $id;
    }

    /**
     * Définit comment convertir l'objet Gallery en JSON
     * 
     * @return mixed Tableau associatif représentant l'objet
     */
    public function jsonSerialize(): mixed {
        return [
            "id" => $this->id,
            "url" => $this->url,
        ];
    }

    /**
     * Get the value of id
     */
    public function getId(): int {
        return $this->id;
    }

    /**
     * Set the value of id
     */
    public function setIdGallery(int $id): self {
        $this->id = $id;
        return $this;
    }

     public function getURL(): string {
        return $this->url;
    }

    /**
     * Set the value of url
     */
    public function setURL(string $url): self {
        $this->url = $url;
        return $this;
    }

    // TODO: Ajouter vos getters et setters ici
    // Exemple :
    //
    // public function getName(): ?string {
    //     return $this->name;
    // }
    //
    // public function setName(string $name): self {
    //     $this->name = $name;
    //     return $this;
    // }
}
