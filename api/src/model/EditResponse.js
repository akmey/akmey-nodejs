/**
 * Akmey
 * Akmey is a keyserver for SSH public keys
 *
 * OpenAPI spec version: 0.0.1-r2
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

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Key'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Key'));
  } else {
    // Browser globals (root is window)
    if (!root.Akmey) {
      root.Akmey = {};
    }
    root.Akmey.EditResponse = factory(root.Akmey.ApiClient, root.Akmey.Key);
  }
}(this, function(ApiClient, Key) {
  'use strict';




  /**
   * The EditResponse model module.
   * @module model/EditResponse
   * @version 0.0.1-r2
   */

  /**
   * Constructs a new <code>EditResponse</code>.
   * @alias module:model/EditResponse
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>EditResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/EditResponse} obj Optional instance to populate.
   * @return {module:model/EditResponse} The populated <code>EditResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('success')) {
        obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
      }
      if (data.hasOwnProperty('key')) {
        obj['key'] = Key.constructFromObject(data['key']);
      }
    }
    return obj;
  }

  /**
   * @member {Boolean} success
   */
  exports.prototype['success'] = undefined;
  /**
   * @member {module:model/Key} key
   */
  exports.prototype['key'] = undefined;



  return exports;
}));


