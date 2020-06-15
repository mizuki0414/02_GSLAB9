# 概要

Blenderで作成した3Dモデルを、Three.jsの中に取り込み、ブラウザで表示できるようになるまでの手順を示します。

[Blender](https://www.blender.org/)は、3Dモデルを作成するのに適したソフトウェアです。
また、[Three.js](https://threejs.org/)は、ブラウザ上で動作する3Dモデルを作成するのに適した、JavaScriptのライブラリです。

# 手順
以下のような手順を実施していきます。

1. Blenderでモデルを作成する
1. 作成したモデルをglTF形式のファイルにエクスポートする
1. Three.jsにて、エクスポートしたglTFファイルをロードする

## Blenderでモデルを作成する

本記事ではモデルの作成方法の詳細には触れず、Blenderの情報をThree.jsに持っていく流れの方に焦点を当てています。  
そのため、ここではBlenderのサンプルサイトから取得してきたモデルを使いまわすことにします。

今回は[このページ](https://free3d.com/ja/3d-models/blender-%E5%BB%BA%E7%AF%89)から取得した無料3D建築モデルを利用していきます。

落としてきた圧縮ファイルを解凍すると、その中のどこかに`.blend`の拡張子のファイルがあるので、それをダブルクリックしてBlenderを開きます。
すると、以下のようなBlenderの画面があらわれます。  
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/441085/6802309c-ae9c-a20e-5480-c08bc7d730b4.png)

これにてBlenderモデルを作成できたていとします。

## 作成したモデルをglTF形式のファイルにエクスポートする
画面から、
File → Export → glTF 2.0 (.glb/gltf)
をクリックし、任意の場所にglTFファイルをエクスポートします。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/441085/c199940d-21e4-00fa-aa72-abd34e44e9b8.png)

すると`～～～.glb`ファイルができます。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/441085/bb38e595-e848-d77c-e812-58bc2092dfd9.png)

※このファイルが本当にうまくエクスポートできているか不安な場合は、[このサイト](https://gltf-viewer.donmccurdy.com/)に該当のglbファイルをドラッグアンドドロップして確認することができます。

## Three.jsにて、エクスポートしたglTFファイルをロードする



# 参考
https://threejs.org/docs/#manual/en/introduction/Loading-3D-models