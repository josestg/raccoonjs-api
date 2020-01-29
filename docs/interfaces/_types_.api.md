[raccoon-api](../README.md) › [Globals](../globals.md) › ["types"](../modules/_types_.md) › [API](_types_.api.md)

# Interface: API

Available methods

## Hierarchy

* **API**

## Implemented by

* [TelegramAPI](../classes/_telegramapi_.telegramapi.md)

## Index

### Methods

* [answerCallbackQuery](_types_.api.md#answercallbackquery)
* [deleteText](_types_.api.md#deletetext)
* [editMessageCaption](_types_.api.md#editmessagecaption)
* [editText](_types_.api.md#edittext)
* [sendPhoto](_types_.api.md#sendphoto)
* [sendText](_types_.api.md#sendtext)

## Methods

### <a id="answercallbackquery" name="answercallbackquery"></a>  answerCallbackQuery

▸ **answerCallbackQuery**(`id`: string, `text`: string, `showAlert`: boolean): *Promise‹boolean›*

*Defined in [types.ts:232](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L232)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`text` | string |
`showAlert` | boolean |

**Returns:** *Promise‹boolean›*

___

### <a id="deletetext" name="deletetext"></a>  deleteText

▸ **deleteText**(`chatId`: [ChatId](../modules/_types_.md#chatid), `msgId`: number): *Promise‹boolean›*

*Defined in [types.ts:227](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L227)*

**Parameters:**

Name | Type |
------ | ------ |
`chatId` | [ChatId](../modules/_types_.md#chatid) |
`msgId` | number |

**Returns:** *Promise‹boolean›*

___

### <a id="editmessagecaption" name="editmessagecaption"></a>  editMessageCaption

▸ **editMessageCaption**(`chatId`: [ChatId](../modules/_types_.md#chatid), `msgId`: number, `opt?`: [editCaptionOpt](../modules/_types_.md#editcaptionopt)): *Promise‹[Message](../modules/_types_.md#message)›*

*Defined in [types.ts:230](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L230)*

**Parameters:**

Name | Type |
------ | ------ |
`chatId` | [ChatId](../modules/_types_.md#chatid) |
`msgId` | number |
`opt?` | [editCaptionOpt](../modules/_types_.md#editcaptionopt) |

**Returns:** *Promise‹[Message](../modules/_types_.md#message)›*

___

### <a id="edittext" name="edittext"></a>  editText

▸ **editText**(`chatId`: [ChatId](../modules/_types_.md#chatid), `msgId`: number, `opt?`: [editTextOpt](../modules/_types_.md#edittextopt)): *Promise‹[Message](../modules/_types_.md#message)›*

*Defined in [types.ts:226](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L226)*

**Parameters:**

Name | Type |
------ | ------ |
`chatId` | [ChatId](../modules/_types_.md#chatid) |
`msgId` | number |
`opt?` | [editTextOpt](../modules/_types_.md#edittextopt) |

**Returns:** *Promise‹[Message](../modules/_types_.md#message)›*

___

### <a id="sendphoto" name="sendphoto"></a>  sendPhoto

▸ **sendPhoto**(`chatId`: [ChatId](../modules/_types_.md#chatid), `photo`: PathLike, `opt?`: [sendPhotoOpt](../modules/_types_.md#sendphotoopt)): *Promise‹[Message](../modules/_types_.md#message)›*

*Defined in [types.ts:229](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L229)*

**Parameters:**

Name | Type |
------ | ------ |
`chatId` | [ChatId](../modules/_types_.md#chatid) |
`photo` | PathLike |
`opt?` | [sendPhotoOpt](../modules/_types_.md#sendphotoopt) |

**Returns:** *Promise‹[Message](../modules/_types_.md#message)›*

___

### <a id="sendtext" name="sendtext"></a>  sendText

▸ **sendText**(`chatId`: [ChatId](../modules/_types_.md#chatid), `text`: string, `opt?`: [SendTextOpt](../modules/_types_.md#sendtextopt)): *Promise‹[Message](../modules/_types_.md#message)›*

*Defined in [types.ts:225](https://github.com/josestg/raccoon-api/blob/e6f776f/src/types.ts#L225)*

**Parameters:**

Name | Type |
------ | ------ |
`chatId` | [ChatId](../modules/_types_.md#chatid) |
`text` | string |
`opt?` | [SendTextOpt](../modules/_types_.md#sendtextopt) |

**Returns:** *Promise‹[Message](../modules/_types_.md#message)›*
