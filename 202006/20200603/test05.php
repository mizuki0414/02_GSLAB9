<?php
$a = ["A","B","C"];
$a[]= "D";
$a[]= "E";
// echoでは配列を表示できないので、var_dumpを使う
var_dump($a);

$a = "PHP5_PHP6_PHP7";
// 文字列を置き換える関数の、str_replace
$b = str_replace("PHP","JS",$a);
var_dump($b);
echo $b;

$c = "PHP4,PHP5,PHP6";
// 文字列を特定の文字でsplitする関数、explode
$d = explode(",",$c);
var_dump($d);
echo $d;

?>