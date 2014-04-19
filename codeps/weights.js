
var request = require('request');

//
// ### function weights (options, callback)
// #### @options {Object}
// ####   - package
// ####   - registry
// ####   - magic
//
var weights = module.exports = function weights(options, callback) {
  options.min = options.min || 20;

  weights.calculate(options, function (err, rows) {
    if (err) { return callback(err); }

    var relate = {};

    rows.forEach(function (row) {
      var codep = row.key[1],
          thru  = row.key[2];

      if (!relate[codep]) {
        relate[codep] = {
          count: 1,
          thru: {}
        };

        relate[codep][thru] = true;
        return;
      }

      if (!relate[codep][thru]) {
        relate[codep].thru[thru] = true;
        relate[codep].count++;
      }
    });

    Object.keys(relate)
      .forEach(function (name) {
        if (relate[name].count < options.min) {
          delete relate[name];
        }
      });

    console.dir(relate);
  });
};

weights.calculate = function calculate(options, callback) {
  options.registry = options.registry || 'http://localhost:5984/registry2'

  request({
    url:   options.registry + '/_design/indexzero/_view/latestCodependencies',
    json:  true,
    qs: {
      group_level: 3
    }
  }, function (err, res, body) {
    if (err || !~[200, 304].indexOf(res.statusCode)) {
      return callback(err || new Error('Bad status code: ' + res.statusCode));
    }

    callback(null, body.rows);
  });
};