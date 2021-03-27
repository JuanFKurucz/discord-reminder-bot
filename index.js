try {
  require("dotenv").config();
} catch (e) {}

const Bot = require("./src/Bot");

const init = async () => {
  const bot = new Bot(
    process.env.TOKEN,
    process.env.CHANNEL,
    process.env.TIME,
    process.env.TIMEZONE,
    process.env.MESSAGE
  );
  await bot.start();
};

init();
