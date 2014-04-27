/*
 * matrix.js: Calculates the base data necessary for a co-depencency matrix.
 *
 * (C) 2014 Charlie Robbins
 *
 */

var async = require('async'),
    weights = require('./weights');

//
// ### function weights (options, callback)
// #### @options {Object}
// ####   - package  {string}   Package to calculate weights for
// ####   - registry {string}   Registry to calculate against
// ####   - top      {number}   **Optional** If set, returns only the top N codeps
// ####   - filter   {function} **Optional** If set, returns only those matching the `filter`.
// ####   - view     {string}   **Optional** View to calculate weights against.
//
// Calculates the weights for the specified `package` against the `view` in the
// `registry` provided along with the same weights for every package in the initial
// set filtering only those in that set. These two pieces of data constitute all data
// necessary to fully represent the full measure of the codependency
// relationship of the `package`.
//
var matrix = module.exports = function (options, callback) {
  weights(options, function (err, relate) {
    if (err) { return callback(err); }

    //
    // Remark (indexzero): Not crazy about these inline functions,
    // but it gets the job done.
    //
    var codeps = Object.keys(relate).filter(function (n) { return n !== 'total' }),
        lookup = codeps.reduce(function (a, n) { a[n] = 1; return a }, {}),
        rows   = {};

    async.forEachLimit(
      codeps, 3,
      function (name, next) {
        weights({
          package:  name,
          registry: options.registry,
          view:     options.view,
          filter:   function (val) {
            return !!lookup[val];
          }
        }, function (err, sub) {
          if (err) { return next(err); }
          rows[name] = sub;
          next();
        })
      },
      function (err) {
        if (err) { return callback(err); }
        callback(null, rows, relate);
      }
    );
  });
};