<?php
/* Require Slim and plugins */
require 'vendor/autoload.php';

$app = new \Slim\App;
/* Database Configuration */
$dbhost   = 'localhost';
$dbuser   = 'root';
$dbpass   = 'dbathome';
$dbname   = 'car_park';
$dbmethod = 'mysql:dbname=';
$dsn = $dbmethod.$dbname;

$pdo = new PDO($dsn, $dbuser, $dbpass);
$db = new NotORM($pdo);

$app->post('/car', function ($request, $response, $args) use($db) {
    //TODO: Impelement function
});

$app->get('/cars', function () use($db) {
    $cars = array();
    foreach($db->cars() as $car) {
        $cars[] = array(
            'id' => $car['id'],
            'number' => $car['number'],
            'region' => $car['region'],
            'ticket' => $car['ticket']
        );
    }
    //TODO: Add functionality to se header(in this case content-type)
    echo json_encode($cars, JSON_FORCE_OBJECT);
});

$app->delete('/car', function ($request, $response, $args) use($db) {
    //TODO: Impelement function
});

/* Run the application */
$app->run();

?>