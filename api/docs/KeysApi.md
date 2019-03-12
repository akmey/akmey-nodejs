# Akmey.KeysApi

All URIs are relative to *https://akmey.leonekmi.fr/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**keyFetchPost**](KeysApi.md#keyFetchPost) | **POST** /key/fetch | Fetch the key on Akmey
[**keysAddPost**](KeysApi.md#keysAddPost) | **POST** /keys/add | Add a key
[**keysKeyIdDelete**](KeysApi.md#keysKeyIdDelete) | **DELETE** /keys/{keyId} | Delete key
[**keysKeyIdGet**](KeysApi.md#keysKeyIdGet) | **GET** /keys/{keyId} | Get a key by its ID
[**keysKeyIdPut**](KeysApi.md#keysKeyIdPut) | **PUT** /keys/{keyId} | Edit your key comment


<a name="keyFetchPost"></a>
# **keyFetchPost**
> FullKey keyFetchPost(key)

Fetch the key on Akmey

### Example
```javascript
var Akmey = require('akmey');

var apiInstance = new Akmey.KeysApi();

var key = "key_example"; // String | Content of key (w/o comment) to return

apiInstance.keyFetchPost(key).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **String**| Content of key (w/o comment) to return | 

### Return type

[**FullKey**](FullKey.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="keysAddPost"></a>
# **keysAddPost**
> EditResponse keysAddPost(key)

Add a key

### Example
```javascript
var Akmey = require('akmey');
var defaultClient = Akmey.ApiClient.instance;

// Configure OAuth2 access token for authorization: akmey_auth
var akmey_auth = defaultClient.authentications['akmey_auth'];
akmey_auth.accessToken = 'YOUR ACCESS TOKEN';

// Configure API key authorization: akmey_token
var akmey_token = defaultClient.authentications['akmey_token'];
akmey_token.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//akmey_token.apiKeyPrefix = 'Token';

var apiInstance = new Akmey.KeysApi();

var key = "key_example"; // String | Content of key (w/o comment) to add

apiInstance.keysAddPost(key).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **String**| Content of key (w/o comment) to add | 

### Return type

[**EditResponse**](EditResponse.md)

### Authorization

[akmey_auth](../README.md#akmey_auth), [akmey_token](../README.md#akmey_token)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="keysKeyIdDelete"></a>
# **keysKeyIdDelete**
> DeleteResponse keysKeyIdDelete(keyId)

Delete key

### Example
```javascript
var Akmey = require('akmey');
var defaultClient = Akmey.ApiClient.instance;

// Configure OAuth2 access token for authorization: akmey_auth
var akmey_auth = defaultClient.authentications['akmey_auth'];
akmey_auth.accessToken = 'YOUR ACCESS TOKEN';

// Configure API key authorization: akmey_token
var akmey_token = defaultClient.authentications['akmey_token'];
akmey_token.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//akmey_token.apiKeyPrefix = 'Token';

var apiInstance = new Akmey.KeysApi();

var keyId = "keyId_example"; // String | ID of key to remove

apiInstance.keysKeyIdDelete(keyId).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **keyId** | **String**| ID of key to remove | 

### Return type

[**DeleteResponse**](DeleteResponse.md)

### Authorization

[akmey_auth](../README.md#akmey_auth), [akmey_token](../README.md#akmey_token)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="keysKeyIdGet"></a>
# **keysKeyIdGet**
> FullKey keysKeyIdGet(keyId)

Get a key by its ID

### Example
```javascript
var Akmey = require('akmey');

var apiInstance = new Akmey.KeysApi();

var keyId = "keyId_example"; // String | ID of key to return

apiInstance.keysKeyIdGet(keyId).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **keyId** | **String**| ID of key to return | 

### Return type

[**FullKey**](FullKey.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="keysKeyIdPut"></a>
# **keysKeyIdPut**
> EditResponse keysKeyIdPut(keyId, comment)

Edit your key comment

### Example
```javascript
var Akmey = require('akmey');
var defaultClient = Akmey.ApiClient.instance;

// Configure OAuth2 access token for authorization: akmey_auth
var akmey_auth = defaultClient.authentications['akmey_auth'];
akmey_auth.accessToken = 'YOUR ACCESS TOKEN';

// Configure API key authorization: akmey_token
var akmey_token = defaultClient.authentications['akmey_token'];
akmey_token.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//akmey_token.apiKeyPrefix = 'Token';

var apiInstance = new Akmey.KeysApi();

var keyId = "keyId_example"; // String | ID of key to edit

var comment = "comment_example"; // String | Comment of the key

apiInstance.keysKeyIdPut(keyId, comment).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **keyId** | **String**| ID of key to edit | 
 **comment** | **String**| Comment of the key | 

### Return type

[**EditResponse**](EditResponse.md)

### Authorization

[akmey_auth](../README.md#akmey_auth), [akmey_token](../README.md#akmey_token)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

