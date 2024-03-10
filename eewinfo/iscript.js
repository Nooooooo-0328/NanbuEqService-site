function convertType(issue_) {
    switch (issue_) {
      case "ScalePrompt":
          return "震度速報"
        case "Destination":
          return "震源に関する情報"
        case "ScaleAndDestination":
          return "震源 ・ 震度に関する情報"
        case "DetailScale":
          return "各地の震度に関する情報"
        case "Foreign":
          return "遠地地震に関する情報"
        case _:
          return "その他"
      }
}

async function fetchData() {
    try {
        const response = await fetch('https://api.p2pquake.net/v2/history?codes=551&limit=1');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('プログラムエラー:', error);
        document.getElementById("earthquake-info").innerHTML = `<h2><font color="red">プログラムエラーが発生しています。</font><br>一番下までスクロールし、プログラムエラー情報を確認してください。</h2>`;
        document.getElementById("earthquake--info").innerHTML = `<h2>地震情報機能: <font color="red">${error}</font></h2>`;
        return null;
    }
}

async function displayData() {
    var pointsText = "■各地の震度情報";
    var points = ["", "", "", "", "", "", "", "", "", ""];
    var scales = {
        "-1": 9, "10": 8, "20": 7, "30": 6, "40": 5,
        "45": 4, "50": 3, "55": 2, "60": 1, "70": 0
    };
    var scalesText = {
        "-1": '', "10": '1', "20": '2', "30": '3', "40": '4', "45": '5弱', "50": '5強', "55": '6弱', "60": '6強', "70": '7'
    };
    var pointNameList = [[], [], [], [], [], [], [], [], [], []];

    const data = await fetchData();

    const issue = data[0].issue;
    const issue_ = issue.type
    const type = convertType(issue_);

    if (data && data[0]['points'].length > 0) {
        for (var i = 0; i < data[0]['points'].length; i++) {
            var point = data[0]['points'][i];
            if (point['scale'] in scales) {
                var scale = scales[point['scale']];
                var pointName = point['pref'];

                if (points[scale] === "") {
                    points[scale] = points[scale] + "<br><br>[震度" + scalesText[point['scale']] + "]";
                }

                if (!pointNameList[scale].includes(pointName)) {
                    pointNameList[scale].push(pointName);
                    points[scale] = points[scale] + "<br>" + pointName + ": ";
                }

                points[scale] = points[scale] + " " + point['addr'] + " ";

            } else {
                continue;
            }
        }

        var pointsDisplayText = '';
        for (var i = 0; i < points.length; i++) {
            pointsDisplayText = pointsDisplayText + points[i];
        }
        document.getElementById("points-info").innerHTML = `<h2>${pointsText + pointsDisplayText}</h2>`;
    } else {
        document.getElementById("points-info").innerHTML = `<h2>■各地の震度情報</h2><br><h2>${type}のため、各地の震度情報の発表はありません。<br>各地の震度情報が発表されているのに、表示されていない場合、本サイトのプログラムエラーが原因の可能性があります。</h2>`;
    }
}


setInterval(displayData, 5000)