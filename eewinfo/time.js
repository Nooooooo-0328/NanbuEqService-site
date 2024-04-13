function updateCurrentTime() {
  const currentTimeElement = document.getElementById('current-time');
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const currentTime = new Date().toLocaleString('ja-JP', options);
  currentTimeElement.textContent = currentTime;
}

setInterval(updateCurrentTime, 1000);
