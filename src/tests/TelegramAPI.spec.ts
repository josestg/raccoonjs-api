export const makeRequestMock = jest.fn();
jest.mock("./../services/telegram", () => {
    return { makeRequest: makeRequestMock.mockResolvedValue(true) };
});

jest.mock("fs", () => {
    return {
        createReadStream: jest.fn().mockReturnValue("123")
    };
});

import { TelegramAPI } from "./../TelegramAPI";

const bot = new TelegramAPI("TOKEN", "HOST");

describe("Test TelegramAPI", () => {
    describe("sendText", () => {
        it("should be calls by method: sendMessage", async () => {
            await bot.sendText("id", "text");
            const { method } = makeRequestMock.mock.calls[0][0];
            expect(method).toBe("sendMessage");
        });

        it("should be has chat_id and text property", () => {
            const { payload } = makeRequestMock.mock.calls[0][0];
            expect(payload.chat_id).toBeTruthy();
            expect(payload.text).toBeTruthy();
        });

        it("with options: should be has parse_mode property", async () => {
            await bot.sendText("id", "text", { parse_mode: "Markdown" });

            const { payload } = makeRequestMock.mock.calls[1][0];

            expect(payload.parse_mode).toBeTruthy();
        });
    });

    describe("editText", () => {
        it("should be calls by method: editMessageText", async () => {
            await bot.editText("id", 1);
            const { method } = makeRequestMock.mock.calls[2][0];
            expect(method).toBe("editMessageText");
        });

        it("should be has chat_id and message_id property", () => {
            const { payload } = makeRequestMock.mock.calls[2][0];
            expect(payload.chat_id).toBeTruthy();
            expect(payload.message_id).toBeTruthy();
        });

        it("with options: should be has parse_mode and text property", async () => {
            await bot.editText("id", 1, { parse_mode: "Markdown", text: "a" });

            const { payload } = makeRequestMock.mock.calls[3][0];

            expect(payload.parse_mode).toBeTruthy();
            expect(payload.text).toBeTruthy();
        });
    });

    describe("deleteText", () => {
        it("should be calls by method: deleteMessage", async () => {
            await bot.deleteText("id", 1);
            const { method } = makeRequestMock.mock.calls[4][0];
            expect(method).toBe("deleteMessage");
        });

        it("should be has chat_id and message_id property", () => {
            const { payload } = makeRequestMock.mock.calls[4][0];

            expect(payload.chat_id).toBeTruthy();
            expect(payload.message_id).toBeTruthy();
        });
    });

    describe("sendPhoto", () => {
        it("should be calls by method: sendPhoto", async () => {
            await bot.sendPhoto("id", "a.jpg");
            const { method } = makeRequestMock.mock.calls[5][0];
            expect(method).toBe("sendPhoto");
        });

        it("multipart property shoulbe true", async () => {
            const { multipart } = makeRequestMock.mock.calls[5][0];
            expect(multipart).toBe(true);
        });

        it("should be has chat_id and photo property", () => {
            const { payload } = makeRequestMock.mock.calls[5][0];
            expect(payload.chat_id).toBeTruthy();
            expect(payload.photo).toBeTruthy();
        });

        it("with options: should be has caption property", async () => {
            await bot.sendPhoto("id", "a.jpg", { parse_mode: "Makdown", caption: "a" });

            const { payload } = makeRequestMock.mock.calls[6][0];

            expect(payload.caption).toBeTruthy();
        });
    });

    describe("editMessageCaption", () => {
        it("should be calls by method: editMessageCaption", async () => {
            await bot.editMessageCaption("id", 1);
            const { method } = makeRequestMock.mock.calls[7][0];
            expect(method).toBe("editMessageCaption");
        });

        it("should be has chat_id and message_id property", () => {
            const { payload } = makeRequestMock.mock.calls[7][0];
            expect(payload.chat_id).toBeTruthy();
            expect(payload.message_id).toBeTruthy();
        });

        it("with options: should be has caption property", async () => {
            await bot.editMessageCaption("id", 1, { caption: "a" });

            const { payload } = makeRequestMock.mock.calls[8][0];

            expect(payload.caption).toBeTruthy();
        });
    });

    describe("answerCallbackQuery", () => {
        it("should be calls by method: answerCallbackQuery", async () => {
            await bot.answerCallbackQuery("id", "text");
            const { method } = makeRequestMock.mock.calls[9][0];
            expect(method).toBe("answerCallbackQuery");
        });

        it("should be has callback_query_id and text property", () => {
            const { payload } = makeRequestMock.mock.calls[9][0];
            expect(payload.callback_query_id).toBeTruthy();
            expect(payload.text).toBeTruthy();
            expect(payload.show_alert).toBe(false);
        });

        it("with options: should be has showAlert=true", async () => {
            await bot.answerCallbackQuery("id", "text", true);

            const { payload } = makeRequestMock.mock.calls[10][0];

            expect(payload.show_alert).toBe(true);
        });
    });

    describe("set command", () => {
        it("context.text should be equal fakeContext.text", () => {
            const fakeContext = { text: "b" };
            const res = bot.cmd("a", context => expect(context.text).toBe("b"));
            res.get("/a").call(bot, fakeContext);
        });
    });

    describe("unset command", () => {
        it("remove exist command should be return true", () => {
            expect(bot.delCmd("/a")).toBe(true);
        });
        it("remove not exist command should be return false", () => {
            expect(bot.delCmd("/z")).toBe(false);
        });
    });

    describe("on Event", () => {
        it("set callback_query handler should be return undefined", () => {
            expect(bot.on("callback_query", query => {})).toBeUndefined();
        });
    });
});
