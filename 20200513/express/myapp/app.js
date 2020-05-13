const express = require('express');
const app = express();
const PORT = 3000;

// app.set
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app,useで静的ファイルのルーティングを行う
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

// app.param:ルーティングの処理の中で出てきたパラメータに対しての共通処理
// app.param('id', (req, res, next, id) => {
//     const users = ['taguchi', 'fkoji', 'dotinstall'];
//     req.params.name = users[id];
//     next();
// });

// app.get('/hello/:id', (req, res) => {
//     res.send('hello' + req.params.name);
// });

// app.get('/bye/:id', (req, res) => {
//     res.send('bye' + req.params.name);
// });

app.get('/new', (req, res) => {
    res.render('new');
});
app.post('/create', function(req, res){
    res.send(req.body.name);
});

// app.post('/create', (req, res) => {
//     res.send('bye' + req.params.name);
// });

// // get
// app.get('/', (req, res) => res.render('index', {title: 'title'}));

// // つまり関数リテラルとはソースコードに直接べた書きされた関数のこと。
// // JavaScriptでは関数はデータ型のひとつなので、変数に代入したり、関数の引数として渡したり、戻り値として関数を返すことが可能です。
// // アロー関数は関数リテラルをシンプルに記述する方法だからです。
// // アロー関数は基本的に(引数,...)=>{...関数の本体...}
// app.get('/users/:name?', (req, res) => {
//     if (req.params.name) {
//     res.send('hello, ' + req.params.name);
//     } else {
//         console.log('there is no name.');
//     }
// });

// // 正規表現で/items/num形式の場所をとってくる時
// app.get('/items/:id([0-9]+)', (req, res) => {
//     res.send('item no:' + req.params.id);
// });

// // テキストファイルから内容を読み込む
// app.get('/hello.txt', (req, res) => {
//     res.sendfile(__dirname + '/public/hello.txt');('item no: ' + req.params.id);
// });

// listenメッセージの出力
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});