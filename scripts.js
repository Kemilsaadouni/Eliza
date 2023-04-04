const chatBox = document.querySelector('.chat-box');
const inputField = chatBox.querySelector('input[type="text"]');
const button = chatBox.querySelector('button');
const chatBoxBody = chatBox.querySelector('.chat-box-body');
const loading = document.querySelector('.loading')

//Create sendMessage Function
button.addEventListener('click', sendMessage);
inputField.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = inputField.value;
    inputField.value = '';
    chatBoxBody.innerHTML += `<div class="message sent">${message}<div/>`;
    scrollToBottom();
    showLoading();

    fetch('https://patisserie-saadouni.netlify.app:3000/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "prompt": message })
    }).then(response => response.json())
    .then(data => {
      chatBoxBody.innerHTML += `<div class="response">${data.message}</div>`;
        /*
        MOTS CLES
        if (message.toLowerCase().includes('gateau') && message.toLowerCase().includes('marocain') || message.toLowerCase().includes('marocain') || message.toLowerCase().includes('maroc') || message.toLowerCase().includes('zlabia') || message.toLowerCase().includes('msemen') || message.toLowerCase().includes('makrout') || message.toLowerCase().includes('chebakia') || message.toLowerCase().includes('bonjour') || message.toLowerCase().includes('salut') || message.toLowerCase().includes('corne') && message.toLowerCase().includes('gazelle') || message.toLowerCase().includes('baghrir') || message.toLowerCase().includes('sellou') || message.toLowerCase().includes('ghriba') || message.toLowerCase().includes('Choumicha') || message.toLowerCase().includes('briouat') || message.toLowerCase().includes('sfenj') || message.toLowerCase().includes('patisseri') && message.toLowerCase().includes('marocain') || message.toLowerCase().includes('gateau') && message.toLowerCase().includes('amande') || message.toLowerCase().includes('gateau') && message.toLowerCase().includes('maroc') || message.toLowerCase().includes('patisseri') && message.toLowerCase().includes('maroc')) {
            chatBoxBody.innerHTML += `<div class="response">${data.message}</div>`;
          } else {
            chatBoxBody.innerHTML += `<div class="response">Je ne peux pas répondre à votre question, posez-moi une question sur les gateaux marocains</div>`;
          }*/
          hideLoading();
          scrollToBottom();
    })
}

function scrollToBottom() {
    chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
}


var offsetX, offsetY, mouseX, mouseY;

chatBox.addEventListener('mousedown', dragStart);

function dragStart(e) {
  offsetX = e.clientX - chatBox.offsetLeft;
  offsetY = e.clientY - chatBox.offsetTop;

  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);
}

function drag(e) {
  mouseX = e.clientX - offsetX;
  mouseY = e.clientY - offsetY;

  chatBox.style.left = mouseX + 'px';
  chatBox.style.top = mouseY + 'px';
}

function dragEnd() {
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', dragEnd);
}

const icone = document.getElementById('icone');
const backicone =document.getElementById('icone-chatbot')
const close = document.getElementById('cancel')
// Ajoutez un événement de clic à l'icône
icone.addEventListener('click', () => {
  // Affichez le chatbot
  chatBox.style.display = 'block';
  icone.style.display = 'none';
  backicone.style.display = 'none';
});

close.addEventListener('click', () => {
  chatBox.style.display = 'none';
  icone.style.display = 'block';
  backicone.style.display = 'block';
  backicone.style.background = '#000';
  icone.style.textAlign = "center";
})

function showLoading() {
  const loading = document.querySelector('.loading');
  loading.classList.remove('hide');
}

function hideLoading() {
  const loading = document.querySelector('.loading');
  loading.classList.add('hide');
}