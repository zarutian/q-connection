// This is qroot! Havent gotten an idea for name yet.
"const-require \"./NonceLocator\"";

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
})(require, exports, module);
