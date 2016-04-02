"const-require \"collections/map\"";
"const-requore \"collections/DefaultingMapFacet\"";
"const-require \"Q\"";
"const-provide \"Q-Connection/NonceLocator\"";
// Note that :something is not a TypeScript type, it is an name for a guard put on that slot.
return (function (require, exports, module) {
  "use strict";
  var Map = require("collections/map");
  var Q = require("Q");
  var makeTable:
  (function() {
    var m = require("collections/DefaultingMapFacet");
    var dMap = function (c) { return m.makeDefaultingMapFacet(c); }
    var defaulta = function () { return new Map(); }
    var defaulte = function () { return new dMap(defaulta); }
    var makeTable = function () {
      var t = dMap(defaulte);
      return t;
    }
  })();
  exports.makeNonceLocatorMaker = function () {
    const gifts      = makeTable();
    const recipiants = makeTable();
    
    const getGift = function(givingVatId, recipiantVatId, giftNonce) {
      // @param givingVatId :VatId
      // @param recipiantVatId :VatId
      // @param giftNonce :DeepFrozen
      // @results gift :Any
      
      // looking for the gift
      var recipiantsOfGiver;
      // gift wasnt found, a pending promise created.
    };
    const putGift = function(givingVatId, recipiantVatId, giftNonce, gift) {
      // @param givingVatId :VatId
      // @param recipiantVatId :VatId
      // @param giftNonce :DeepFrozen
      // @param gift :Any
      // @results undefined :Void
      
      // looking for pending recipiant
      var resolver = recipiants.get(givingVatId).get(recipiantVatId).get(giftNonce);
      if (undefined !== resolver) {
        resolver.resolve(gift);
        return undefined;
      };
      
      // no pending recipiant found, adding to gifts
      var giftsForRecipiant = gifts.get(givingVatId).get(recipiantVatId); 
      giftsForRecipiant.put(giftNonce, gift);
      return undefined;
    };
    
    
    const iface = {};
    
    return Object.freeze(iface);
  };
})(require, exports, module);
