<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'Entity.php';

/**
 * Class User
 * 
 * Représente un objet User
 * 
 * Implémente l'interface JsonSerializable pour permettre la conversion en JSON
 */
class User extends Entity {
    private int $id;
    private string $username;
    private string $password;
 

    public function __construct(int $id) {
        $this->id = $id;
    }

    /**
     * Définit comment convertir l'objet User en JSON
     * 
     * @return mixed Tableau associatif représentant l'objet
     */
    public function jsonSerialize(): mixed {
        return [
            "id" => $this->id,
            "username" => $this->username,
            "password" =>$this->password,
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
    public function setId(int $id): self {
        $this->id = $id;
        return $this;
    }

    public function getUsername(): string {
        return $this->username;
    }
    public function setUsername(string $username): self {
        $this->username = $username;
        return $this;
    }

    public function getPassword(): string {
        return $this->password;
    }
    public function setPassword(string $password): self {
        $this->password = $password;
        return $this;
    }

}
