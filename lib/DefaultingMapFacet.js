"const-require \"collections/Map\"";
"const-provide \"collections/DefaultingMapFacet\"";
return (function (require, exports, module) {
  "use strict";
  const Map = require("collections/Map");
  exports.makeDefaultingMap = function (defaultClosure, optionalCollectionConstructor) {
    const constr = (undefined === optionalCollectionConstructor) ? Map : optionalCollectionConstructor;
    // todo: find out the whole interface of Maps, just implement get and put for now though
    const iface = {};
    const m = new constr();
    iface.put = function (key, value) { return m.put(key, value); }
    iface.get = function (key) {
      var val = m.get(key);
      if (undefined === val) {
        val = defaultClosure(iface, key);
        iface.put(key, val);
      }
      return val;
    }
    return Object.freeze(iface);
  }
  return exports;
})(require, exports, module);
