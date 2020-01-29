[raccoon-api](../README.md) › [Globals](../globals.md) › ["types"](_types_.md)

# External module: "types"

## Index

### Interfaces

* [API](../interfaces/_types_.api.md)

### Type aliases

* [CallbackQuery](_types_.md#callbackquery)
* [Chat](_types_.md#chat)
* [ChatId](_types_.md#chatid)
* [CommandHandler](_types_.md#commandhandler)
* [InlineKeyboardButton](_types_.md#inlinekeyboardbutton)
* [InlineKeyboardMarkup](_types_.md#inlinekeyboardmarkup)
* [Message](_types_.md#message)
* [MessageEntity](_types_.md#messageentity)
* [PhotoSize](_types_.md#photosize)
* [QueryHandler](_types_.md#queryhandler)
* [SendTextOpt](_types_.md#sendtextopt)
* [Update](_types_.md#update)
* [User](_types_.md#user)
* [editCaptionOpt](_types_.md#editcaptionopt)
* [editTextOpt](_types_.md#edittextopt)
* [sendPhotoOpt](_types_.md#sendphotoopt)

## Type aliases

### <a id="callbackquery" name="callbackquery"></a>  CallbackQuery

Ƭ **CallbackQuery**: *object*

*Defined in [types.ts:118](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L118)*

This object represents an incoming callback query from a callback button in an inline keyboard. If the button that originated the query was attached to a message sent by the bot, the field message will be present.

#### Type declaration:

* **chat_instance**: *String*

* **data**? : *string*

* **from**: *[User](_types_.md#user)*

* **id**: *string*

* **message**? : *[Message](_types_.md#message)*

___

### <a id="chat" name="chat"></a>  Chat

Ƭ **Chat**: *object*

*Defined in [types.ts:68](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L68)*

This type represents a Chat.

#### Type declaration:

* **first_name**? : *string*

* **id**: *number*

* **last_name**? : *string*

* **type**: *string*

* **username**? : *string*

___

### <a id="chatid" name="chatid"></a>  ChatId

Ƭ **ChatId**: *number | string*

*Defined in [types.ts:139](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L139)*

This type represents a unique identifier for the target chat

___

### <a id="commandhandler" name="commandhandler"></a>  CommandHandler

Ƭ **CommandHandler**: *function*

*Defined in [types.ts:214](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L214)*

This type represents the CommandHandler

#### Type declaration:

▸ (`ctx`: [Message](_types_.md#message)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [Message](_types_.md#message) |

___

### <a id="inlinekeyboardbutton" name="inlinekeyboardbutton"></a>  InlineKeyboardButton

Ƭ **InlineKeyboardButton**: *object*

*Defined in [types.ts:168](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L168)*

This object represents one button of an inline keyboard. You must use exactly one of the optional fields.

#### Type declaration:

* **callback_data**? : *string*

* **text**: *string*

___

### <a id="inlinekeyboardmarkup" name="inlinekeyboardmarkup"></a>  InlineKeyboardMarkup

Ƭ **InlineKeyboardMarkup**: *object*

*Defined in [types.ts:158](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L158)*

This object represents an inline keyboard that appears right next to the message it belongs to.

#### Type declaration:

* **inline_keyboard**: *Array‹Array‹[InlineKeyboardButton](_types_.md#inlinekeyboardbutton)››*

___

### <a id="message" name="message"></a>  Message

Ƭ **Message**: *object*

*Defined in [types.ts:18](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L18)*

This object represents a message.

#### Type declaration:

* **chat**: *[Chat](_types_.md#chat)*

* **date**: *number*

* **edit_date**? : *number*

* **entities**: *Array‹[MessageEntity](_types_.md#messageentity)›*

* **from**? : *[User](_types_.md#user)*

* **message_id**: *number*

* **photo**? : *Array‹[PhotoSize](_types_.md#photosize)›*

* **reply_markup**? : *[InlineKeyboardMarkup](_types_.md#inlinekeyboardmarkup)*

* **text**? : *string*

___

### <a id="messageentity" name="messageentity"></a>  MessageEntity

Ƭ **MessageEntity**: *object*

*Defined in [types.ts:84](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L84)*

This object represents one special entity in a text message. For example, hashtags, usernames, URLs, etc.

#### Type declaration:

* **length**: *number*

* **offset**: *number*

* **type**: *string*

* **url**? : *string*

* **user**? : *[User](_types_.md#user)*

___

### <a id="photosize" name="photosize"></a>  PhotoSize

Ƭ **PhotoSize**: *object*

*Defined in [types.ts:100](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L100)*

This object represents one size of a photo or a file / sticker thumbnail.

#### Type declaration:

* **file_id**: *string*

* **file_size**: *number*

* **file_unique_id**: *string*

* **height**: *number*

* **width**: *number*

___

### <a id="queryhandler" name="queryhandler"></a>  QueryHandler

Ƭ **QueryHandler**: *function*

*Defined in [types.ts:219](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L219)*

This type represents the QueryHandler

#### Type declaration:

▸ (`query`: [CallbackQuery](_types_.md#callbackquery)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`query` | [CallbackQuery](_types_.md#callbackquery) |

___

### <a id="sendtextopt" name="sendtextopt"></a>  SendTextOpt

Ƭ **SendTextOpt**: *object*

*Defined in [types.ts:144](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L144)*

This type represents the optional parameters of SendText method

#### Type declaration:

* **parse_mode**? : *"HTML" | "Markdown"*

* **reply_markup**? : *[InlineKeyboardMarkup](_types_.md#inlinekeyboardmarkup)*

___

### <a id="update" name="update"></a>  Update

Ƭ **Update**: *object*

*Defined in [types.ts:6](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L6)*

This type represents an incoming update.

#### Type declaration:

* **callback_query**? : *[CallbackQuery](_types_.md#callbackquery)*

* **edited_message**? : *[Message](_types_.md#message)*

* **message**? : *[Message](_types_.md#message)*

* **update_id**: *number*

___

### <a id="user" name="user"></a>  User

Ƭ **User**: *object*

*Defined in [types.ts:50](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L50)*

This type represents a User.

#### Type declaration:

* **first_name**: *string*

* **id**: *number*

* **is_bot**: *boolean*

* **language_code**? : *string*

* **last_name**? : *string*

* **username**? : *string*

___

### <a id="editcaptionopt" name="editcaptionopt"></a>  editCaptionOpt

Ƭ **editCaptionOpt**: *object*

*Defined in [types.ts:202](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L202)*

This type represents the optional parameters of editCaption method

#### Type declaration:

* **caption**: *string*

* **parse_mode**? : *string*

* **reply_markup**? : *[InlineKeyboardMarkup](_types_.md#inlinekeyboardmarkup)*

___

### <a id="edittextopt" name="edittextopt"></a>  editTextOpt

Ƭ **editTextOpt**: *object*

*Defined in [types.ts:190](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L190)*

This type represents the optional parameters of editText method

#### Type declaration:

* **parse_mode**? : *string*

* **reply_markup**? : *[InlineKeyboardMarkup](_types_.md#inlinekeyboardmarkup)*

* **text**: *string*

___

### <a id="sendphotoopt" name="sendphotoopt"></a>  sendPhotoOpt

Ƭ **sendPhotoOpt**: *object*

*Defined in [types.ts:178](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L178)*

This type represents the optional parameters of sendPhoto method

#### Type declaration:

* **caption**? : *string*

* **disable_notification**? : *boolean*

* **parse_mode**? : *string*
