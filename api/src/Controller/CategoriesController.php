<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once "src/Controller/EntityController.php";
require_once "src/Repository/CategoriesRepository.php";


// This class inherits the jsonResponse method  and the $cnx propertye from the parent class Controller
// Only the process????Request methods need to be (re)defined.

class CategoriesController extends EntityController
{

    private CategoryRepository $Categories;

    public function __construct()
    {
        $this->Categories = new CategoryRepository();
    }


protected function processGetRequest(HttpRequest $request)
{
    try {
        $id = $request->getId("id");

        if ($id) {
            // URI is .../categories/{id} -> On récupère tous les éléments de cette catégorie
            $result = $this->Categories->findAllByCategory($id);

            if (!$result) {
                http_response_code(404);
                return [
                    'error' => 'No items found for this category ID',
                    'function' => __FUNCTION__,
                    'id' => $id
                ];
            }

            return $result;
        } else {
            // URI is .../categories
            $cat = $request->getParam("category"); // Is there a category parameter in the request?

            if ($cat == false) {
                $result = $this->Categories->findAll();

                if (!$result) {
                    http_response_code(404);
                    return [
                        'error' => 'No categories found',
                        'function' => __FUNCTION__
                    ];
                }

                return $result;
            } else {
                $result = $this->Categories->findAllByCategory($cat);

                if (!$result) {
                    http_response_code(404);
                    return [
                        'error' => 'No items found for category',
                        'function' => __FUNCTION__,
                        'category' => $cat
                    ];
                }

                return $result;
            }
        }

    } catch (PDOException $e) {
        http_response_code(500);
        return [
            'error' => 'Database error',
            'message' => $e->getMessage(),
            'function' => __FUNCTION__,
            'trace' => $e->getTraceAsString()
        ];
    } catch (Exception $e) {
        http_response_code(500);
        return [
            'error' => 'General error',
            'message' => $e->getMessage(),
            'function' => __FUNCTION__,
            'trace' => $e->getTraceAsString()
        ];
    }
}


    protected function processPostRequest(HttpRequest $request)
    {
        $json = $request->getJson();
        $obj = json_decode($json);
        $p = new Category(0); // 0 is a symbolic and temporary value since the Categories does not have a real id yet.
        $p->setName($obj->name);
        $p->setId($obj->category);
        $ok = $this->Categories->save($p);
        return $ok ? $p : false;
    }

}

?>