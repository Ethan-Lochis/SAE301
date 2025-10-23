<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once "src/Controller/EntityController.php";
require_once "src/Repository/CategoriesRepository.php";


// This class inherits the jsonResponse method  and the $cnx propertye from the parent class Controller
// Only the process????Request methods need to be (re)defined.

class DisconnectController extends EntityController
{

    private CategoryRepository $Categories;

    public function __construct()
    {
        $this->Categories = new CategoryRepository();
    }


    protected function processGetRequest(HttpRequest $request)
    {
        $_SESSION = [];  //session_unset() equivalent qui efface le contenu
        // antidater cookie
        setcookie(session_name(), '', time() - 15);
        // suppression session
        session_destroy();
    }


    protected function processPostRequest(HttpRequest $request)
    {
        return null;
    }

}

?>