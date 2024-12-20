<?php
//$uploaddir = 'uploads';
foreach ($_FILES["pictures"]["error"] as $key => $error) {
 if ($error == UPLOAD_ERR_OK) {
 $tmp_name = $_FILES["pictures"]["tmp_name"][$key];
 $name = basename($_FILES["pictures"]["name"][$key]);
 move_uploaded_file($tmp_name, "$uploaddir/$name");
115
 } else if ($error != UPLOAD_ERR_NO_FILE) {
 echo "Ошибка при загрузке файла!<br/>";
 }
}
?>
