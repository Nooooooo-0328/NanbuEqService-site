async function fetchData() {
    try {
        const response = await fetch('https://api.p2pquake.net/v2/history?codes=551&limit=1');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
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

    if (data) {
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
        document.getElementById("points-info").innerHTML = "データを取得できませんでした。";
    }
}

setInterval(displayData, 5000)