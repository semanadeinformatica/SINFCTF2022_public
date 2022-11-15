<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include('../model/candy.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['object'])) {
        http_response_code(400);
        exit('missing "object" prop');
    }
    $candy = unserialize($_POST['object'], ['allowed_classes' => [\Candy::class]]);
    if (!($candy instanceof Candy)) {
        http_response_code(400);
        return;
    }
    $candy->logToFile();
} else {
    http_response_code(400);
}
