var async = require('async'),
    weights = require('./weights');

//
//
//
var matrix = module.exports = function (options, callback) {
  weights(options, function (err, relate) {
    if (err) { return callback(err) }

    var codeps = Object.keys(relate).filter(function (n) { return n !== 'total' }),
        lookup = codeps.reduce(function (a, n) { a[n] = 1; return a }, {}),
        rows   = {};

    async.forEachLimit(
      codeps, 3,
      function (name, next) {
        weights({
          package:  name,
          registry: options.registry,
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