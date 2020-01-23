import { format } from "util";
import { request } from "https";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { Update } from "./types";

import * as rp from "request-promise";

// Global vars
const WEBHOOK_URL = "https://api.telegram.org/bot%s/setWebhook?url=%s";
const METHOD_URL = "https://api.telegram.org/bot%s/%s";

export class TelegramAPI {
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
