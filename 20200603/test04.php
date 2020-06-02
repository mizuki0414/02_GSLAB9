<?php
// phpの場合、外部ファイルを実行するときは、include~~で別ファイルをよび出した上で実行する
include("test07.php");
$name = $_GET["name"];
$mail = $_GET["mail"];
?>
<html>
<head>
<title>お名前></title>
<body>
<!-- xssの対応するときは、こちらの -->
お名前:<?=h($name)?>
EMAIL:<?=h($mail)?>
</body>
</head>
</html>