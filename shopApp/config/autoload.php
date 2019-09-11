<?php
    header('Access-Control-Allow-Origin: *');

    include_once("class.database.php");

    $host = "localhost";
    $user = "root";
    $pass = "";
    $dbname= "db_shop";

    $db = new Database($host, $user, $pass, $dbname);

    $POSTDATA = file_get_contents("php://input");
    $REQUEST = json_decode($POSTDATA);