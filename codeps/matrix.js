var async = require('async'),
    weights = require('./weights');

//
//
//
var matrix = module.exports = function (options, callback) {
  weights(options, function (err, relate) {
    if (err) { return callback(err) }

    var codeps = Object.keys(relate),
        rows   = {};

    async.forEachLimit(
      codeps, 3,
      function (name, next) {
        weights({
          package:  name,
          registry: options.registry,
          top:      options.top
        }, function (err, sub) {
          if (err) { return next(err); }
          rows[name] = sub;
          next();
        })
      },
      function (err) {
        if (err) { return callback(err); }
        callback(null, relate, rows);
      }
    );
  });
};