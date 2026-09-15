function startBot() {
  console.log('⏳ جاري محاولة الاتصال بالسيرفر...');
  const bot = mineflayer.createBot({
    host: 'sl10c-6c1o.aternos.me', // تأكد من كتابتها بحروف صغيرة
    port: 49089,
    username: 'AFK_Cloud',
    checkTimeoutInterval: 60000,
    version: false
  });

  bot.on('login', () => console.log('✅ البوت سجل دخوله بنجاح!'));
  bot.on('spawn', () => console.log('✅ البوت موجود داخل العالم الآن!'));
  bot.on('kicked', (reason) => console.log('❌ تم طرد البوت لسبب:', reason));
  bot.on('error', (err) => console.log('⚠️ خطأ اتصال:', err.message));
  bot.on('end', () => {
    console.log('🔁 انقطع الاتصال، جاري المحاولة بعد 10 ثوانٍ...');
    setTimeout(startBot, 10000);
  });
}
