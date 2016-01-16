<?php
/* Require Slim and NotORM */
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

$app->post('/car', function ($req, $res, $args) use($db) {
    $car = $req->getParsedBody();
    $result = $db->cars->insert($car);
    return $res->write($result['id']);
});

$app->get('/cars', function ($req, $res, $args) use($db) {
    $cars = array();
    foreach($db->cars() as $car) {
        $cars[] = array(
            'id' => $car['id'],
            'number' => $car['number'],
            'region' => $car['region'],
            'ticket' => $car['ticket']
        );
    }
    return $res->withHeader(
        'Content-Type',
        'application/json'
    )->write(json_encode($cars));
});

$app->delete('/car/{num}/{region}', function ($req, $res, $args) use($db) {
    $num = $args['num'];
    $region = $args['region'];
    $car = $db->cars()->where(array("number" => $num, "region" => $region));
    if($car->fetch()){
        $result = $car->delete();
        $responseBody = json_encode(array(
            "status" => true,
            "message" => "Car deleted successfully."
        ));
    } else {
        $responseBody = json_encode(array(
            "status" => false,
            "message" => "Car with $num number and $region region does not exist."
        ));
    }
    return $res->withHeader(
        'Content-Type',
        'application/json'
    )->write($responseBody);
});

/* Run the application */
$app->run();

?>