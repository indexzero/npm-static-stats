/*
 * weights.js: Calculates a depencency set.
 *
 * (C) 2014 Charlie Robbins
 *
 */

var request = require('request');

//
// ### function dependencies (options, callback)
// #### @options {Object}
// ####   - package  {string}   Package to calculate weights for
// ####   - registry {string}   Registry to calculate against
//   - limit   {number}   **Optional** Limits run to first N dependencies
//   - skip    {number}   **Optional** Skip frist M dependencies in run
//   - filter  {function} **Optional** Limits run to those conforming to a predicate
//
module.exports = function dependencies(options, callback) {
  options.registry = options.registry || 'http://localhost:5984/registry'

  var qs = {
    start_key:   JSON.stringify([options.package]),
    end_key:     JSON.stringify([options.package, {}]),
    group_level: 2
  };

  if (options.limit) {
    qs.limit = options.limit;
  }

  if (options.skip) {
    qs.skip = options.skip;
  }

  request({
    url:  options.registry + '/_design/app/_view/dependedUpon',
    json: true,
    qs:   qs
  }, function (err, res, body) {
    if (err || !~[200, 304].indexOf(res.statusCode)) {
      return callback(err || new Error('Bad status code: ' + res.statusCode));
    }

    callback(null, body.rows.map(function (row) {
      return row.key[1];
    }));
  });
};