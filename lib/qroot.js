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
      messageRelay = function () { return Q.reject("no message relaying provided"); };
    };
    var fromSturdyRef = kwargs.fromSturdyRef;
    if (fromSturdyRef === undefined) {
      fromSturdyRef = function () { return Q.reject("realizing SturdyRefs is not provided"); };
    };
    var fromActiveCert = kwargs.fromActiveCert;
    if (fromActiveCert === undefined) {
      fromActiveCert = function () { return Q.reject("instating ActiveCert not provided"); };
    };
    var fromMacaroon = kwargs.fromMacaroon;
    if (fromMacaroon === undefined) {
      fromMacaroon = function () { return Q.reject("macaroon support not provided"); };
    };
    var WebRTC_ICEcandidate = kwargs.WebRTC_ICEcandidate;
    if (WebRTC_ICEcandidate === undefined) {
      WebRTC_ICEcandidate = function () {};
    };
    var lookupPubKey = kwargs.lookupPubKey;
    if (lookupPubKey === undefined) {
      lookupPubKey = function () { return Q.reject("pubkey lookup not provided"); };
    };
    var 
    
    var makeQroot = function (owningVatId) {
      var i = {};
      i.myVatId = myVatId;
      i.nonceLocator        = nonceLocatorMaker(owningVatId);
      i.fromSturdyRef       = function (sturdyRef) { return fromSturdyRef(sturdyRef); };
      i.fromActiveCert      = function (cert) { return fromActiveCert(cert); };
      i.fromMacaroon        = function (macaroon) { return fromMacaroon(macaroon); };
      i.WebRTC_ICEcandidate = function (candidate) { return WebRTC_ICEcandidate(candidate); };
      i.relay               = function (destVatId, message) { return messageRelay(destVatId, message); };
      i.lookupPubkey        = function (vatFingerprint) { return lookupPubKey(vatFingerprint); };
      i.intro               = function (vatId, serializedConnectorMobileCodeDepiction) { return intro(arguments); };
    
      return Object.freeze(i);
    };
  };
  
})(require, exports, module);
