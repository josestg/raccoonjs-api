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

    constructor(private token: string, private host: string) {}

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

    sendText(chatId: ChatId, text: string, opt?: SendTextOpt): Promise<Message> {
        return makeRequest<Message>({
            method: "sendMessage",
            payload: { chat_id: chatId, text, ...opt },
            token: this.token
        });
    }

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

    cmd(name: string, handler: CommandHandler) {
        this.state.set(`/${name}`, handler);
    }

    delCmd(name: string): boolean {
        return this.state.delete(name);
    }

    on(event: "callback_query", handler: QueryHandler) {
        if (event == "callback_query") {
            this.callbackQueryHandler = handler;
        }
    }

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
