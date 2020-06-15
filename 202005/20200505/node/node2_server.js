// ローカルホストにサーバ立ててルーティングする
var http = require('http');
// fileを読み込む
    fs = require('fs');
    ejs = require('ejs');
    qs = require('querystring');
// 設定を外部ファイルに書く
var settings = require('./settings');
var server = http.createServer();
// fsfilereadsyncでのejshtmlを読み込む
var templete = fs.readFileSync(__dirname + '/public_html/bbs.ejs', 'utf-8');
var posts = [];
function renderForm(posts, res) {
    var data = ejs.render(templete, {
        posts: posts
    });
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(data);
        res.end();
    }
    server.on('request', function(req, res) {
    if (req.method == 'POST') {
        req.data = "";
        req.on("readable", function() {
                req.data += req.read();
            });
        req.on("end", function() {
                var query = qs.parse(req.data);
                posts.push(query.name);
                renderForm(posts, res);
        });
        console.log("POST1!!!");
        // 投稿されてない時
    } else {
        renderForm(posts, res);
        console.log("POST2!!!");
    }
});
server.listen(settings.port,settings.host);
console.log("server listeing ....");