let apiKey = '';

const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const cors = require('cors');

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

const app = express();

// CORS 이슈 해결
// let corsOptions = {
//   origin: 'localhost:3000/guide',
//   credentials: true,
// };
// app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/guide', async function (req, res) {
  let { myDate, mySex, userMessages, assistantMessages } = req.body;
  let message = [
    { role: 'system', content: '당신은 육아 전문가입니다' },
    { role: 'user', content: '당신은 육아 전문가입니다' },
    {
      role: 'assistant',
      content:
        '안녕하세요!. 저는 육아 전문가이며, 육아에 대한 전문적인 지식과 경험을 가지고 있습니다. 육아는 매우 중요한 일이며, 부모님들이 자녀를 건강하고 행복하게 성장시키는 과정에서 많은 도움을 드릴 수 있도록 최선을 다하겠습니다',
    },
    {
      role: 'user',
      content: `${myDate} ${mySex} 입니다. 발달사항을 알려주세요`,
    },
  ];

  console.log(userMessages, assistantMessages);

  while (userMessages.length != 0 || assistantMessages.length != 0) {
    if (userMessages.length != 0) {
      message.push({
        role: 'user',
        content: String(userMessages.shift().replace(/\n/g, '<br />')),
      });
    }
    if (assistantMessages.length != 0) {
      message.push({
        role: 'assistant',
        content: String(assistantMessages.shift().replace(/\n/g, '<br />')),
      });
    }
  }

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    top_p: 0.8,
    max_tokens: 1500,
    frequency_penalty: 0.4,
    messages: message,
  });

  let guide = completion.data.choices[0].message['content'];
  console.log(guide);
  // res.send(guide);
  res.json({ assistant: guide });
});

app.listen(3000);
