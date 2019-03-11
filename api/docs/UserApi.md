# Akmey.UserApi

All URIs are relative to *https://akmey.leonekmi.fr/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**userGet**](UserApi.md#userGet) | **GET** /user | Get currently authenticated user
[**userMatchQueryGet**](UserApi.md#userMatchQueryGet) | **GET** /user/match/{query} | Search a user by its email or username
[**userUserIdGet**](UserApi.md#userUserIdGet) | **GET** /user/{userId} | Get user by its ID


<a name="userGet"></a>
# **userGet**
> User userGet()

Get currently authenticated user

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

var apiInstance = new Akmey.UserApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.userGet(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**User**](User.md)

### Authorization

[akmey_auth](../README.md#akmey_auth), [akmey_token](../README.md#akmey_token)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="userMatchQueryGet"></a>
# **userMatchQueryGet**
> User userMatchQueryGet(query)

Search a user by its email or username

### Example
```javascript
var Akmey = require('akmey');

var apiInstance = new Akmey.UserApi();

var query = "query_example"; // String | ID of user to return


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.userMatchQueryGet(query, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **query** | **String**| ID of user to return | 

### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="userUserIdGet"></a>
# **userUserIdGet**
> userUserIdGet(userId)

Get user by its ID

### Example
```javascript
var Akmey = require('akmey');

var apiInstance = new Akmey.UserApi();

var userId = 789; // Number | ID of user to return


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.userUserIdGet(userId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **Number**| ID of user to return | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

