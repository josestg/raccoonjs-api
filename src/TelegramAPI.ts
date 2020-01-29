import { format } from "util";
import { request } from "https";
import { PathLike, createReadStream } from "fs";
import { createServer, IncomingMessage, ServerResponse } from "http";

import { makeRequest } from "./services/telegram";
import {
    Update,
    ChatId,
    API,
    SendTextOpt,
    editCaptionOpt,
    editTextOpt,
    Message,
    sendPhotoOpt,
    CommandHandler,
    QueryHandler
} from "./types";

// Global vars
const WEBHOOK_URL = "https://api.telegram.org/bot%s/setWebhook?url=%s";

export class TelegramAPI implements API {
    private state = new Map<string, CommandHandler>();
    private callbackQueryHandler: QueryHandler = null;

    /**
     * TelegramAPI constructor
     * @param token - Bot token
     * @param host - Public secure url
     */
    constructor(private token: string, private host: string) {}

    /**
     * Use this method to start the webhook server to receive incoming updates from the Telegram server when the user sends a message or request.
     * @param endpoint - Secret path to receive incoming updates
     * @param port - protocol port.
     * @param cb - callback function called when the server is started.
     */
    startWebhook(endpoint: string, port: number, cb: () => void): TelegramAPI {
        // Set the webhhok url
        request(format(WEBHOOK_URL, this.token, `${this.host}${endpoint}`)).end();

        // receive incoming updates via endpoint webhook
        let error = null;
        createServer((req: IncomingMessage, res: ServerResponse) => {
            if (req.url == endpoint) {
                let raw;
                req.on("data", chunk => (raw = chunk.toString()));
                req.on("error", err => (error = err));
                req.on("end", () => {
                    //forward updates to another process
                    const update: Update = JSON.parse(raw);
                    this.forwardUpdate(update);
                });
            }
            res.end();
        }).listen(port, cb);

        if (error != null) console.error(error);
        return this;
    }

    /**
     * Use this method to send text messages. On success, the sent Message is returned.
     *
     * @param chatId - Unique identifier for the target chat or username of the target channel (in the format ```@channelusername```)
     * @param text - Text of the message to be sent
     * @param opt - Optional parameter. [See](https://core.telegram.org/bots/api#sendmessage)
     *
     */
    sendText(chatId: ChatId, text: string, opt?: SendTextOpt): Promise<Message> {
        return makeRequest<Message>({
            method: "sendMessage",
            payload: { chat_id: chatId, text, ...opt },
            token: this.token
        });
    }

    /**
     * Use this method to edit text messages. On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
     * @param chatId - Unique identifier for the target chat or username of the target channel (in the format ```@channelusername```)
     * @param msgId - Identifier of the message to edit.
     * @param opt - Optional parameter. [See](https://core.telegram.org/bots/api#editmessagetext)
     */
    editText(chatId: ChatId, msgId: number, opt?: editTextOpt): Promise<Message> {
        return makeRequest<Message>({
            method: "editMessageText",
            token: this.token,
            payload: {
                chat_id: chatId,
                message_id: msgId,
                ...opt
            }
        });
    }

    /**
     * Use this method to delete a message, including service messages, with the following limitations:
     * - A message can only be deleted if it was sent less than 48 hours ago.
     * - Bots can delete outgoing messages in private chats, groups, and supergroups.
     * - Bots can delete incoming messages in private chats.
     * - Bots granted can_post_messages permissions can delete outgoing messages in channels.
     * - If the bot is an administrator of a group, it can delete any message there.
     * - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
     * Returns True on success.
     *
     * @param chatId - Unique identifier for the target chat or username of the target channel (in the format ```@channelusername```)
     * @param msgId - Identifier of the message to delete.
     */
    deleteText(chatId: ChatId, msgId: number): Promise<boolean> {
        return makeRequest<boolean>({
            method: "deleteMessage",
            token: this.token,
            payload: {
                chat_id: chatId,
                message_id: msgId
            }
        });
    }

    /**
     * Use this method to send photos. On success, the sent Message is returned.
     *
     * @param chatId - Unique identifier for the target chat or username of the target channel (in the format ```@channelusername```)
     * @param photo - Path photo to send.
     * @param opt - Optional parameter. [See](https://core.telegram.org/bots/api#sendphoto)
     */
    sendPhoto(chatId: ChatId, photo: PathLike, opt?: sendPhotoOpt): Promise<Message> {
        return makeRequest<Message>({
            method: "sendPhoto",
            token: this.token,
            multipart: true,
            payload: {
                chat_id: chatId,
                photo: createReadStream(photo),
                ...opt
            }
        });
    }

    /**
     * Use this method to edit captions of messages. On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
     *
     * @param chatId - Unique identifier for the target chat or username of the target channel (in the format ```@channelusername```).
     * @param msgId - Identifier of the message to edit.
     * @param opt - Optional parameter. [See](https://core.telegram.org/bots/api#editmessagecaption).
     */
    editMessageCaption(chatId: ChatId, msgId: number, opt?: editCaptionOpt): Promise<Message> {
        return makeRequest<Message>({
            method: "editMessageCaption",
            token: this.token,
            payload: {
                chat_id: chatId,
                message_id: msgId,
                ...opt
            }
        });
    }

    /**
     * Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.
     *
     * @param id - Unique identifier for the query to be answered.
     * @param text - Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters.
     * @param showAlert - Default: false. If true, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to false.
     */
    answerCallbackQuery(id: string, text: string, showAlert: boolean = false): Promise<boolean> {
        return makeRequest<boolean>({
            method: "answerCallbackQuery",
            token: this.token,
            payload: {
                text,
                callback_query_id: id,
                show_alert: showAlert
            }
        });
    }

    /**
     * Use this method register the command message.
     *
     * @param name - Command name (without "/" charater).
     * @param handler - Command hanlder (executed when a message sent by a user matches the command message that is registered).
     */
    cmd(name: string, handler: CommandHandler): Map<string, CommandHandler> {
        return this.state.set(`/${name}`, handler);
    }

    /**
     * Use this method to unregister the command message.
     * @param name - Command name (include "/" charater, e.q: "/command-name").
     */
    delCmd(name: string): boolean {
        return this.state.delete(name);
    }

    /**
     * Use this method to set a handler for specific events.
     *
     * @param event - Event name, e.q: "callback_query".
     * @param handler - Query handler.
     */
    on(event: "callback_query", handler: QueryHandler) {
        if (event == "callback_query") {
            this.callbackQueryHandler = handler;
        }
    }

    /**
     * Receive updates from the webhook and proceed to the corresponding handler.
     *
     * @param update - Update from Telegram server.
     */
    private forwardUpdate(update: Update) {
        if (update.message && update.message.text) {
            const { text } = update.message;
            if (this.state.has(text)) {
                const handler = this.state.get(text);
                handler.call(this, update.message);
            }
        } else if (update.callback_query) {
            if (this.callbackQueryHandler == null) throw new Error("Callback Query Handler no implements!");
            this.callbackQueryHandler.call(this, update.callback_query);
        }
    }
}
