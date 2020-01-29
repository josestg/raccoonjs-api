[raccoon-api](../README.md) › [Globals](../globals.md) › ["Markup"](_markup_.md)

# External module: "Markup"

## Index

### Classes

* [Gird](../classes/_markup_.gird.md)

### Functions

* [bold](_markup_.md#const-bold)
* [btn](_markup_.md#const-btn)
* [italic](_markup_.md#const-italic)
* [link](_markup_.md#const-link)

## Functions

### <a id="const-bold" name="const-bold"></a> `Const` bold

▸ **bold**(`text`: string): *string*

*Defined in [Markup.ts:8](https://github.com/josestg/raccoon-api/blob/e6f776f/src/Markup.ts#L8)*

Use this function to create bold text

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`text` | string | target text  |

**Returns:** *string*

___

### <a id="const-btn" name="const-btn"></a> `Const` btn

▸ **btn**(`label`: string, `value`: string): *object*

*Defined in [Markup.ts:31](https://github.com/josestg/raccoon-api/blob/e6f776f/src/Markup.ts#L31)*

Use this function to create a InlineKeyboardButton

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`label` | string | The label |
`value` | string | The callback_data value  |

**Returns:** *object*

* **callback_data**: *string* = value

* **text**: *string* = label

___

### <a id="const-italic" name="const-italic"></a> `Const` italic

▸ **italic**(`text`: string): *string*

*Defined in [Markup.ts:15](https://github.com/josestg/raccoon-api/blob/e6f776f/src/Markup.ts#L15)*

Use this function to create italic text

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`text` | string | target text  |

**Returns:** *string*

___

### <a id="const-link" name="const-link"></a> `Const` link

▸ **link**(`label`: string, `uri`: string): *string*

*Defined in [Markup.ts:23](https://github.com/josestg/raccoon-api/blob/e6f776f/src/Markup.ts#L23)*

Use this function to create a link

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`label` | string | The label |
`uri` | string | The target url  |

**Returns:** *string*
