[raccoon-api](../README.md) › [Globals](../globals.md) › ["TelegramAPI"](../modules/_telegramapi_.md) › [TelegramAPI](_telegramapi_.telegramapi.md)

# Class: TelegramAPI

## Hierarchy

* **TelegramAPI**

## Implements

* [API](../interfaces/_types_.api.md)

## Index

### Constructors

* [constructor](_telegramapi_.telegramapi.md#constructor)

### Properties

* [callbackQueryHandler](_telegramapi_.telegramapi.md#private-callbackqueryhandler)
* [host](_telegramapi_.telegramapi.md#private-host)
* [state](_telegramapi_.telegramapi.md#private-state)
* [token](_telegramapi_.telegramapi.md#private-token)

### Methods

* [answerCallbackQuery](_telegramapi_.telegramapi.md#answercallbackquery)
* [cmd](_telegramapi_.telegramapi.md#cmd)
* [delCmd](_telegramapi_.telegramapi.md#delcmd)
* [deleteText](_telegramapi_.telegramapi.md#deletetext)
* [editMessageCaption](_telegramapi_.telegramapi.md#editmessagecaption)
* [editText](_telegramapi_.telegramapi.md#edittext)
* [forwardUpdate](_telegramapi_.telegramapi.md#private-forwardupdate)
* [on](_telegramapi_.telegramapi.md#on)
* [sendPhoto](_telegramapi_.telegramapi.md#sendphoto)
* [sendText](_telegramapi_.telegramapi.md#sendtext)
* [startWebhook](_telegramapi_.telegramapi.md#startwebhook)

## Constructors

### <a id="constructor" name="constructor"></a>  constructor

\+ **new TelegramAPI**(`token`: string, `host`: string): *[TelegramAPI](_telegramapi_.telegramapi.md)*

*Defined in [TelegramAPI.ts:25](https://github.com/josestg/raccoon-api/blob/e6f776f/src/TelegramAPI.ts#L25)*

TelegramAPI constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`token` | string | Bot token |
`host` | string | Public secure url  |

**Returns:** *[TelegramAPI](_telegramapi_.telegramapi.md)*

## Properties

### <a id="private-callbackqueryhandler" name="private-callbackqueryhandler"></a> `Private` callbackQueryHandler

• **callbackQueryHandler**: *[QueryHandler](../modules/_types_.md#queryhandler)* = null

*Defined in [TelegramAPI.ts:25](https://github.com/josestg/raccoon-api/blob/e6f776f/src/TelegramAPI.ts#L25)*

___

### <a id="private-host" name="private-host"></a> `Private` host

• **host**: *string*

*Defined in [TelegramAPI.ts:32](https://github.com/josestg/raccoon-api/blob/e6f776f/src/TelegramAPI.ts#L32)*

Public secure url

___

### <a id="private-state" name="private-state"></a> `Private` state

• **state**: *Map‹string, function›* = new Map<string, CommandHandler>()

*Defined in [TelegramAPI.ts:24](https://github.com/josestg/raccoon-api/blob/e6f776f/src/TelegramAPI.ts#L24)*

___

### <a id="private-token" name="private-token"></a> `Private` token

• **token**: *string*

*Defined in [TelegramAPI.ts:32](https://github.com/josestg/raccoon-api/blob/e6f776f/src/TelegramAPI.ts#L32)*

Bot token

## Methods

### <a id="answercallbackquery" name="answercallbackquery"></a>  answerCallbackQuery

▸ **answerCallbackQuery**(`id`: string, `text`: string, `showAlert`: boolean): *Promise‹boolean›*

*Implementation of [API](../interfaces/_types_.api.md)*

*Defined in [TelegramAPI.ts:168](https://github.com/josestg/raccoon-api/blob/e6f776f/src/TelegramAPI.ts#L168)*

Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`id` | string | - | Unique identifier for the query to be answered. |
`text` | string | - | Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters. |
`showAlert` | boolean | false | Default: false. If true, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to false.  |

**Returns:** *Promise‹boolean›*

___

### <a id="cmd" name="cmd"></a>  cmd

▸ **cmd**(`name`: string, `handler`: [CommandHandler](../modules/_types_.md#commandhandler)): *Map‹string, [CommandHandler](../modules/_types_.md#commandhandler)›*

*Defined in [TelegramAPI.ts:186](https://github.com/josestg/raccoon-api/blob/e6f776f/src/TelegramAPI.ts#L186)*

Use this method register the command message.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | Command name (without "/" charater). |
`handler` | [CommandHandler](../modules/_types_.md#commandhandler) | Command hanlder (executed when a message sent by a user matches the command message that is registered).  |

**Returns:** *Map‹string, [CommandHandler](../modules/_types_.md#commandhandler)›*

___

### <a id="delcmd" name="delcmd"></a>  delCmd

▸ **delCmd**(`name`: string): *boolean*

*Defined in [TelegramAPI.ts:194](https://github.com/josestg/raccoon-api/blob/e6f776f/src/TelegramAPI.ts#L194)*

Use this method to unregister the command message.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | Command name (include "/" charater, e.q: "/command-name").  |

**Returns:** *boolean*

___

### <a id="deletetext" name="deletetext"></a>  deleteText

▸ **deleteText**(`chatId`: [ChatId](../modules/_types_.md#chatid), `msgId`: number): *Promise‹boolean›*

*Implementation of [API](../interfaces/_types_.api.md)*

*Defined in [TelegramAPI.ts:111](https://github.com/josestg/raccoon-api/blob/e6f776f/src/TelegramAPI.ts#L111)*

Use this method to delete a message, including service messages, with the following limitations:
- A message can only be deleted if it was sent less than 48 hours ago.
- Bots can delete outgoing messages in private chats, groups, and supergroups.
- Bots can delete incoming messages in private chats.
- Bots granted can_post_messages permissions can delete outgoing messages in channels.
- If the bot is an administrator of a group, it can delete any message there.
- If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
Returns True on success.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`chatId` | [ChatId](../modules/_types_.md#chatid) | Unique identifier for the target chat or username of the target channel (in the format ```@channelusername```) |
`msgId` | number | Identifier of the message to delete.  |

**Returns:** *Promise‹boolean›*

___

### <a id="editmessagecaption" name="editmessagecaption"></a>  editMessageCaption

▸ **editMessageCaption**(`chatId`: [ChatId](../modules/_types_.md#chatid), `msgId`: number, `opt?`: [editCaptionOpt](../modules/_types_.md#editcaptionopt)): *Promise‹[Message](../modules/_types_.md#message)›*

*Implementation of [API](../interfaces/_types_.api.md)*

*Defined in [TelegramAPI.ts:149](https://github.com/josestg/raccoon-api/blob/e6f776f/src/TelegramAPI.ts#L149)*

Use this method to edit captions of messages. On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`chatId` | [ChatId](../modules/_types_.md#chatid) | Unique identifier for the target chat or username of the target channel (in the format ```@channelusername```). |
`msgId` | number | Identifier of the message to edit. |
`opt?` | [editCaptionOpt](../modules/_types_.md#editcaptionopt) | Optional parameter. [See](https://core.telegram.org/bots/api#editmessagecaption).  |

**Returns:** *Promise‹[Message](../modules/_types_.md#message)›*

___

### <a id="edittext" name="edittext"></a>  editText

▸ **editText**(`chatId`: [ChatId](../modules/_types_.md#chatid), `msgId`: number, `opt?`: [editTextOpt](../modules/_types_.md#edittextopt)): *Promise‹[Message](../modules/_types_.md#message)›*

*Implementation of [API](../interfaces/_types_.api.md)*

*Defined in [TelegramAPI.ts:86](https://github.com/josestg/raccoon-api/blob/e6f776f/src/TelegramAPI.ts#L86)*

Use this method to edit text messages. On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`chatId` | [ChatId](../modules/_types_.md#chatid) | Unique identifier for the target chat or username of the target channel (in the format ```@channelusername```) |
`msgId` | number | Identifier of the message to edit. |
`opt?` | [editTextOpt](../modules/_types_.md#edittextopt) | Optional parameter. [See](https://core.telegram.org/bots/api#editmessagetext)  |

**Returns:** *Promise‹[Message](../modules/_types_.md#message)›*

___

### <a id="private-forwardupdate" name="private-forwardupdate"></a> `Private` forwardUpdate

▸ **forwardUpdate**(`update`: [Update](../modules/_types_.md#update)): *void*

*Defined in [TelegramAPI.ts:215](https://github.com/josestg/raccoon-api/blob/e6f776f/src/TelegramAPI.ts#L215)*

Receive updates from the webhook and proceed to the corresponding handler.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`update` | [Update](../modules/_types_.md#update) | Update from Telegram server.  |

**Returns:** *void*

___

### <a id="on" name="on"></a>  on

▸ **on**(`event`: "callback_query", `handler`: [QueryHandler](../modules/_types_.md#queryhandler)): *void*

*Defined in [TelegramAPI.ts:204](https://github.com/josestg/raccoon-api/blob/e6f776f/src/TelegramAPI.ts#L204)*

Use this method to set a handler for specific events.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`event` | "callback_query" | Event name, e.q: "callback_query". |
`handler` | [QueryHandler](../modules/_types_.md#queryhandler) | Query handler.  |

**Returns:** *void*

___

### <a id="sendphoto" name="sendphoto"></a>  sendPhoto

▸ **sendPhoto**(`chatId`: [ChatId](../modules/_types_.md#chatid), `photo`: PathLike, `opt?`: [sendPhotoOpt](../modules/_types_.md#sendphotoopt)): *Promise‹[Message](../modules/_types_.md#message)›*

*Implementation of [API](../interfaces/_types_.api.md)*

*Defined in [TelegramAPI.ts:129](https://github.com/josestg/raccoon-api/blob/e6f776f/src/TelegramAPI.ts#L129)*

Use this method to send photos. On success, the sent Message is returned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`chatId` | [ChatId](../modules/_types_.md#chatid) | Unique identifier for the target chat or username of the target channel (in the format ```@channelusername```) |
`photo` | PathLike | Path photo to send. |
`opt?` | [sendPhotoOpt](../modules/_types_.md#sendphotoopt) | Optional parameter. [See](https://core.telegram.org/bots/api#sendphoto)  |

**Returns:** *Promise‹[Message](../modules/_types_.md#message)›*

___

### <a id="sendtext" name="sendtext"></a>  sendText

▸ **sendText**(`chatId`: [ChatId](../modules/_types_.md#chatid), `text`: string, `opt?`: [SendTextOpt](../modules/_types_.md#sendtextopt)): *Promise‹[Message](../modules/_types_.md#message)›*

*Implementation of [API](../interfaces/_types_.api.md)*

*Defined in [TelegramAPI.ts:72](https://github.com/josestg/raccoon-api/blob/e6f776f/src/TelegramAPI.ts#L72)*

Use this method to send text messages. On success, the sent Message is returned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`chatId` | [ChatId](../modules/_types_.md#chatid) | Unique identifier for the target chat or username of the target channel (in the format ```@channelusername```) |
`text` | string | Text of the message to be sent |
`opt?` | [SendTextOpt](../modules/_types_.md#sendtextopt) | Optional parameter. [See](https://core.telegram.org/bots/api#sendmessage)   |

**Returns:** *Promise‹[Message](../modules/_types_.md#message)›*

___

### <a id="startwebhook" name="startwebhook"></a>  startWebhook

▸ **startWebhook**(`endpoint`: string, `port`: number, `cb`: function): *[TelegramAPI](_telegramapi_.telegramapi.md)*

*Defined in [TelegramAPI.ts:40](https://github.com/josestg/raccoon-api/blob/e6f776f/src/TelegramAPI.ts#L40)*

Use this method to start the webhook server to receive incoming updates from the Telegram server when the user sends a message or request.

**Parameters:**

▪ **endpoint**: *string*

Secret path to receive incoming updates

▪ **port**: *number*

protocol port.

▪ **cb**: *function*

callback function called when the server is started.

▸ (): *void*

**Returns:** *[TelegramAPI](_telegramapi_.telegramapi.md)*
