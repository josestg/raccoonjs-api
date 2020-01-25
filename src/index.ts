import { TelegramAPI } from "./TelegramAPI";
import { Gird, btn } from "./Markup";
import * as M from "./Markup";

const token = process.env.TOKEN;
const host = process.env.BOT_HOST;
const user = process.env.ADMIN;
const port = Number.parseInt(process.env.BOT_PORT) || 5000;

const bot = new TelegramAPI(token, host);

bot.startWebhook("/webhook", port, () => {
    console.log("Webhook started!");
});

// bot.sendText(user, "*Hello, Jose*", {
//     parse_mode: "Markdown",
//     reply_markup: {
//         inline_keyboard: [
//             [
//                 { text: "A", callback_data: "a" },
//                 { text: "B", callback_data: "B" }
//             ],
//             [{ text: "C", callback_data: "c" }]
//         ]
//     }
// }).then(ctx => {
//     const { chat, message_id } = ctx;
//     setTimeout(() => {
//         bot.deleteText(chat.id, message_id);
//     }, 3000);
// });

// bot.sendPhoto(user, "./assets/image.jpg", {
//     caption: "*Raccoon*",
//     parse_mode: "Markdown"
// }).then(ctx => {
//     const { chat, message_id } = ctx;
//     bot.editMessageCaption(chat.id, message_id, { caption: "Updated" });
// });

bot.cmd("hello", ctx => {
    const { chat } = ctx;
    bot.sendText(chat.id, `Hello ${chat.first_name}`);
});

// const grid = new Gird(2, 2);

// grid.put(0, 0, btn("A", "a"))
//     .put(1, 1, btn("C", "c"))
//     .put(0, 1, btn("B", "b"))
//     .put(1, 0, btn("D", "d"))
//     .push([btn("Z", "z")]);

// const button = [
//     [btn("A", "a"), btn("B", "b")],
//     [btn("C", "c"), btn("D", "d")],
//     [btn("E", "e")],
//     [btn("F", "f"), btn("G", "g"), btn("H", "h")]
// ];

// bot.sendText(user, "Button", {
//     parse_mode: "Markdown",
//     reply_markup: {
//         inline_keyboard: button
//     }
// });

// bot.sendText(user, "Grid", {
//     parse_mode: "Markdown",
//     reply_markup: grid.value
// });

bot.sendText(
    user,
    `Bold ${M.bold("Bold")}\nItalic ${M.italic("Italic")}\nLink ${M.link("Ini Link", "https://github.com/josestg")}`,
    { parse_mode: "Markdown" }
);
