const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');

window.addEventListener('load', function() {
  setTimeout(function() {
      addMessage("私は Nanbu Eq Service お問い合わせ 対応 Bot です。気になることを書いてください。※高確率で認識できません。", 'bot');
  }, 1000); 
});

function addMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');

  const senderLabel = document.createElement('div');
  senderLabel.classList.add('sender-label');
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  senderLabel.textContent = `${sender === 'user' ? 'YOU' : 'お問い合わせ 対応 Bot'} - ${hours}時${minutes}分${seconds}秒`;
  messageElement.appendChild(senderLabel);

  const divider = document.createElement('div');
  divider.textContent = '----------';
  messageElement.appendChild(divider);

  const messageText = document.createTextNode(message);
  messageElement.appendChild(messageText);

  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function handleUserInput() {
    const userInputText = userInput.value.trim();
    if (userInputText !== '') {
        addMessage(userInputText, 'user');
        generateBotResponse(userInputText);
        userInput.value = '';
    }
}

function generateBotResponse(userInput) {
  let botResponse;

  const userInputLower = userInput.toLowerCase();

  if (userInputLower.includes('質問')) {
      botResponse = '「質問」として認識しました。Nanbu Eq Service の開発者までお問い合わせください。';

  } else if (userInputLower.includes('機能')) {
      botResponse = '「機能」として認識しました。Nanbu Eq Service の開発者までお問い合わせください。';

  } else if (userInputLower.includes('プログラム')) {
      botResponse = '「プログラム」として認識しました。Nanbu Eq Service の開発者までお問い合わせください。';

  } else {
      botResponse = '申し訳ありません、認識できませんでした。Nanbu Eq Service の開発者までお問い合わせください。';
  }

  setTimeout(() => {
      addMessage(botResponse, 'bot');
  }, 500);
}

userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});
