import { PathLike } from "fs";

// This type represents an incoming update.
export type Update = {
    // The update‘s unique identifier.
    update_id: number;
    // Optional. New incoming message of any kind — text, photo, sticker, etc.
    message?: Message;
    // Optional. New version of a message that is known to the bot and was edited
    edited_message?: Message;
    // Optional. New incoming callback query
    callback_query?: CallbackQuery;
};

// This object represents a message.
export type Message = {};

export type CallbackQuery = {};

// This type represents a unique identifier for
// the target chat
export type ChatId = number | string;

export type SendTextOpt = {
    parse_mode?: "HTML" | "Markdown";
    reply_markup?: InlineKeyboardMarkup;
};

// This object represents an inline keyboard that appears
// right next to the message it belongs to.
export type InlineKeyboardMarkup = {
    inline_keyboard: Array<Array<InlineKeyboardButton>>;
};

// This object represents one button of an inline keyboard.
// You must use exactly one of the optional fields.
export type InlineKeyboardButton = {
    // Label text on the button
    text: string;
    // Optional. Data to be sent in a callback query
    // to the bot when button is pressed, 1-64 bytes
    callback_data?: string;
};

export type sendPhotoOpt = {
    // Optional	Photo caption (may also be used
    // when resending photos by file_id), 0-1024 characters
    caption?: string;
    // Optional. Send Markdown or HTML, if you want Telegram
    // apps to show bold, italic, fixed-width text or inline URLs in the media caption.
    parse_mode?: string;
    // Optional	Sends the message silently. Users will
    // receive a notification with no sound.
    disable_notification?: boolean;
};

export type editTextOpt = {
    // New text of the message
    text: string;
    parse_mode: string;
    reply_markup: InlineKeyboardMarkup;
};

export type editCaptionOpt = {
    // New caption of the message
    caption: string;
    parse_mode: string;
    reply_markup: InlineKeyboardMarkup;
};

export interface API {
    sendText(chatId: ChatId, text: string, opt?: SendTextOpt): Promise<Message>;
    editText(chatId: ChatId, msgId: number, opt?: editTextOpt): Promise<Message>;
    deleteText(chatId: ChatId, msgId: number): Promise<boolean>;

    sendPhoto(chatId: ChatId, photo: PathLike, opt?: sendPhotoOpt): Promise<Message>;
    editMessageCaption(chatId: ChatId, msgId: number, opt?: editCaptionOpt): Promise<Message>;

    answerCallbackQuery(id: string, text: string, showAlert: false): Promise<boolean>;
}
