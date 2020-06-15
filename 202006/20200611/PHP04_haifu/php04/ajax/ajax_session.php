<?php
/************************************************************
 *  session1.php
 *  SESSION表示
 *  画面がリロードされてもSESSIONに値が残ってる事を確認
 ************************************************************/

//必ずsession_startは最初に記述
//この記述をすることでアクセスしたブラウザに、session IDをサーバーから割り振られます
//session_id は今現在アクセスしてるブラウザに対してサーバー上で重複しないユニークキーを発行してます。
session_start();

//session_id(); は現在割り振られてる「SESSION ID」を取得する関数ですします。
echo session_id()."<br>";
?>


<html>
<head>
<meta charset="utf-8">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<meta name="" content="<?= session_id(); ?>">

<script>
var a = "<?= session_id(); ?>";
</script>

</head>
<body>
AjaxSession

<button id="send">SESSION_送信</button>

<script>
$("#send").on("click",function(){
$.ajax({
    url: "hogehoge.php",
    type: "POST",
    data: {
        "foo" : "bar"
    },
    beforeSend: function(xhr) {
        xhr.setRequestHeader('PHPSESSID','<?=$_COOKIE["PHPSESSID"]?>');
    },
    success: function(json_result) {
        // 中略
        alert(json_result);
    },
    error: function() {
        // 中略
    },
    complete: function() {
        // 中略
    }
});
});
</script>
</body>
</html>













