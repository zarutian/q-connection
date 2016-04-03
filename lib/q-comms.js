(function (require, exports, module) {
  "use strict";
  var Q = require("Q");
  var Connection = require("Q-Connection");
  var Qroot = require("./qroot");
  var Map = require("collections/Map");
  
  exports.makeQhub = function (kwargs) {
    var myVatId = kwargs.myVatId;
    var h = {};
    var remoteConnectionsRoots = new Map(); // indexed by VatId
    var messageRelay = function (destVatId, message) {
      if (destVatID == myVatId) {
        return true;
      } else {
        if (remoteConnectionsRoots.has(destVatId)) {
          Q.send(remoteConnectionsRoots.get(destVatId), "relay", [destVatId, message]);
          return true;
        } else {
          return false;
        };
      };
    };
  
    h.makeConnection = function (port, options) {
      
      
    }
    return h;
  };
  
  return exports;
})(require, exports, module);
