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

// This object represents an incoming callback query from a callback button in an inline keyboard.
export type CallbackQuery = {};
