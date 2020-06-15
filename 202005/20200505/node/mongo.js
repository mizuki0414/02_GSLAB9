// なんかこの書き方じゃダメらしい
// var MongoClient = require('mongodb').MongoClient,
//     settings = require('./settings');
// MongoClient.connect("mongodb://127.0.0.1:27017/nodedb?gssapiServiceName=mongodb",(err, db) => {
//     if (err) { return console.dir(err); }
//     console.log("connected to db");
//     db.collection("users", (err, collection) => {
//         var docs = [
//             {name: "taguchi", score: 40},
//             {name: "fkoji", score: 80},
//             {name: "fkoji", score: 60}
//         ];
//         collection.insert(docs, (err, result) => {
//             console.dir(result);
//         });
//     });
// });

const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://127.0.0.1:27017/nodedb?gssapiServiceName=mongodb";

MongoClient.connect(url, (err, client) => {  //dbからclientに変更
    const db = client.db("nodedb")
    db.collection("users",(error, collection) => {
        collection.insertMany([
            { name: 'Bob', age: 24 },
            { name: 'john', age: 30 }
        ],(error,result) => {
            client.close();  //db.close()から変更
        });
        // レコードの表示
        // けど、ToArreyはメモリとかを逼迫するらしいので、、、streamで表示する。
        // collection.find({name: "Bob"}).toArray(function(err,items){
        //     console.log(items);
        var stream = collection.find().stream();
        stream.on("data", function(item) {
            console.log(item);
        });
    });
});