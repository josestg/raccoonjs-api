[raccoon-api](../README.md) › [Globals](../globals.md) › ["services/telegram"](_services_telegram_.md)

# External module: "services/telegram"

## Index

### Type aliases

* [makeRequestParams](_services_telegram_.md#makerequestparams)

### Variables

* [METHOD_URL](_services_telegram_.md#const-method_url)

### Functions

* [makeRequest](_services_telegram_.md#makerequest)

## Type aliases

### <a id="makerequestparams" name="makerequestparams"></a>  makeRequestParams

Ƭ **makeRequestParams**: *object*

*Defined in [services/telegram.ts:8](https://github.com/josestg/raccoon-api/blob/e6f776f/src/services/telegram.ts#L8)*

#### Type declaration:

* **method**: *string*

* **multipart**? : *boolean*

* **payload**: *any*

* **token**: *string*

## Variables

### <a id="const-method_url" name="const-method_url"></a> `Const` METHOD_URL

• **METHOD_URL**: *"https://api.telegram.org/bot%s/%s"* = "https://api.telegram.org/bot%s/%s"

*Defined in [services/telegram.ts:6](https://github.com/josestg/raccoon-api/blob/e6f776f/src/services/telegram.ts#L6)*

## Functions

### <a id="makerequest" name="makerequest"></a>  makeRequest

▸ **makeRequest**<**T**>(`__namedParameters`: object): *Promise‹T›*

*Defined in [services/telegram.ts:15](https://github.com/josestg/raccoon-api/blob/e6f776f/src/services/telegram.ts#L15)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`method` | string | - |
`multipart` | boolean | false |
`payload` | any | - |
`token` | string | - |

**Returns:** *Promise‹T›*
