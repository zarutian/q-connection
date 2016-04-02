"const-require \"collections/map\"";
"const-require \"Q\"";
"const-provide \"Q-Connection/NonceLocator\"";
// Note that :something is not a TypeScript type, it is an name for a guard put on that slot.
return (function (require, exports, module) {
  "use strict";
  var Map = require("collections/map");
  var Q   = require("Q");
  exports.makeNonceLocatorMaker = function () {
    const gifts      = new Map();
    const recipiants = new Map();
    
    const getGift = function(givingVatId, recipiantVatId, giftNonce) {
      // @param givingVatId :VatId
      // @param recipiantVatId :VatId
      // @param giftNonce :DeepFrozen
      // @results gift :Any
    };
    const putGift = function(givingVatId, recipiantVatId, giftNonce, gift) {
      // @param givingVatId :VatId
      // @param recipiantVatId :VatId
      // @param giftNonce :DeepFrozen
      // @param gift :Any
      // @results undefined :Void
      
      // looking pending recipiant
      var pendingRecipiantsOfGiver = recipiants.get(givingVatId);
      if (undefined === pendingRecipiantsOfGiver) {
        pendingRecipiantsOfGiver = new Map();
        recipiants.put(givingVatId, pendingRecipiantsOfGiver);
      };
      var pendingByRecipiant = pendingRecipiantsOfGiver.get(recipiantVatId);
      if (undefined === pendingByRecipiant) {
        pendingByRecipiant = new Map();
        pendingRecipiantsOfGiver.put(recipiantVatId, pendingByRecipiant);
      };
      var resolver = pendingByRecipiant.get(giftNonce);
      if (undefined !== resolver) {
        resolver.resolve(gift);
        return undefined;
      };
      
      // no pending recipiant found, adding to gifts
      var recipiantsOfGiver = gifts.get(givingVatId); 
      if (undefined === recipiantsOfGiver) {
        recipiantsOfGiver = new Map();
        gifts.put(givingVatId, recipiantsOfGiver);
      };
      var giftsForRecipiant = recipiantsOfGiver.get(recipiantVatId);
      if (undefined === giftsForRecipiant) {
        giftsForRecipiant = new Map();
        recipiantsOfGiver.put(recipiantVatId, giftsForRecipiant);
      };
      giftsForRecipiant.put(giftNonce, gift);
      return undefined;
    };
    
    
    const iface = {};
    
    return Object.freeze(iface);
  };
})(require, exports, module);
