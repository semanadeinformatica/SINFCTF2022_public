<?php

include('../model/candy.php');

function readCandies()
{
    $handle = fopen(Candy::$candyLogPath, "r");
    if (!$handle) {
        return [];
    }

    $candies = [];
    while (($line = fgets($handle)) !== false) {
        $candies[] = trim($line);
    }
    fclose($handle);
    return $candies;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $candies = readCandies();
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['candies' => $candies]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['name'])) {
        http_response_code(500);
        return;
    }
    $candy = new Candy($_POST['name'], isset($_POST['filename']) ? $_POST['filename'] : null);
    $serializedCandy = serialize($candy);
    if (!str_starts_with($candy->name, 'ni') && !str_starts_with($candy->name, 'Ni')) {
        http_response_code(400);
        exit('generated payload does not comply with requirements [name does not start with "Ni" or "ni"]: ' . $serializedCandy);
    }
    if (isset($_POST['filename'])) {
        http_response_code(400);
        exit('generated payload does not comply with requirements [you cannot modify the filename due to security concerns]: ' . $serializedCandy);
    }
    $requestUri = $_SERVER['HTTP_HOST'] . '/api/secret_store.php';
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_TIMEOUT_MS => 50,
        CURLOPT_URL => $requestUri,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => ['object' => serialize($candy)],
    ]);
    curl_exec($ch); // may timeout because of loopback misconfigs, still 50 ms enough (no internet delay)
    http_response_code(200);
    exit('sent payload to secret api: ' . $serializedCandy);
} else {
    http_response_code(500);
}
