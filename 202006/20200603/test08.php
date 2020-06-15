<?php
// phpはサーバサイド用の言語のため、dateで結構柔軟な書き方が出来る
$d = date("Ymd");
$e = date("Y-m-d His");
$f = date("Y年:m分:d日");
echo $d;
echo $e;
echo $f;
?>