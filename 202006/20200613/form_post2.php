<?php
function h($val) {
    return htmlspecialchars($val,ENT_QUOTES);
}
$name = $_POST["name"];
$mail = $_POST["mail"];
?>
<html>
<head>
<meta charset="utf-8">
</head>
<body>
<!-- 下の分はphpの簡略記法-->
<!-- XSSの対策 -->
<p><?= h($name); ?></p>
<p><?= h($mail); ?></p>
</body>
</html>