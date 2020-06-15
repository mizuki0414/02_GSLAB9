const fs = require('fs');
// テストデータの読み込み
fs.readFile('testdata.json', 'utf8', function(err, data) {
    // テストデータのスプリット
    let lines = data.toString().split('\n');
    console.log(lines);
    // カウンタの設定
    let count = 0;
    let countup = function(){
      count++
      console.log(count);
      if (count < lines.length) {

        console.log(lines[count]);
        // ファイルへの書き込み
        fs.writeFileSync('coordinates.json', lines[count]);

        } else if (count >= lines.length) {

            let newcount = count % lines.length
            fs.writeFileSync('coordinates.json', lines[newcount]);

        }
    }
    setInterval(countup, 1500);

})