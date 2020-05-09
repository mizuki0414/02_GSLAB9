// console.log("hello world");

// non blocking
    // setTimeout(function() {
    //     console.log("hello"); }, 1000);
    // console.log("world");
// blocking
// JavaScriptにおいてコールバック関数とは、ある関数を呼び出す時に、
// 引数として指定する関数で、FuncAの処理が完了した時にFuncAの結果を通知するために起動される関数のことを指します。
    var start = new Date().getTime();
    while (new Date().getTime() < start + 1000);
    console.log("world");