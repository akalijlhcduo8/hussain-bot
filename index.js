const express = require('express');
const mineflayer = require('mineflayer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('AFK Bot is running 24/7!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Web server listening on port ${PORT}`);
});

function startBot() {
  console.log('جاري محاولة الاتصال بالسيرفر...');

  try {
    const bot = mineflayer.createBot({
      host: 'sl10c-6c1O.aternos.me',
      port: 49089,
      username: 'AFK_Cloud',
      checkTimeoutInterval: 60000,
      version: false
    });

    bot.on('login', () => {
      console.log('✅ تم تسجيل الدخول إلى السيرفر!');
    });

    bot.on('spawn', () => {
      console.log('✅ البوت متواجد الآن داخل العالم!');
      setInterval(() => {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 400);
      }, 30000);
    });

    bot.on('kicked', (reason) => {
      console.log('❌ تم طرد البوت:', reason);
    });

    bot.on('error', (err) => {
      console.log('⚠️ خطأ اتصال:', err.message);
    });

    bot.on('end', () => {
      console.log('🔁 انقطع الاتصال، جاري إعادة المحاولة خلال 10 ثوانٍ...');
      setTimeout(startBot, 10000);
    });
  } catch (err) {
    console.log('⚠️ حدث استثناء أثناء الإنشاء:', err.message);
    setTimeout(startBot, 10000);
  }
}

// تشغيل البوت
startBot();

// حماية السيرفر من الانهيار عند أي خطأ مفاجئ
process.on('uncaughtException', (err) => {
  console.log('⚠️ خطأ غير متوقع تم اعتراضه:', err.message);
});
