const express = require('express');
const mineflayer = require('mineflayer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('AFK Bot is running 24/7');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Web server online on port ${PORT}`);
});

function startBot() {
  console.log('جاري الاتصال بالسيرفر...');

  try {
    const bot = mineflayer.createBot({
      host: 'sl10c-6c10.aternos.me',
      port: 49089,
      username: 'AFK_Cloud',
      version: '1.21.1',
      checkTimeoutInterval: 90000
    });

    bot.on('login', () => console.log('✅ البوت سجل دخوله!'));
    bot.on('spawn', () => {
      console.log('✅ البوت داخل العالم الآن!');
      setInterval(() => {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 400);
      }, 30000);
    });

    bot.on('kicked', (r) => console.log('❌ تم الطرد:', r));
    bot.on('error', (e) => console.log('⚠️ خطأ اتصال:', e.message));
    bot.on('end', () => {
      console.log('🔁 انقطع الاتصال، إعادة المحاولة بعد 10 ثوانٍ...');
      setTimeout(startBot, 10000);
    });
  } catch (err) {
    console.log('⚠️ خطأ تشغيل:', err.message);
    setTimeout(startBot, 10000);
  }
}

setTimeout(startBot, 5000);

process.on('uncaughtException', (err) => {
  console.log('⚠️ استثناء عام تم التعامل معه:', err.message);
});
