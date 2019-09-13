<?php
    include_once("config/autoload.php"); 

    $sql = "  
    SELECT
        *
    FROM product
    ";

    $arr = $db->QueryObj($sql);  // คำสั้งคิวรี่ข้อมูลและทำการส่งกลับเป็น Array

    echo json_encode(array(
        "status"=>true,
        "product"=>$arr
    ));

    