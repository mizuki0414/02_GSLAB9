<?php

$fp = fopen( "answer.txt", "r" );

while( !feof( $fp ) ){
 //feof関数 ファイルポインタがEOF(END OF FILE)に到達したらtrue
 print ( fgets( $fp )."<br>" );//1kまで maxlength
}

?>