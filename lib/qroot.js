// This is qroot! Havent gotten an idea for name yet.
"const-require \"./NonceLocator\"";
"const-require \"Q\"";

(function (require, exports, module) {
  "use strict";
  var nl = require("./NonceLocator");
  /*
    Hmm per q-connection we need an object that is passed in as the root.
    Its purpose is to:
     * make that connections NonceLocator reachable
     * make LocatorUnum.fromSturdyRef()  reachable, if provided
     * make introductions of vats between vats possible by
     ** relaying WebRTC offers and accepts, as AliceVat, between BobVat and CarolVat when using WebRTC DataChannels
     * allowed looking up vats' public keys by vat fingerprint
     * relay (encrypted) messages between vats that cannot otherwise communicate
     * tell the other end this vats vatId
     * make ActiveCert interface reachable, if provided,
       (it should use same NonceLocator as if issuer had connected directly)
     * relay WebRTC ICEcandidates for this connection (if this q-connection is over WebRTC datachannel)
  */
  exports.makeQrootMaker = function (kwargs) {
    var myVatId = kwargs.myVatId;
    var nonceLocatorMaker = kwargs.nonceLocatorMaker;
    if (nonceLocatorMaker === undefined) {
      nonceLoactorMaker = nl.makeNonceLocatorMaker();
    };
    var messageRelay = kwargs.messageRelay;
    if (messageRelay === undefined) {
      messageRelay = function (destVatId, message) { return Q.reject("no message relaying provided"); };
    };
    var fromSturdyRef = kwargs.fromSturdyRef;
    if (fromSturdyRef === undefined) {
      fromSturdyRef = function (sturdyRef) { return Q.reject("realizing SturdyRefs is not provided"); };
    };
    var fromActiveCert = kwargs.fromActiveCert;
    if (fromActiveCert === undefined) {
      fromActiveCert = function (cert) { return Q.reject("instating ActiveCert not provided"); };
    };
    var fromMacaroon = kwargs.fromMacaroon;
    if (fromMacaroon === undefined) {
      fromMacaroon = function (macaroon) { return Q.reject("macaroon support not provided"); };
    };
    var WebRTC_ICEcandidate = kwargs.WebRTC_ICEcandidate;
    if (WebRTC_ICEcandidate === undefined) {
      WebRTC_ICEcandidate = function (candidate) {};
    };
    var lookupPubKey = kwargs.lookupPubKey;
    if (lookupPubKey === undefined) {
      lookupPubKey = function (vatFingerprint) { return Q.reject("pubkey lookup not provided"); };
    };
    var intro = kwargs.introForVats;
    if (intro === undefined) {
      intro = function (vatId, serializedConnectorMobileCodeDepiction) { return Q.reject("vat intro not working yet"); };
    };
    
    var makeQroot = function (owningVatId) {
      var i = {};
      i.myVatId = myVatId;
      i.nonceLocator        = nonceLocatorMaker(owningVatId);
      i.fromSturdyRef       = fromSturdyRef;
      i.fromActiveCert      = fromActiveCert;
      i.fromMacaroon        = fromMacaroon;
      i.WebRTC_ICEcandidate = WebRTC_ICEcandidate;
      i.relay               = messageRelay;
      i.lookupPubkey        = lookupPubKey;
      i.intro               = intro;
    
      return Object.freeze(i);
    };
    return Object.freeze(makeQroot);
  };
  
})(require, exports, module);
