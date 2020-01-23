import { TelegramAPI } from "./TelegramAPI";

const token = process.env.TOKEN;
const host = process.env.BOT_HOST;
const user = process.env.ADMIN;
const port = Number.parseInt(process.env.BOT_PORT) || 5000;

const bot = new TelegramAPI(token, host);

bot.startWebhook("/webhook", port, () => {
    console.log("Webhook started!");
});

bot.sendText(user, "*Hello, Jose*", {
    parse_mode: "Markdown",
    reply_markup: {
        inline_keyboard: [
            [
                { text: "A", callback_data: "a" },
                { text: "B", callback_data: "B" }
            ],
            [{ text: "C", callback_data: "c" }]
        ]
    }
}).then(ctx => {
    const { chat, message_id } = ctx;
    bot.editText(chat.id, message_id, {
        text: "Updated",
        parse_mode: "Markdown"
    });
});

// bot.sendPhoto(user, "./assets/image.jpg", {
//     caption: "*Raccoon*",
//     parse_mode: "Markdown"
// });
