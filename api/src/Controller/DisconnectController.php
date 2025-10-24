<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once "src/Controller/EntityController.php";
require_once "src/Repository/CategoriesRepository.php";



class DisconnectController extends EntityController
{

    private CategoryRepository $Categories;

    public function __construct()
    {
        $this->Categories = new CategoryRepository();
    }


    protected function processGetRequest(HttpRequest $request)
    {
        $_SESSION = [];
        setcookie(session_name(), '', time() - 15);
        session_destroy();
    }


    protected function processPostRequest(HttpRequest $request)
    {
        return null;
    }

}

?>