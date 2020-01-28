<h1 align="center">Raccoon API</h1>

<div align="center">
    A simple nodejs module to interact with Telegram Bot API.
</div>

## Install

```bash
$ yarn add raccoon-api
```

or

```bash
$ npm i raccoon-api
```

## Tutorial

In this tutorial we will first use `localhost` as a server to develop the Telegram bot, but at the end of this tutorial we will try to change `localhost` to [Heroku](https://dashboard.heroku.com/) as a server.

### Exposing `localhost` to the internet


In order for bots to receive incoming updates from the Telegram server, `localhost` needs to be exposed to the internet using [Ngrok](https://ngrok.com/).

```bash
$ ngork http <PORT>
```

In this tutorial we use `PORT = 5000`

### Coding


Here we will make a simple bot that makes the bot can respond back when the user sends **certain commands** to the bot. For example, when a user sends a message like this `"/hello"`, the bot will respond `"Hello, <your_name>"`

```js
// index.js

// import the module
const { TelegramAPI } = require("raccoon-api");

// A unique authentication token see: https://core.telegram.org/bots/api#making-requests
const YOUR_TOKEN = "123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11";

// Ngrok forwarding secure url (prefix with 'https')
const YOUR_HOST = "https://<unique_number>.ngrok.io";
const port = 5000;

// create bot instance
const bot = new TelegramAPI(YOUR_TOKEN, YOUR_HOST);

// start the webhook then the bot can receive incoming updates
// it is recommended to use a secret path in the URL, e.g. YOUR_HOST/<YOUR_TOKEN>. Because no one else knows your bot token.
bot.startWebhook("/secretPath", port, () => {
    console.log("Webhook started!");
});

// define a command message
bot.cmd("hello", ctx => {
    const { chat } = ctx;
    bot.sendText(chat.id, `Hello ${chat.first_name}`);
});
```

It's time to try

```bash
$ node index.js
```

to see the results, try sending the "**/hello**" message to the bot and see the magic!
