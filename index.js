const express = require('express');
const mineflayer = require('mineflayer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot is active 24/7'));
app.listen(PORT, '0.0.0.0', () => console.log(`Server online on port ${PORT}`));

function startBot() {
  console.log('جاري محاولة الدخول للسيرفر...');

  const bot = mineflayer.createBot({
    host: 'sl10c-6c10.aternos.me',
    port: 49089,
    username: 'AFK_Cloud',
    version: '1.21.1',
    checkTimeoutInterval: 60000
  });

  bot.on('login', () => console.log('✅ البوت سجل دخوله!'));
  bot.on('spawn', () => {
    console.log('✅ البوت متواجد الآن داخل العالم!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 400);
    }, 25000);
  });

  bot.on('kicked', (r) => console.log('❌ تم طرد البوت:', r));
  bot.on('error', (e) => console.log('⚠️ خطأ:', e.message));
  bot.on('end', () => {
    console.log('🔁 انقطع الاتصال، إعادة المحاولة خلال 10 ثوانٍ...');
    setTimeout(startBot, 10000);
  });
}

setTimeout(startBot, 4000);

process.on('uncaughtException', (err) => {
  console.log('خطأ غير متوقع:', err.message);
});
