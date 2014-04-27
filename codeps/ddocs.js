/*
 * ddocs.js: Design documents and seed logic
 *
 * (C) 2014 Charlie Robbins
 *
 */

var async = require('async'),
    request = require('request');

var ddocs = module.exports = {};

//
// ### function seed (options, callback)
// Seeds the target registry database with all of the
// design documents needed unless they already exist
//
// TODO: Use something like this
// https://github.com/mmalecki/couchdb-seed-design
//
ddocs.seed = function (registry, callback) {
  registry = registry || 'http://localhost:5984/registry'

  request({
    uri: registry + '/_all_docs',
    qs: {
      startkey:    JSON.stringify('_design/'),
      endkey:      JSON.stringify('_design0'),
      include_docs: true
    },
    json: true
  }, function (err, res, body) {
    if (err || !~[200, 304].indexOf(res.statusCode)) {
      return callback(err || new Error('Bad status code: ' + res.statusCode));
    }

    var names = body.rows.reduce(function (all, row) {
      all[row.id.split('/')[1]] = row.doc;
      return all;
    }, {});

    async.forEach(
      Object.keys(ddocs),
      function (name, next) {
        if (name === 'seed') {
          //
          // Skip the 'seed' function since it is
          // the only export that is not a design document
          //
          return next();
        }

        var uri    = registry + '/_design/' + name,
            lviews = Object.keys(ddocs[name].views),
            rviews = Object.keys(names[name].views),
            diff   = lviews.some(function (vname) {
              return rviews.indexOf(vname) === -1;
            });

        if (names[name]) {
          if (!diff) {
            //
            // Of if the design doc already exists, skip it.
            // Don't overwrite it
            //
            return next();
          }

          ddocs[name]._rev = names[name]._rev;
        }

        request({
          uri:    uri,
          json:   ddocs[name],
          method: 'PUT'
        }, function (err, res) {
          return err || !~[200, 201, 304].indexOf(res.statusCode)
            ? next(err || new Error('Bad status code: ' + res.statusCode))
            : next();
        })
      },
      callback
    )
  });
};

//
// ### @codependencies {Object}
// All view functions for calculating raw data necessary
// for codependency relationships in CouchDB.
//
ddocs.codependencies = {
  language: 'javascript',
  views: {
    latest: {
      reduce: '_sum',
      map: codependencyByType('dependencies')
    },
    latestDev: {
      reduce: '_sum',
      map: codependencyByType('devDependencies')
    }
  }
};

//
// ### @private function codependencyByType (type)
// Returns a stringified CouchDB view function which
// emits the keys for a co-dependency relationship
// of the specified type:
//   - dependencies
//   - devDependencies
//   - peerDependencies
//   - optionalDependencies
//
function codependencyByType (type) {
  return couchFunc(function (doc) {
    if (doc._id.match(/^npm-test-.+$/) &&
        doc.maintainers &&
        doc.maintainers[0].name === 'isaacs') {
      return;
    }

    var l = doc['dist-tags'] && doc['dist-tags'].latest
    if (!l) return
    l = doc.versions && doc.versions[l]
    if (!l) return

    var d = l[$codependency];
    if (!d) return

    for (var dep in d) {
      dep = dep.trim();
      for (var codep in d) {
        codep = codep.trim();
        if (dep !== codep) {
          emit([dep, codep, doc._id], 1)
        }
      }
    }
  }).replace('$codependency', "'" + type + "'");
}

//
// ### @private couchFunc (func)
// Convert a named function anonymous function source.
//
function couchFunc(func) {
  func = '' + func;
  func = func.replace(/^function\s*[^(]*/, 'function');
  return func;
};