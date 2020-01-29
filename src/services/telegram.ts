import { format } from "util";
import * as rp from "request-promise";

// Making requests
// https://api.telegram.org/bot<token>/METHOD_NAME
const METHOD_URL = "https://api.telegram.org/bot%s/%s";

type makeRequestParams = {
    method: string;
    payload: any;
    token: string;
    multipart?: boolean;
};

export function makeRequest<T>({ method, payload, token, multipart = false }: makeRequestParams): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const options = {
            json: true,
            uri: format(METHOD_URL, token, method)
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
            .catch(err => reject(err));
    });
}
