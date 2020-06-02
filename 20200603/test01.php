<?php
echo "aaaaaaa<br>";
echo "iiiiiii";

session_start();
// セッション情報の取得
$name = $_SESSION['name'];
echo $name;
?>