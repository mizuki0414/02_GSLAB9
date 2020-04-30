//section 1
//APIを利用する際のURL
var KEY = "";
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
  $(".resultArea").removeClass("hidden");
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
      console.log("read!");
      // const html = $("<img src='" + dataUrl + "'>"); Pushしたい構造が違うので、修正
      const html = $("<li class='imgList' style='background-image: url(" + dataUrl + "); background-size: cover; margin-right: 5px;'>");
      $("#showPic").append(html);
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
    //この変数に、表情のlikelihood,Angleの値を配列として保持する
    var facialExpression = [];
    facialExpression.push(result.responses[0].faceAnnotations[0].joyLikelihood);
    facialExpression.push(result.responses[0].faceAnnotations[0].sorrowLikelihood);
    facialExpression.push(result.responses[0].faceAnnotations[0].angerLikelihood);
    facialExpression.push(result.responses[0].faceAnnotations[0].surpriseLikelihood);
    facialExpression.push(result.responses[0].faceAnnotations[0].headwearLikelihood);

    // この変数に仰角を入れていく
    var angleExpression = [];
    angleExpression.push(result.responses[0].faceAnnotations[0].panAngle);
    angleExpression.push(result.responses[0].faceAnnotations[0].tiltAngle);
    console.log(angleExpression);

    // 検出精度を入れていく
    var accuracyExpression = [];
    accuracyExpression.push(result.responses[0].faceAnnotations[0].detectionConfidence);
    accuracyExpression.push(result.responses[0].faceAnnotations[0].landmarkingConfidence);
    console.log(accuracyExpression);

    // この処理を関数化する（後ほど）
    for (var k = 0; k < facialExpression.length; k++) {
      if (facialExpression[k] == "UNKNOWN") {
        facialExpression[k] = 0;
      } else if (facialExpression[k] == "VERY_UNLIKELY") {
        facialExpression[k] = 2;
      } else if (facialExpression[k] == "UNLIKELY") {
        facialExpression[k] = 4;
      } else if (facialExpression[k] == "POSSIBLE") {
        facialExpression[k] = 6;
      } else if (facialExpression[k] == "LIKELY") {
        facialExpression[k] = 8;
      } else if (facialExpression[k] == "VERY_LIKELY") {
        facialExpression[k] = 10;
      }
    }

    //チャート描画の処理1
    const chartHTML1 = $("<li></li>");
    chartHTML1.highcharts({
      chart: {
        polar: true,
        type: "area",
        backgroundColor: "#111111",
      },
      title: {
        text: "People Expression Chart",
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
    $("#chartArea1").append(chartHTML1);

    //チャート描画の処理2
    const chartHTML2 = $("<li></li>");
    chartHTML2.highcharts({
      chart: {
        polar: true,
        type: "area",
        backgroundColor: "#111111",
      },
      title: {
        text: "People FaceAngle Chart",
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
    $("#chartArea2").append(chartHTML2);

    //チャート描画の処理3
    const chartHTML3 = $("<li></li>");
    chartHTML3.highcharts({
      chart: {
        polar: true,
        type: "area",
        backgroundColor: "#111111",
      },
      title: {
        text: "People FaceAngle Chart",
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
    $("#chartArea3").append(chartHTML3);

  } else {
    //表情に関する結果が得られなかった場合、表示欄にはその旨を記す文字列を表示
    $("#chartArea").append(
      "<div><b>No person can be found in the picture</b></div>"
    );
  }
  //テキスト解読の結果を表示
  if (result.responses[0].textAnnotations) {
    for (var j = 1; j < result.responses[0].textAnnotations.length; j++) {
      if (j < 16) {
        $("#textBox").append(
          "<tr><td class='resultTableContent'>" +
            result.responses[0].textAnnotations[j].description +
            "</td></tr>"
        );
      }
    }
  } else {
    //テキストに関する結果が得られなかった場合、表示欄にはその旨を記す文字列を表示
    $("#textBox").append(
      "<tr><td class='resultTableContent'><b>No text can be found in the picture</b></td></tr>"
    );
  }
}