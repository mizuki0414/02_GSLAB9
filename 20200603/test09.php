<?php
$name = $_POST["name"];
$mail = $_POST["mail"];
$memo = $_POST["memo"];
$c = ",";
$str = $name.$c.$mail.$c.$memo;
// ファイルの操作
// File読み込み,aは読み込みだよ
$file - fopen("data/data.txt","a");
fwrite($file,$str."\r\n");
fclose($file);
?>