# 02_GSLAB9

・margin: 0 auto;
は上下方向のMerginは0左右は等間隔で空いている。

・画像を中央に揃えるやり方について
良くある間違えについて、imgタグ自体に中央揃えをやっている奴がいるけど、画像を囲んでいる、タグ自体に実施

・反省点として、今日書いたソースコードはtext-alighをcssに何回も書いていたのでダメでclass自体を定義してcssを一回で定義しよう

・marginとpaddingの違い
ボックス内側の余白をpadding、外側の余白をmarginと呼びます。

・marginが重なり合う時は相殺される
⇨paddingはされない

・テキストアラインについて
text-align: justify;
⇨これは行端揃え
text-align: inter-deograph;
⇨これはjustifyはieだと聞かないの

・横並びのやり方
⇨flexboxは古いieとかはダメ

・FlexBoxの理解これは段階があって、、、
1.親要素と子要素の理解

[基礎]
⇨Flexコンテナ（親要素）、flexアイテム（子要素）
⇨孫要素に影響しない
⇨主軸と交差軸
2.Display:flex;を使ったシンプルな横並びができる
3.flexコンテナに適用する、CSSプロパティを使いこなせる
⇨justify-content・・・横軸の整列ルールを決める
⇨align-items・・・縦軸のサイズルールを決める
4.flexアイテム適用するCSSプロパティを使いこなせる
5.flexboxを極める
⇨flexプロパティを取得することで様々なレイアウトができる
「flex-wrap」は、flexbox（flexコンテナ内のflexアイテム）の横または縦の折り返し方法を指定します。

・擬似クラス
checked:でチェック時の