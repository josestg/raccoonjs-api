import { format } from "util";
import { request } from "https";
import { createServer, IncomingMessage, ServerResponse } from "http";
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

import * as rp from "request-promise";
import { PathLike, createReadStream } from "fs";

// Global vars
const WEBHOOK_URL = "https://api.telegram.org/bot%s/setWebhook?url=%s";
const METHOD_URL = "https://api.telegram.org/bot%s/%s";

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
        const body = { text, chat_id: chatId, ...opt };
        return this.makeRequest<Message>("sendMessage", body);
    }

    editText(chatId: ChatId, msgId: number, opt?: editTextOpt): Promise<Message> {
        const body = { chat_id: chatId, message_id: msgId, ...opt };
        return this.makeRequest<Message>("editMessageText", body);
    }

    deleteText(chatId: ChatId, msgId: number): Promise<boolean> {
        const body = { chat_id: chatId, message_id: msgId };
        return this.makeRequest<boolean>("deleteMessage", body);
    }

    sendPhoto(chatId: ChatId, photo: PathLike, opt?: sendPhotoOpt): Promise<Message> {
        const formData = {
            chat_id: chatId,
            photo: createReadStream(photo),
            ...opt
        };
        return this.makeRequest<Message>("sendPhoto", formData, true);
    }

    editMessageCaption(chatId: ChatId, msgId: number, opt?: editCaptionOpt): Promise<Message> {
        const body = { chat_id: chatId, message_id: msgId, ...opt };
        return this.makeRequest<Message>("editMessageCaption", body);
    }

    answerCallbackQuery(id: string, text: string, showAlert: boolean = false): Promise<boolean> {
        const body = { callback_query_id: id, show_alert: showAlert, text };
        return this.makeRequest<boolean>("answerCallbackQuery", body);
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

    // Making requests
    // https://api.telegram.org/bot<token>/METHOD_NAME
    private makeRequest<T>(method: string, payload: any, multipart: boolean = false): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const options = {
                json: true,
                uri: format(METHOD_URL, this.token, method)
            };

            if (multipart) {
                options["headers"] = { "content-type": "multipart/form-data" };
                options["formData"] = payload;
            } else {
                options["body"] = payload;
            }

            rp.post(options)
                .then(res => {
                    const result: T = res.result;
                    resolve(result);
                })
                .catch(err => reject(err))
                .finally(() => console.log(method));
        });
    }
}
