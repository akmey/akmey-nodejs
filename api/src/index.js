/**
 * Akmey
 * Akmey is a keyserver for SSH public keys
 *
 * OpenAPI spec version: 0.0.1-r3
 * Contact: me@leonekmi.fr
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.2
 *
 * Do not edit the class manually.
 *
 */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/DeleteResponse', 'model/EditResponse', 'model/FullKey', 'model/Key', 'model/LightUser', 'model/Model422Err', 'model/User', 'api/KeysApi', 'api/UserApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/DeleteResponse'), require('./model/EditResponse'), require('./model/FullKey'), require('./model/Key'), require('./model/LightUser'), require('./model/Model422Err'), require('./model/User'), require('./api/KeysApi'), require('./api/UserApi'));
  }
}(function(ApiClient, DeleteResponse, EditResponse, FullKey, Key, LightUser, Model422Err, User, KeysApi, UserApi) {
  'use strict';

  /**
   * Akmey_is_a_keyserver_for_SSH_public_keys.<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var Akmey = require('index'); // See note below*.
   * var xxxSvc = new Akmey.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new Akmey.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
   * and put the application logic within the callback function.</em>
   * </p>
   * <p>
   * A non-AMD browser application (discouraged) might do something like this:
   * <pre>
   * var xxxSvc = new Akmey.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new Akmey.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version 0.0.1-r3
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The DeleteResponse model constructor.
     * @property {module:model/DeleteResponse}
     */
    DeleteResponse: DeleteResponse,
    /**
     * The EditResponse model constructor.
     * @property {module:model/EditResponse}
     */
    EditResponse: EditResponse,
    /**
     * The FullKey model constructor.
     * @property {module:model/FullKey}
     */
    FullKey: FullKey,
    /**
     * The Key model constructor.
     * @property {module:model/Key}
     */
    Key: Key,
    /**
     * The LightUser model constructor.
     * @property {module:model/LightUser}
     */
    LightUser: LightUser,
    /**
     * The Model422Err model constructor.
     * @property {module:model/Model422Err}
     */
    Model422Err: Model422Err,
    /**
     * The User model constructor.
     * @property {module:model/User}
     */
    User: User,
    /**
     * The KeysApi service constructor.
     * @property {module:api/KeysApi}
     */
    KeysApi: KeysApi,
    /**
     * The UserApi service constructor.
     * @property {module:api/UserApi}
     */
    UserApi: UserApi
  };

  return exports;
}));
