const http = require('http');
const mineflayer = require('mineflayer');

// خادم ويب بسيط جداً لا يستهلك موارد ولا ينهار في Render
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running');
}).listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});

function createBot() {
  console.log('Connecting to Minecraft server...');

  const bot = mineflayer.createBot({
    host: 'sl10c-6c10.aternos.me',
    port: 49089,
    username: 'AFK_Worker',
    version: '1.21.1',
    checkTimeoutInterval: 120000
  });

  bot.on('login', () => {
    console.log('==> Bot logged in successfully!');
  });

  bot.on('spawn', () => {
    console.log('==> Bot spawned in world!');
    // القفز كل 30 ثانية لتجنب الطرد
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 400);
    }, 30000);
  });

  bot.on('kicked', (reason) => {
    console.log('Bot was kicked:', reason);
  });

  bot.on('error', (err) => {
    console.log('Bot error:', err.message);
  });

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 15s...');
    setTimeout(createBot, 15000);
  });
}

// تشغيل البوت بعد استقرار خادم الويب
setTimeout(createBot, 5000);
