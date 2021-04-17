
const has = (o: any, k: any) => Object.prototype.hasOwnProperty.call(o, k);

export default class Util { 
  /**
   * Sets default properties on an object that aren't already specified.
   * @param {Object} def Default properties
   * @param {Object} given Object to assign defaults to
   * @returns {Object}
   * @private
   */
    public static mergeDefault(def: any, given: any) {
        if (!given) 
            return def;
        
        for (const key in def) {
            if (!has(given, key) || given[key] === undefined) {
                given[key] = def[key];
            } else if (given[key] === Object(given[key])) {
                given[key] = Util.mergeDefault(def[key], given[key]);
            }
        }

        return given;
    }
}
