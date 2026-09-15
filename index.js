const express = require('express');
const mineflayer = require('mineflayer');

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot is active 24/7'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

function startBot() {
  const bot = mineflayer.createBot({
    host: 'sl10c-6c1O.aternos.me',
    port: 49089,
    username: 'AFK_Cloud',
    checkTimeoutInterval: 60000
  });

  bot.on('login', () => console.log('✅ البوت سجل دخوله من السحابة!'));
  bot.on('spawn', () => {
    console.log('✅ البوت داخل العالم الآن!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 400);
    }, 30000);
  });

  bot.on('kicked', (r) => console.log('طرد:', r));
  bot.on('error', (e) => console.log('خطأ:', e.message));
  bot.on('end', () => {
    console.log('انقطع الاتصال، جاري المحاولة بعد 10 ثوانٍ...');
    setTimeout(startBot, 10000);
  });
}

startBot();
