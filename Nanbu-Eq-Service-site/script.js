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
