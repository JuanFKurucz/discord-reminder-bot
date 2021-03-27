const Discord = require("discord.js");

class Bot {
  constructor(token, channelId, time, timeZone, message) {
    this.token = token;
    this.channelId = channelId;
    this.time = time.split(":");
    this.timeZone = timeZone;
    this.message = message;
    this.client = new Discord.Client();
  }

  async start() {
    this.client.login(this.token);
    this.client.on("ready", async () => this.onReady());
  }

  sendReminder = () => {
    const date = new Date(
      new Date(Date.now()).toLocaleString("en-US", {
        timeZone: this.timeZone
      })
    );
    const [hours, minutes] = this.time;
    if (date.getHours() == hours && date.getMinutes() == minutes) {
      const channel = this.client.channels.cache.find(
        channel => channel.id === this.channelId
      );
      channel.send(this.message.replace(/<br>/g, "\n"));
      setTimeout(this.sendReminder, 60000);
    } else {
      setTimeout(this.sendReminder, 1000);
    }
  };

  async onReady() {
    const statusMessage = `Daily Updates at ${this.time.join(":")} - ${
      process.env.ENV == "DEV" ? "Dev" : "Prod"
    }`;
    this.client.user.setActivity(statusMessage, {
      type: "WATCHING"
    });

    setTimeout(this.sendReminder, 1000);
  }
}

module.exports = Bot;
