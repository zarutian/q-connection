"const-require \"collections/map\"";
// Note that :something is not a TypeScript type, it is an name for a guard put on that slot.
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
      // @param givingVatId :VatId
      // @param recipiantVatId :VatId
      // @param giftNonce :Data
      // @param gift :Any
      // @results null :Void
    };
    
    
    const iface = {};
    
    return Object.freeze(iface);
  };
})(require, exports, module);
