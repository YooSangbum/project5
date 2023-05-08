//http://localhost:3000/guide

const btn_send = document.querySelector('#btnSendMessage');
const chatMessage = document.querySelector('.chat_message');
const date = document.querySelector('#date');
const sex = document.querySelector('#sex');
const chatCon = document.querySelector('.chat_con');
const guideChat = document.querySelector('.guide_chat');
const loader = document.querySelector('.loader');
const restart = document.querySelector('.restart');
const chatInputDiv = document.querySelector('.chat-input');

// 임시
chatInputDiv.style.display = 'none';
chatCon.style.display = 'none';
loader.style.display = 'none';
restart.style.display = 'none';
date.focus();

let userMessages = [];
let assistantMessages = [];

const sendMessage = async () => {
  guideChat.style.display = 'none';
  loader.style.display = 'flex';

  let myDate = date.value;
  let mySex = sex.value;

  const chatInput = document.querySelector('.chat-input input');
  const chatMessageDiv = document.createElement('div');
  chatMessageDiv.classList.add('chat_message');

  if (chatInput.value !== '') {
    chatMessageDiv.innerHTML = `<p class='question'>${chatInput.value}</p>`;
  } else {
    chatMessageDiv.innerHTML = `<p hidden> </p>`;
  }
  chatCon.appendChild(chatMessageDiv);

  userMessages.push(chatInput.value);
  chatInput.value = '';

  const response = await fetch(
    'https://dysjqpdxmj.execute-api.ap-northeast-2.amazonaws.com/props/guide',
    // 'http://localhost:3000/guide',
    {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        myDate: myDate,
        mySex: mySex,
        userMessages: userMessages,
        assistantMessages: assistantMessages,
      }),
    }
  );

  const data = await response.json();
  assistantMessages.push(data.assistant);
  const astrologerMessage = document.createElement('div');
  astrologerMessage.classList.add('chat_message');
  astrologerMessage.innerHTML = `<p class=assistant>${data.assistant.replace(
    /\n/g,
    '<br />'
  )}</p>`;
  chatCon.appendChild(astrologerMessage);

  // chatMessage.innerHTML += data.assistant.replace(/\n/g, '<br />');

  chatCon.style.display = 'block';
  chatCon.scrollTop = chatCon.scrollHeight;
  loader.style.display = 'none';
  restart.style.display = 'block';
  chatInputDiv.style.display = 'flex';
};

const reStart = () => {
  window.location.reload();
};

btn_send.addEventListener('click', sendMessage);
document.querySelector('#btn').addEventListener('click', sendMessage);
restart.addEventListener('click', reStart);
