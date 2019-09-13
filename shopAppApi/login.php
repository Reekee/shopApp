<?php
    include_once("config/autoload.php"); 

    $username = @$REQUEST->username;
    $password = @$REQUEST->password;

    // $username = "aa";
    // $password = "aa";

    $sql = "  
    SELECT
        member.member_id,
        member.member_name,
        member.member_lname,
        member.gender_id,
        member.username,
        member.`password`,
        gender.gender_id,
        gender.gender_name
    FROM member
        INNER JOIN gender ON member.gender_id = gender.gender_id    
    WHERE username='".$username."' and `password`='".$password."'  
    ";

    $arr = $db->QueryObj($sql);  // คำสั้งคิวรี่ข้อมูลและทำการส่งกลับเป็น Array

    if( sizeof($arr)==1 ) {
        echo json_encode(array(
            "status"=>true,
            "member"=>$arr[0]
        ));
    } else {
        echo json_encode(array(
            "status"=>false,
            "message"=>"เข้าสู่ระบบไม่สำเร็จ"
        ));
    }

    