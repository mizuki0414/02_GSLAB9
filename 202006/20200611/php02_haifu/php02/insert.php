<?php
//1. POSTデータ取得
//$name = filter_input( INPUT_GET, ","name" ); //こういうのもあるよ
//$email = filter_input( INPUT_POST, "email" ); //こういうのもあるよ



//2. DB接続します
try {
  //Password:MAMP='root',XAMPP=''
  $pdo = new PDO('mysql:dbname=********;charset=utf8;host=localhost','******','******');
} catch (PDOException $e) {
  exit('****************:'.$e->getMessage());
}


//３．データ登録SQL作成
$stmt = $pdo->prepare("******* ***** ********( ************* )VALUES( ************");
$stmt->bindValue('******', *****, ****************);  //Integer（数値の場合 PDO::PARAM_INT)
$stmt->bindValue('******', *****, ****************);  //Integer（数値の場合 PDO::PARAM_INT)
$stmt->bindValue('******', *****, ****************);  //Integer（数値の場合 PDO::PARAM_INT)
$status = $stmt->execute();

//４．データ登録処理後
if($status==false){
  //SQL実行時にエラーがある場合（エラーオブジェクト取得して表示）
  $error = $stmt->errorInfo();
  exit("***********:".$error[2]);
}else{
  //５．index.phpへリダイレクト


}
?>
