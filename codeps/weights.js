
var request = require('request');

//
// ### function weights (options, callback)
// #### @options {Object}
// ####   - package
// ####   - registry
// ####   - top
//
var weights = module.exports = function weights(options, callback) {
  options.top = options.top || 10;

  weights.calculate(options, function (err, rows) {
    if (err) { return callback(err); }

    var relate = {},
        total  = 0;

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

    relate = Object.keys(relate)
      .sort(function (lname, rname) {
        var lcount = relate[lname].count,
            rcount = relate[rname].count;

        if (lcount === rcount) { return 0; }
        return lcount < rcount ? 1 : -1;
      })
      .slice(0, options.top)
      .reduce(function (all, name) {
        total     += relate[name].count;
        all[name] =  relate[name];
        return all;
      }, {});

    Object.keys(relate).forEach(function (name) {
      relate[name].relative = ((relate[name].count / total) * 100).toFixed(2);
    });

    callback(null, relate);
  });
};

//
// ### functionc calculate
//
weights.calculate = function calculate(options, callback) {
  options.registry = options.registry || 'http://localhost:5984/registry'

  request({
    url:   options.registry + '/_design/codependencies/_view/latest',
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