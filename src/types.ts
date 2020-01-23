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
export type Message = {
    //	Unique message identifier inside this chat
    message_id: number;
    // Optional. Sender, empty for messages sent to channels
    from?: User;
    // Conversation the message belongs to
    chat: Chat;
    // Date the message was sent in Unix time
    date: number;

    // Optional. For text messages,
    // the actual UTF-8 text of the message, 0-4096 characters.
    text?: string;
    // Optional. Date the message was last edited in Unix time
    edit_date?: number;

    // Optional. For text messages, special entities like
    // usernames, URLs, bot commands, etc. that appear in the text
    entities: Array<MessageEntity>;

    // Optional. Message is a photo, available sizes of the photo
    photo?: Array<PhotoSize>;
    reply_markup?: InlineKeyboardMarkup;
};

export type User = {
    // Unique identifier for this user or bot
    id: number;
    // True, if this user is a bot
    is_bot: boolean;
    // User‘s or bot’s first name
    first_name: string;
    // Optional. User‘s or bot’s last name
    last_name?: string;
    // Optional. User‘s or bot’s username
    username?: String;
    // Optional. IETF language tag of the user's language
    language_code?: String;
};

export type Chat = {
    // Unique identifier for this chat
    id: number;
    // Type of chat, can be either “private”, “group”, “supergroup”
    // or “channel”
    type: string;
    // Optional. Username, for private chats, supergroups
    // and channels if available
    username?: string;
    // Optional. First name of the other party in a private chat
    first_name?: string;
    // Optional. Last name of the other party in a private chat
    last_name?: string;
};

export type MessageEntity = {
    // Type of the entity.
    type: string;
    // Offset in UTF-16 code units to the start of the entity
    offset: number;
    // Length of the entity in UTF-16 code units
    length: number;
    // Optional. For “text_link” only, url that
    // will be opened after user taps on the text
    url?: string;
    // Optional. For “text_mention” only, the mentioned user
    user?: User;
};
export type PhotoSize = {
    // Identifier for this file, which can be used to download or reuse the file
    file_id: string;
    // Unique identifier for this file, which is supposed to be the same over time
    // and for different bots. Can't be used to download or reuse the file.
    file_unique_id: string;
    // Photo width
    width: number;
    // Photo height
    height: number;
    // Optional. File size
    file_size: number;
};

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
    parse_mode?: string;
    reply_markup?: InlineKeyboardMarkup;
};

export type editCaptionOpt = {
    // New caption of the message
    caption: string;
    parse_mode?: string;
    reply_markup?: InlineKeyboardMarkup;
};

export interface API {
    sendText(chatId: ChatId, text: string, opt?: SendTextOpt): Promise<Message>;
    editText(chatId: ChatId, msgId: number, opt?: editTextOpt): Promise<Message>;
    deleteText(chatId: ChatId, msgId: number): Promise<boolean>;

    sendPhoto(chatId: ChatId, photo: PathLike, opt?: sendPhotoOpt): Promise<Message>;
    editMessageCaption(chatId: ChatId, msgId: number, opt?: editCaptionOpt): Promise<Message>;

    answerCallbackQuery(id: string, text: string, showAlert: false): Promise<boolean>;
}
