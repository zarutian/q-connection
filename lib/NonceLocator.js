"const-require \"collections/map\"";
return (function (require, exports, module) {
  "use strict";
  var Map = require("collections/map");
  exports.makeNonceLocatorMaker = function () {
    const gifts      = new Map();
    const recipiants = new Map();
    
    const getGift = function(givingVatId, recipiantVatId, giftNonce) {
      // @param givingVatId :VatId
      // @param recipiantVatId :VatId
      // @param giftNonce :Data
      // @results gift :Any
    };
    const putGift = function(givingVatId, recipiantVatId, giftNonce, gift) {
      
    };
    
    
    const iface = {};
    
    return Object.freeze(iface);
  };
})(require, exports, module);
