import { format } from "util";
import { request } from "https";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { Update, ChatId, API, SendTextOpt, editCaptionOpt, editTextOpt, Message, sendPhotoOpt } from "./types";

import * as rp from "request-promise";
import { PathLike } from "fs";

// Global vars
const WEBHOOK_URL = "https://api.telegram.org/bot%s/setWebhook?url=%s";
const METHOD_URL = "https://api.telegram.org/bot%s/%s";

export class TelegramAPI implements API {
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
        throw new Error("Method not implemented.");
    }

    deleteText(chatId: ChatId, msgId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    sendPhoto(chatId: ChatId, photo: PathLike, opt?: sendPhotoOpt): Promise<Message> {
        throw new Error("Method not implemented.");
    }

    editMessageCaption(chatId: ChatId, msgId: number, opt?: editCaptionOpt): Promise<Message> {
        throw new Error("Method not implemented.");
    }

    answerCallbackQuery(id: string, text: string, showAlert: false): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    private forwardUpdate(update: Update) {
        console.log(update);
    }

    // Making requests
    // https://api.telegram.org/bot<token>/METHOD_NAME
    private makeRequest<T>(method: string, body: any): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            rp.post({
                body,
                json: true,
                uri: format(METHOD_URL, this.token, method)
            })
                .then(res => {
                    const result: T = res.result;
                    resolve(result);
                })
                .catch(err => reject(err))
                .finally(() => console.log(method));
        });
    }
}
