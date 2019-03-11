/**
 * Akmey
 * Akmey is a keyserver for SSH public keys
 *
 * OpenAPI spec version: 0.0.1
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
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.Akmey);
  }
}(this, function(expect, Akmey) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new Akmey.DeleteResponse();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('DeleteResponse', function() {
    it('should create an instance of DeleteResponse', function() {
      // uncomment below and update the code to test DeleteResponse
      //var instance = new Akmey.DeleteResponse();
      //expect(instance).to.be.a(Akmey.DeleteResponse);
    });

    it('should have the property success (base name: "success")', function() {
      // uncomment below and update the code to test the property success
      //var instance = new Akmey.DeleteResponse();
      //expect(instance).to.be();
    });

  });

}));
