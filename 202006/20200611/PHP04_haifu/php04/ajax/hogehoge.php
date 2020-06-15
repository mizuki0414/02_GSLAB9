<?php

session_start();

//session_id(); は現在割り振られてる「SESSION ID」を取得する関数ですします。
session_regenerate_id();


echo session_id()."<br>";

?>


