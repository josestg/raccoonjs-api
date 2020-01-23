import { TelegramAPI } from "./TelegramAPI";

const token = process.env.TOKEN;
const host = process.env.BOT_HOST;
const port = Number.parseInt(process.env.BOT_PORT) || 5000;

const bot = new TelegramAPI(token, host);

bot.startWebhook("/webhook", port, () => {
    console.log("Webhook started!");
});
