document.getElementById("chatbot-btn").addEventListener("click", function(event){
  // ChatBOTが表示される画面へのリンクを追加する
  window.location.href = "ChatBOT/index.html"; // chatbot.html は実際のリンク先に合わせて変更してください
});

window.addEventListener('resize', function() {
  adjustFooterFontSize();
});

window.addEventListener('DOMContentLoaded', function() {
  adjustFooterFontSize();
});

function adjustFooterFontSize() {
  var screenWidth = window.innerWidth;
  var footerText = document.getElementById('footer-text');
  if (screenWidth <= 600) {
      footerText.style.fontSize = '0.8em';
  } else {
      footerText.style.fontSize = '1em';
  }
}
