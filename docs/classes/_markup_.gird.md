[raccoon-api](../README.md) › [Globals](../globals.md) › ["Markup"](../modules/_markup_.md) › [Gird](_markup_.gird.md)

# Class: Gird

## Hierarchy

* **Gird**

## Index

### Constructors

* [constructor](_markup_.gird.md#constructor)

### Properties

* [M](_markup_.gird.md#private-m)
* [col](_markup_.gird.md#private-col)
* [row](_markup_.gird.md#private-row)

### Accessors

* [value](_markup_.gird.md#value)

### Methods

* [push](_markup_.gird.md#push)
* [put](_markup_.gird.md#put)

## Constructors

### <a id="constructor" name="constructor"></a>  constructor

\+ **new Gird**(`row`: number, `col`: number): *[Gird](_markup_.gird.md)*

*Defined in [Markup.ts:39](https://github.com/josestg/raccoon-api/blob/e6f776f/src/Markup.ts#L39)*

Grid constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`row` | number | Number of rows |
`col` | number | Number of columns  |

**Returns:** *[Gird](_markup_.gird.md)*

## Properties

### <a id="private-m" name="private-m"></a> `Private` M

• **M**: *Array‹Array‹[InlineKeyboardButton](../modules/_types_.md#inlinekeyboardbutton)››* = null

*Defined in [Markup.ts:39](https://github.com/josestg/raccoon-api/blob/e6f776f/src/Markup.ts#L39)*

This class is used to arrange the keyboard like a matrix.

___

### <a id="private-col" name="private-col"></a> `Private` col

• **col**: *number*

*Defined in [Markup.ts:47](https://github.com/josestg/raccoon-api/blob/e6f776f/src/Markup.ts#L47)*

Number of columns

___

### <a id="private-row" name="private-row"></a> `Private` row

• **row**: *number*

*Defined in [Markup.ts:47](https://github.com/josestg/raccoon-api/blob/e6f776f/src/Markup.ts#L47)*

Number of rows

## Accessors

### <a id="value" name="value"></a>  value

• **get value**(): *[InlineKeyboardMarkup](../modules/_types_.md#inlinekeyboardmarkup)*

*Defined in [Markup.ts:86](https://github.com/josestg/raccoon-api/blob/e6f776f/src/Markup.ts#L86)*

Use this method to get the value of Grid

**Returns:** *[InlineKeyboardMarkup](../modules/_types_.md#inlinekeyboardmarkup)*

## Methods

### <a id="push" name="push"></a>  push

▸ **push**(`btn`: Array‹[InlineKeyboardButton](../modules/_types_.md#inlinekeyboardbutton)›): *[Gird](_markup_.gird.md)*

*Defined in [Markup.ts:78](https://github.com/josestg/raccoon-api/blob/e6f776f/src/Markup.ts#L78)*

Use this method to push a InlineKeyboardButton to the Grid.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`btn` | Array‹[InlineKeyboardButton](../modules/_types_.md#inlinekeyboardbutton)› | The InlineKeyboardButton  |

**Returns:** *[Gird](_markup_.gird.md)*

___

### <a id="put" name="put"></a>  put

▸ **put**(`i`: number, `j`: number, `btn`: [InlineKeyboardButton](../modules/_types_.md#inlinekeyboardbutton)): *[Gird](_markup_.gird.md)*

*Defined in [Markup.ts:64](https://github.com/josestg/raccoon-api/blob/e6f776f/src/Markup.ts#L64)*

Use this method to put a InlineKeyboardButton to i,j position in the Grid

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`i` | number | Row index |
`j` | number | Column index |
`btn` | [InlineKeyboardButton](../modules/_types_.md#inlinekeyboardbutton) | The InlineKeyboardButton  |

**Returns:** *[Gird](_markup_.gird.md)*
