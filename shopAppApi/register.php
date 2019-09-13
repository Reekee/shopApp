<?php
    include_once("config/autoload.php"); 

    $member_id = $db->QueryMaxId("member", "member_id");
    $member_name = @$REQUEST->member_name;
    $member_lname = @$REQUEST->member_lname;
    $gender_id = @$REQUEST->gender_id;
    $username = @$REQUEST->username;
    $password = @$REQUEST->password;
    $password2 = @$REQUEST->password2;

    function validation($value, $message) {
        if( $value=="" ) {
            echo json_encode(array(
                "code"=>false,
                "message"=>$message
            ));
            exit();
        }
    }
    validation($member_name, "คุณไม่กรอกชื่อ");   // เช็คชื่อว่างไหม
    validation($member_lname, "คุณไม่กรอกนามสกุล"); // เชคนามสกุลว่างไหม
    validation($gender_id, "คุณไม่กรอกเพศ"); 
    validation($username, "คุณไม่กรอกชื่อผู้ใช้งาน");
    validation($password, "คุณไม่กรอกรหัสผ่าน");
    validation($password2, "คุณไม่กรอกยืนยันรหัสผ่าน");
    
    ///// เช็คว่ากรอกยืนยันรหัสผ่านตรงกันไหม
    if( $password!=$password2 ) {
        echo json_encode(array(
            "status"=>false,
            "message"=>"คุณใส่รหัสยืนยันไม่ตรง"
        ));
        exit();
    }

    ///// เช็คว่า username ที่กรอกมาไปซ้ำกับคนื่อนไหม
    $sql = "select * from member where username='".$username."'";
    $rs = $db->QueryObj($sql);
    if( sizeof($rs)==1 ) {
        echo json_encode(array(
            "status"=>false,
            "message"=>"คุณใส่ username ซ้ำกับคนอื่น"
        ));
        exit();
    }

    $sql = "  
        INSERT INTO member (
            member_id,
            member_name,
            member_lname,
            gender_id,
            username,
            password
        ) VALUES (
            '".$member_id."',
            '".$member_name."',
            '".$member_lname."',
            '".$gender_id."',
            '".$username."',
            '".$password."'
        )
    ";
    
    $rs = $db->Query($sql); // คิวรีข้อมูลเพื่อทำการ insert ลงฐาน
    if( $rs ) {
        
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
        
        echo json_encode(array(
            "status"=>true,
            "message"=>"บันทึกข้อมูลสำเร็จ",
            "member"=>$arr[0]
        ));
    } else {
        echo json_encode(array(
            "status"=>false,
            "message"=>"ไม่สามารถติดต่อฐานข้อมูลได้"
        ));
    }