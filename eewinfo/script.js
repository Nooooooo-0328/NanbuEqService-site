const apiUrl = 'https://api.p2pquake.net/v2/history?codes=551&limit=1';

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
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
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
            return "不明";
        case 10:
            return "震度1";
        case 20:
            return "震度2";
        case 30:
            return "震度3";
        case 40:
            return "震度4";
        case 45:
            return "震度5弱";
        case 50:
            return "震度5強";
        case 55:
            return "震度6弱";
        case 60:
            return "震度6強";
        case 70:
            return "震度7";
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
      return "震源 ・ 震度に関する情報"
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

      var date = new Date(issue.time);

      var day = ('0' + date.getDate()).slice(-2);

      var hours = ('0' + date.getHours()).slice(-2);

      var minutes = ('0' + date.getMinutes()).slice(-2);

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
          <h2>${type}</h2>
          <h2>■発生時刻<br>${day}日${hours}時${minutes}分</h2>
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

display_Earthquake_Info()