<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-JP"></head>
<body>

<?php

	$posttype = $_POST['type'];//ラジオボタンのタイプを入れる

	//注意①
	$num = 3;//ラジオボタンの数
	$strLength = 100;//文字列の最大の長さ
	$filename = "answer.txt";//アンケートの記述項目を保存するtxtファイル名

	//DB
	//データベースに接続する．引数に注意
	// データベースへの接続に必要な変数を指定
	$host = '127.0.0.1';
	$username = 'root';
	$passwd = '';
	$dbname = 'test';
	// データベースへ接続
	$db = mysqli_connect($host, $username, $passwd, $dbname);

	// 接続チェック
	if (!$db) {
	die('データベースの接続に失敗しました。');
	}
	echo "データベースの接続に成功しました！ \n";

	$result = mysqli_query($db,"select * from test_result");
	$array = mysqli_fetch_array($result);
	var_dump($array);

	print "アンケートに協力していただきありがとうございます。<br>";
	print "あなたの解答：";

	//注意②
	if( $posttype == 1 ){
			print "良かった<br><br>";
			$counter = $array['counter01'];
		}

		else if( $posttype == 2 ) {
			print "悪かった<br><br>";
			$counter = $array['counter02'];
		}

		else if( $posttype == 3 ) {

			$counter = $array['counter03'];

			if(mb_strlen($_POST['test_about_other']) > $strLength) {
				//最大の文字数
				$limitedStr = mb_substr($_POST['test_about_other'], 0, $strLength);
				echo "over100";
			}

			else $limitedStr = $_POST['test_about_other'];



			print "その他 \"".$limitedStr."\"<br><br>";

			$file = fopen( $filename, "r+");
			flock( $file, LOCK_EX );  //注意②-２
			fseek($file, 0 , SEEK_END);

			//時間を入れる
			$today = getdate();

			fwrite($file, $today[year]."年".$today[mon]."月".$today[mday]."日"
			.$today[hours]."時".$today[minutes]."分".$today[seconds]."秒");
			fwrite($file, ":コメント:\"".$limitedStr."\"\n");
			flock($file, LOCK_UN );
			fclose($file);
			//時間を入れる記述はここまで

		}

	//ラジオボタンの値がおかしいとき
	else {
		echo "ERROR";
		exit;
	}

	$counter++;//選ばれたラジオボタンの票の数を1増やす

	//注意③
	//DBの更新
	$posttype=addslashes($posttype);
	$result = mysqli_query($db,"update test_result set counter0".$posttype."=$counter");
		//宿題①
		//php.iniが以下の設定なら$posttype($_POSTより引き継いだ変数)をaddslashes関数に
    	 //通す必要はありません.

		//php.ini
		//; Magic quotes
		//;
		//
		//; Magic quotes for incoming GET/POST/Cookie data.
		//magic_quotes_gpc = On

		//offなら
		//シングルクォート、ダブルクォート、バックスラッシュ、
		//NULLバイトをバックスラッシュで文字に変換
		//addslashes();


	//更新後の結果を取得
	$result = mysqli_query($db,"select * from test_result");
	$array = mysqli_fetch_array($result);


	$sum = 0;//全体の票を数えるために使用される$sum変数

	//全体の票を計算 宿題②
	for( $i = 0; $i<$num; $i++){
		$sum += $array[$i];
	}

	//グラフの描画

	//graphの長さを割合で計算するために使用する変数
	$graph_length = 0;

	for($i = 0; $i <$num; $i++){

		//小数点以下を長くしないように工夫  注意④
		$percentage = round(($array[$i]*100/$sum)*10)/10;

		$graph_length = (int)($percentage*2);//小数点をカット

		$button_num = $i+1;//ラジオボタンの番号を計算する

	//グラフの描画
	print "ボタン$button_num <img src=\"graph.gif\" width=\"$graph_length
	 \" height=\"5\">  $percentage"."%    ";

	print $array[$i]."票<br><br>";
	}


	//最後に戻るボタン
	print "<a href = \"./ank.html\">戻る</a>";
?>

</body>
</html>