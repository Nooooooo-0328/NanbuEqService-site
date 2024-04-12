const tsunamiLevels = {
    'None': 'この地震による津波の心配はありません。',
    'Unknown': '津波の影響は不明です。',
    'Checking': '津波の影響を現在調査中です。',
    'NonEffective': '若干の海面変動が予想されますが、被害の心配はありません。',
    'Watch': 'この地震で #津波注意報 が発表されています。',
    'Warning': 'この地震で 津波警報等（ #大津波警報 ・ #津波警報 あるいは #津波注意報 ）が発表されています。'
};

async function fetchEarthquakeInfo() {
    try {
        const response = await fetch('https://api.p2pquake.net/v2/history?codes=551&limit=1');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('プログラムエラー:', error);
        document.getElementById("points-info").innerHTML = `<h2><font color="red">プログラムエラーが発生しています。</font><br>一番下までスクロールし、プログラムエラー情報を確認してください。</h2>`;
        document.getElementById("points--info").innerHTML = `<h2>各地の震度情報機能: <font color="red">${error}</font></h2>`;
        return null;
    }
}

function displayTsunamiInfo(domesticTsunami) {
    if (domesticTsunami in tsunamiLevels) {
        return tsunamiLevels[domesticTsunami];
    } else {
        return '津波情報がありません。';
    }
}

function convertMaxScaleToShindo(maxScale) {
    switch (maxScale) {
        case -1:
            return "-";
        case 10:
            return "1";
        case 20:
            return "2";
        case 30:
            return "3";
        case 40:
            return "4";
        case 45:
            return "5弱";
        case 50:
            return "5強";
        case 55:
            return "6弱";
        case 60:
            return "6強";
        case 70:
            return "7";
        default:
            return "不明";
    }
}

function convertType(issue_) {
switch (issue_) {
  case "ScalePrompt":
      return "震度速報"
    case "Destination":
      return "震源に関する情報"
    case "ScaleAndDestination":
      return "震源・震度に関する情報"
    case "DetailScale":
      return "各地の震度に関する情報"
    case "Foreign":
      return "遠地地震に関する情報"
    case _:
      return "その他"
  }
}

async function display_Earthquake_Info() {
  const earthquakeInfoDiv = document.getElementById('earthquake-info');
  const data = await fetchEarthquakeInfo();

  if (data && data.length > 0) {
      const earthquake = data[0].earthquake;
      const issue = data[0].issue;
      const issue_ = issue.type

      const domesticTsunami = earthquake.domesticTsunami;
      const tsunamiInfo = displayTsunamiInfo(domesticTsunami);

      const shindo = convertMaxScaleToShindo(earthquake.maxScale);
      const type = convertType(issue_);

      var currentTime = new Date();
      var date = new Date(earthquake.time);

      var day_ = ('0' + date.getDate()).slice(-2);

      var hours_ = ('0' + date.getHours()).slice(-2);

      var minutes_ = ('0' + date.getMinutes()).slice(-2);


      var timeDifference = Math.floor((currentTime - date) / 1000); // ミリ秒を秒に変換
      
      if (timeDifference < 60) {
          timeo = timeDifference + "秒前";
      } else if (timeDifference < 3600) {
          var minutes = Math.floor(timeDifference / 60);
          timeo = minutes + "分前";
      } else if (timeDifference < 86400) {
          var hours = Math.floor(timeDifference / 3600);
          var remainingMinutes = Math.floor((timeDifference % 3600) / 60);
          timeo = hours + "時間" + remainingMinutes + "分前";
      } else {
          var days = Math.floor(timeDifference / 86400);
          var remainingHours = Math.floor((timeDifference % 86400) / 3600);
          timeo = days + "日前 " + remainingHours + "時間前";
      }
      
      let singen = '';
      let singenJ = '';
      let magu = '';
      if (earthquake.hypocenter.name === '') {
          singen = '-';
          singenJ = '';
      } else {
          singen = `${earthquake.hypocenter.name}`;
          singenJ = `#${earthquake.hypocenter.name} `;
      }
      if (earthquake.hypocenter.magnitude === -1) {
          magu = '-';
      } else {
          magu = `M${earthquake.hypocenter.magnitude}`;
      }

      let hukasa = '';
      if (earthquake.hypocenter.depth === -1) {
          hukasa = '-';
      } else {
          hukasa = `約${earthquake.hypocenter.depth}km`;
      }

      earthquakeInfoDiv.innerHTML = `
          <h2>【${type}】</h2>
          <h2>■発生時刻<br>${day_}日${hours_}時${minutes_}分 (約${timeo})</h2>
          <h2>■震源地<br>${singen}</h2>
          <h2>■規模<br>${magu}</h2>
          <h2>■深さ<br>${hukasa}</h2>
          <h2>■最大震度<br>${shindo}</h2>
          <h2>■津波有無<br>${tsunamiInfo}</h2>
      `;

  } else {
      earthquakeInfoDiv.innerHTML = 'Error';
  }
}

setInterval(display_Earthquake_Info, 5000)