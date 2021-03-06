// section 0 初期設定
var database = firebase.database();
let room = "face_detect_data";
const send = document.getElementById("send");

//section 1
//APIを利用する際のURL
var KEY = "AIzaSyBJrs9ze94beUilqJvXZJvMMrKNYW-L1O4";
var url = "https://vision.googleapis.com/v1/images:annotate?key=";
var api_url = url + KEY;

//section 2
//画面の表示内容をクリア
function clear() {
  if ($("#chartArea div").length) {
    $("#chartArea div").remove();
  }
  $("#resultBox tr td").text("");
}

//section 3
//画像がアップロードされた時点で呼び出される処理
$("#uploader").change(function (evt) {
  getImageInfo(evt);
  clear();
  $(".resultsPain").removeClass("hidden");
  $(".average").removeClass("hidden");
});

//section 4
//画像ファイルを読み込み、APIを利用するためのURLを組み立てる
function getImageInfo(evt) {
  var file = evt.target.files;
  //  var reader = new FileReader();
  var dataUrl = "";
  for (var i = 0; i < file.length; i++) {
    const reader = new FileReader(); //追加
    reader.readAsDataURL(file[i]);
    reader.onload = function () {
      dataUrl = reader.result;
      // const html = $("<img src='" + dataUrl + "'>"); Pushしたい構造が違うので、修正
      const html = $("<li class='imgList' style='background-image: url(" + dataUrl + "); background-size: cover; margin-right: 5px; border-radius: 50px;'>");
      $("#picPain").append(html);
      makeRequest(dataUrl, getAPIInfo);
    };
  }
}

//section 5
//APIへのリクエストに組み込むJsonの組み立て
function makeRequest(dataUrl, callback) {
  var end = dataUrl.indexOf(",");
  var request =
    "{'requests': [{'image': {'content': '" +
    dataUrl.slice(end + 1) +
    "'},'features': [{'type': 'LABEL_DETECTION','maxResults': 10,},{'type': 'FACE_DETECTION',},{'type':'TEXT_DETECTION','maxResults': 20,}]}]}";
  callback(request);
}

//section 6
//通信を行う
function getAPIInfo(request) {
  $.ajax({
    url: api_url,
    type: "POST",
    async: true,
    cashe: false,
    data: request,
    dataType: "json",
    contentType: "application/json",
  })
    .done(function (result) {
      showResult1(result);
    })
    .fail(function (result) {
      alert("failed to load the info");
    });
}

// 結果の出力部
//section 7
//得られた結果を画像の直下に表示する
function showResult1(result) {
console.log(result.responses[0].faceAnnotations[0]);

    if (result.responses[0].faceAnnotations) {

    //この変数に、検出精度の値を配列として保持する
    var accuracyExpression = [];
    accuracyExpression.push(result.responses[0].faceAnnotations[0].detectionConfidence);
    accuracyExpression.push(result.responses[0].faceAnnotations[0].landmarkingConfidence);

    //この変数に、表情のlikelihoodの値を配列として保持する
    var facialExpression = [];
    facialExpression.push(result.responses[0].faceAnnotations[0].joyLikelihood);
    facialExpression.push(result.responses[0].faceAnnotations[0].sorrowLikelihood);
    facialExpression.push(result.responses[0].faceAnnotations[0].angerLikelihood);
    facialExpression.push(result.responses[0].faceAnnotations[0].surpriseLikelihood);
    facialExpression.push(result.responses[0].faceAnnotations[0].headwearLikelihood);

    // 数値に変換
    for (var k = 0; k < facialExpression.length; k++) {
      if (facialExpression[k] == "UNKNOWN") { facialExpression[k] = 0; }
      else if (facialExpression[k] == "VERY_UNLIKELY") { facialExpression[k] = 2; }
      else if (facialExpression[k] == "UNLIKELY") { facialExpression[k] = 4; }
      else if (facialExpression[k] == "POSSIBLE") { facialExpression[k] = 6; }
      else if (facialExpression[k] == "LIKELY") { facialExpression[k] = 8; }
      else if (facialExpression[k] == "VERY_LIKELY") { facialExpression[k] = 10; }
    }

    //この変数に、仰角の値を配列として保持する
    var angleExpression = [];
    angleExpression.push(result.responses[0].faceAnnotations[0].panAngle);
    angleExpression.push(result.responses[0].faceAnnotations[0].tiltAngle);

    console.log(angleExpression);
    //チャート描画の処理3
    const chartHTML1 = $("<li></li>");
    chartHTML1.highcharts({
      chart: {
        polar: true,
        type: "area",
        backgroundColor: "#111111",
      },
      title: {
        text: "Accracy Chart",
      },
      pane: {
        size: "100%",
      },
      xAxis: {
        categories: ["detectionConfidence", "landmarkingConfidence"],
        tickmarkPlacement: "on",
        lineWidth: 0,
      },
      yAxis: {
        lineWidth: 0,
        max: 1,
        min: 0,
      },
      tooltip: {
        shared: true,
        pointFormat:
          '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
      },
      series: [
        {
          name: "faceangle",
          data: accuracyExpression,
          pointPlacement: "on",
        },
      ],
    });
    $("#chartContainer").append(chartHTML1);


    //チャート描画の処理1
    const chartHTML2 = $("<li></li>");
    chartHTML2.highcharts({
      chart: {
        polar: true,
        type: "area",
        backgroundColor: "#111111",
      },
      title: {
        text: "Expression Chart",
      },
      pane: {
        size: "100%",
      },
      xAxis: {
        categories: ["joy", "sorrow", "anger", "surprise", "headwear"],
        tickmarkPlacement: "on",
        lineWidth: 0,
      },
      yAxis: {
        gridLineInterpolation: "polygon",
        lineWidth: 0,
        max: 10,
        min: 0,
      },
      tooltip: {
        shared: true,
        pointFormat:
          '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
      },
      series: [
        {
          name: "likelihood",
          data: facialExpression,
          pointPlacement: "on",
        },
      ],
    });
    $("#chartContainer").append(chartHTML2);

    //チャート描画の処理2
    const chartHTML3 = $("<li></li>");
    chartHTML3.highcharts({
      chart: {
        polar: true,
        type: "area",
        backgroundColor: "#111111",
      },
      title: {
        text: "FaceAngle Chart",
      },
      pane: {
        size: "100%",
      },
      xAxis: {
        categories: ["panAngle", "tiltAngle"],
        tickmarkPlacement: "on",
        lineWidth: 0,
      },
      yAxis: {
        lineWidth: 0,
        max: 50,
        min: -50,
      },
      tooltip: {
        shared: true,
        pointFormat:
          '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
      },
      series: [
        {
          name: "faceangle",
          data: angleExpression,
          pointPlacement: "on",
        },
      ],
    });
    $("#chartContainer").append(chartHTML3);

    //DBにデータを格納する。
    //データ送信処理
    let now = new Date();
    let Month = now.getMonth() + 1
    database.ref(room).push({
        name: "TestData",
        detectionConfidence: accuracyExpression[0],
        landmarkingConfidence: accuracyExpression[1],
        joyLikelihood: facialExpression[0],
        sorrowLikelihood: facialExpression[1],
        angerLikelihood: facialExpression[2],
        surpriseLikelihood: facialExpression[3],
        headwearLikelihood: facialExpression[4],
        panAngle: angleExpression[0],
        tiltAngle: angleExpression[1],
        date: now.getFullYear() + '/' + Month + '/' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes()
    });

    //受信処理
    database.ref(room).on("child_added", function(data) {
      const v = data.val();
      const k = data.key;
      // 取得したDBデータ
      let str = "";
      str += '<li class="dataLists"><div class="name">Name：'+v.name+'</div>';
      str += '<div class="text">Date：'+v.date+'</div>';
      str += '<div class="text">DetectionConfidence：'+v.detectionConfidence+'</div>';
      str += '<div class="text">LandmarkingConfidence：'+v.landmarkingConfidence+'</div>';
      str += '<div class="text">JoyLikelihood：'+v.joyLikelihood+'</div>';
      str += '<div class="text">SorrowLikelihood：'+v.sorrowLikelihood+'</div>';
      str += '<div class="text">AngerLikelihood：'+v.angerLikelihood+'</div>';
      str += '<div class="text">SurpriseLikelihood：'+v.surpriseLikelihood+'</div>';
      str += '<div class="text">HeadwearLikelihood：'+v.headwearLikelihood+'</div>';
      str += '<div class="text">PanAngle：'+v.panAngle+'</div>';
      str += '<div class="text">TiltAngle：'+v.tiltAngle+'</div></li>';
      output.innerHTML += str;
      // 平均値
      // let avg = "";
      // avg += '<li class="dataLists"><div class="name">Name：'+v.name+'</div>';
      // avg += '<div class="text">Date：'+v.date+'</div>';
      // avg += '<div class="text">DetectionConfidence：'+v.detectionConfidence+'</div>';
      // avg += '<div class="text">LandmarkingConfidence：'+v.landmarkingConfidence+'</div>';
      // avg += '<div class="text">JoyLikelihood：'+v.joyLikelihood+'</div>';
      // avg += '<div class="text">SorrowLikelihood：'+v.sorrowLikelihood+'</div>';
      // avg += '<div class="text">AngerLikelihood：'+v.angerLikelihood+'</div>';
      // avg += '<div class="text">SurpriseLikelihood：'+v.surpriseLikelihood+'</div>';
      // avg += '<div class="text">HeadwearLikelihood：'+v.headwearLikelihood+'</div>';
      // avg += '<div class="text">PanAngle：'+v.panAngle+'</div>';
      // avg += '<div class="text">TiltAngle：'+v.tiltAngle+'</div></li>';
      // avarage.innerHTML += avg;
    });

  } else {
    //表情に関する結果が得られなかった場合、表示欄にはその旨を記す文字列を表示
    $("#chartArea").append(
      "<div><b>No person can be found in the picture</b></div>"
    );
  }
}