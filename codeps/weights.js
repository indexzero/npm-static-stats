/*
 * weights.js: Calculates a single weight-set for a co-depencency matrix.
 *
 * (C) 2014 Charlie Robbins
 *
 */

var request = require('request');

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
// `registry` provided. These weights represent a measure of their codependency
// relationship with the `package`.
//
var weights = module.exports = function weights(options, callback) {
  options.filter = options.filter || function () { return true; }

  weights.calculate(options, function (err, rows) {
    if (err) { return callback(err); }

    var relate = {},
        total  = 0,
        reduced;

    rows.forEach(function (row) {
      var codep = row.key[1],
          thru  = row.key[2];

      if (!relate[codep]) {
        relate[codep] = {
          count: 1,
          thru: {}
        };

        relate[codep].thru[thru] = 1;
        return;
      }

      if (!relate[codep][thru]) {
        relate[codep].thru[thru] = 1;
        relate[codep].count++;
      }
    });

    reduced = Object.keys(relate)
      .sort(function (lname, rname) {
        var lcount = relate[lname].count,
            rcount = relate[rname].count;

        if (lcount === rcount) { return 0; }
        return lcount < rcount ? 1 : -1;
      })
      .filter(options.filter);

    if (options.top) {
      reduced = reduced.slice(0, options.top)
    }

    reduced = reduced.reduce(function (all, name) {
      total     += relate[name].count;
      all[name] =  relate[name];
      return all;
    }, {});

    Object.keys(reduced).forEach(function (name) {
      reduced[name].relative = +(reduced[name].count / total);
    });

    reduced.total = total;
    callback(null, reduced);
  });
};

//
// ### function weights (options, callback)
// #### @options {Object}
// ####   - package  {string}   Package to calculate weights for
// ####   - registry {string}   Registry to calculate against
// ####   - view     {string}   **Optional** View to calculate weights against.
//
weights.calculate = function calculate(options, callback) {
  options.registry = options.registry || 'http://localhost:5984/registry'
  options.view     = options.view     || 'latest';

  request({
    url:   options.registry + '/_design/codependencies/_view/' + options.view,
    json:  true,
    qs: {
      start_key:   JSON.stringify([options.package]),
      end_key:     JSON.stringify([options.package, {}]),
      group_level: 3
    }
  }, function (err, res, body) {
    if (err || !~[200, 304].indexOf(res.statusCode)) {
      return callback(err || new Error('Bad status code: ' + res.statusCode));
    }

    callback(null, body.rows);
  });
};