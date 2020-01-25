// MOCK
export const postMock = jest.fn();
jest.mock("request-promise", () => {
    return { post: postMock.mockResolvedValue({ result: true }) };
});

import { makeRequest } from "../../services/telegram";

describe("Test makeRequest function", () => {
    const opt = { method: "METHOD", payload: { id: 1 }, token: "TOKEN" };

    it("should be resolve true", async () => {
        const r = await makeRequest<boolean>(opt);

        expect(postMock).toHaveBeenCalled();
        expect(r).toBe(true);
    });

    it("should be calls by args json, uri, and body", () => {
        const { json, uri, body } = postMock.mock.calls[0][0];

        expect(json).toBe(true);
        expect(body).toBeDefined();
        expect(uri).toBe("https://api.telegram.org/botTOKEN/METHOD");
    });

    it("shoud be call by args headers and formData", async () => {
        await makeRequest<boolean>({ ...opt, multipart: true });
        const { headers, formData } = postMock.mock.calls[1][0];

        expect(headers).toBeDefined();
        expect(formData).toBeDefined();
    });

    it("should be rejected", async () => {
        postMock.mockRejectedValueOnce("x");

        try {
            await makeRequest(opt);
        } catch (error) {
            expect(error).toBe("x");
        }
    });
});
