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
    makeTable = function () {
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
      var gift = gifts.get(givingVatId).get(recipiantVatId).get(giftNonce);
      // gift wasnt found, a pending promise created.
      if (undefined === gift) {
        var deffered = new Q();
        recpiants.get(givingVatId).get(recipiantVatId).put(giftNonce, deffered.resolver);
        return Object.freeze({isPromise: true, promise: deffered.promise});
      }
      return gift;
    };
    const putGift = function(givingVatId, recipiantVatId, giftNonce, gift) {
      // @param givingVatId :VatId
      // @param recipiantVatId :VatId
      // @param giftNonce :DeepFrozen
      // @param gift :Any
      // @results undefined :Void
      
      // looking for pending recipiant
      const resolver = recipiants.get(givingVatId).get(recipiantVatId).get(giftNonce);
      if (undefined !== resolver) {
        resolver.resolve(gift);
        return undefined;
      };
      // no pending recipiant found, adding to gifts
      gifts.get(givingVatId).get(recipiantVatId).put(giftNonce, gift);
      return undefined;
    };
    
    const maker = function (owningVatId) {
      var nonceLocator = {}
      nonceLocator.provideFor = function (recipiantVatId, giftNonce, gift) {
        return putGift(owningVatId, recipiantVatId, giftNonce, gift);
      }
      nonceLocator.acceptFrom = function (givingVatId, giftNonce) {
        return getGift(givingVatId, owningVatId, giftNonce);
      }
      
      return Object.freeze(nonceLocator);
    };
    
    return Object.freeze(maker);
  };
})(require, exports, module);
