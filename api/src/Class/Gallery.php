<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'Entity.php';

/**
 * Class Gallery
 * 
 * Représente un objet Gallery
 * Implémente l'interface JsonSerializable pour permettre la conversion en JSON
 */
class Gallery extends Entity implements JsonSerializable
{
    private int $id;     // ID de l'image
    private string $url; // URL de l'image

    /**
     * Constructeur
     */
    public function __construct(int $id)
    {
        $this->id = $id;
    }

    /**
     * Définit comment convertir l'objet Gallery en JSON
     * 
     * @return mixed Tableau associatif représentant l'objet
     */
    public function jsonSerialize(): mixed
    {
        return [
            "id"  => $this->id,
            "url" => $this->url,
        ];
    }

    /**
     * Récupère l'ID de la galerie
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * Définit l'ID de la galerie
     *
     * @return self
     */
    public function setIdGallery(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    /**
     * Récupère l'URL de l'image
     */
    public function getURL(): string
    {
        return $this->url;
    }

    /**
     * Définit l'URL de l'image
     *
     * @return self
     */
    public function setURL(string $url): self
    {
        $this->url = $url;
        return $this;
    }

}
