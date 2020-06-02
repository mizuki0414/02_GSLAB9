<?php
function h($str){
    return htmlspecialchars($str, ENT_QUOTES);
}
function red($str) {
    // phpでは文字列と変数をくっつける時に、以下のように実施する
    return ''.$str.'';
    return '<span style="color:red;">'.$str.'</span>';
}
?>