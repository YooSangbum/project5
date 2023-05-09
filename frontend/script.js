//http://localhost:3000/guide

const btn_send = document.querySelector('#btnSendMessage');
const chatMessage = document.querySelector('.chat_message');
const date = document.querySelector('#date');
const sex = document.querySelector('#sex');
const chatCon = document.querySelector('.chat_con');
const guideChat = document.querySelector('.guide_chat');
const loader = document.querySelector('.loader');
const floader = document.querySelector('.loader > .fa-spinner');
const mloader = document.querySelector('.loader > .mgrowth');
const wloader = document.querySelector('.loader > .wgrowth');
const lodaderP = document.querySelector('.loader > p');
const restart = document.querySelector('.restart');
const flower = document.querySelector('.flower');

const chatInputDiv = document.querySelector('.chat-input');

// 임시
chatInputDiv.style.display = 'none';
chatCon.style.display = 'none';
loader.style.display = 'none';
mloader.style.display = 'none';
wloader.style.display = 'none';
floader.style.display = 'none';

restart.style.display = 'none';
date.focus();

let userMessages = [];
let assistantMessages = [];

const sendMessage = async () => {
  guideChat.style.display = 'none';
  flower.style.display = 'none';

  if (sex.value.includes('남')) {
    loader.style.display = 'flex';
    mloader.style.display = 'flex';
    wloader.style.display = 'none';
    floader.style.display = 'none';
  }
  if (sex.value.includes('여')) {
    loader.style.display = 'flex';
    mloader.style.display = 'none';
    wloader.style.display = 'flex';
    floader.style.display = 'none';
  } else if (sex.value === '') {
    loader.style.display = 'flex';
    mloader.style.display = 'none';
    wloader.style.display = 'none';
    floader.style.display = 'flex';
  }

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

  const response = await fetch('http://localhost:3000/guide', {
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
  });

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
const sendMessage1 = async () => {
  guideChat.style.display = 'none';
  loader.style.display = 'flex';
  mloader.style.display = 'none';
  wloader.style.display = 'none';
  floader.style.display = 'flex';
  floader.style.color = 'tomato';
  lodaderP.style.display = 'none';

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

  const response = await fetch('http://localhost:3000/guide', {
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
  });

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
document.querySelector('#btn').addEventListener('click', sendMessage1);
restart.addEventListener('click', reStart);
