/*
 * index.js: Top-level include for the comp-stat calculations.
 *
 * (C) 2014 Charlie Robbins
 *
 */

var async = require('async'),
    pipeline = require('npm-pipeline'),
    dependencies = require('./dependencies');

//
// ### function compStat (options, callback)
// #### @options {Object} Options for this calculation run
// ####   - package {string}   Name of the package to calculate against
// ####   - registry {string}   Registry to calculate against
// ####   - limit   {number}   **Optional** Limits run to first N dependencies
// ####   - skip    {number}   **Optional** Skip frist M dependencies in run
// ####   - filter  {function} **Optional** Limits run to those conforming to a predicate
// Does the core parts of the compStat calculation using npm-pipeline
//
var compStat = module.exports = function (options, callback) {
  var results = {},
      index   = 0,
      iid;

  //
  // ### function onError (err, name, cur, next)
  // Makes `name` as errored, logs the `err`
  // and moves on to `next` silently.
  //
  function onError(err, name, cur, next) {
    console.error('error    | %d | %s %s', cur, name, err.message)

    //
    // TODO: When we better understand our errors stop ignoring
    // all of them.
    //
    if (err) {
      console.log(err.stack);
    }

    //
    // This is easily distinguishable from
    //
    //     { calls: { /* etc, etc ... */ } }
    //
    results[name] = { error: err };
    next();
  }

  //
  // ### function pipelineOne (name, next)
  // Pipelines the module with `name` and then
  // adds the result set to `results`.
  //
  function pipelineOne(name, next) {
    var current = ++index;

    console.log('pipeline | %d | %s', current, name)
    pipeline(name, function (err, files) {
      if (err) {
        return onError(err, name, current, next);
      }

      console.log('analyze  | %d | %s', current, name)
      try { results[name] = pipeline.analyze(files, options.package); }
      catch (ex) { return onError(ex, name, current, next); }

      console.log('results  | %d | %s %j', current, name, results[name]);
      next();
    });
  }

  async.waterfall([
    //
    // 1. Get the dependencies and filter them (if any)
    //
    async.apply(dependencies, options),
    function (list, next) {
      if (options.filter) {
        list = list.filter(options.filter);
      }

      return next(null, list);
    },
    //
    // 2. Run them through npm-pipeline attempting to limit the
    // concurrency to a hard five right now
    //
    // TODO: Take advantage of CPU threads here since walking the AST
    // is a very compute heavy problem.
    //
    function analyze(list, done) {
      console.log('Analyzing %d modules', list.length);
      iid = setInterval(function () {
        console.log('remain   | %d | %d', index, list.length - index);
      }, 5000);

      async.forEachLimit(list, 5, pipelineOne, done);
    }
  ], function (err) {
    clearInterval(iid);
    if (err) { return callback(err) }
    callback(null, results);
  });
};

//
// ### function summary (options, callback)
// #### @options {Object} Options for this calculation run
// ####   - package {string}   Name of the package to calculate against
// ####   - registry {string}   Registry to calculate against
// ####   - limit   {number}   **Optional** Limits run to first N dependencies
// ####   - skip    {number}   **Optional** Skip frist M dependencies in run
// ####   - filter  {function} **Optional** Limits run to those conforming to a predicate
// Does the core parts of the compStat calculation using npm-pipeline AND reduces
// the resultant objects in a way that is meaningful:
//   - Total sum
//   - Weighted sum
//
compStat.summary = function (options, callback) {
  var data = options.data;

  //
  // ### function calculate()
  // Does the core calculation work
  //
  function calculate() {
    var sums = {
      absolute: {},
      weighted: {},
      total:    0
    };

    //
    // ### function addAbsolute (type, obj)
    // Adds the values of the `obj` to the specified type.
    //
    function addAbsolute(type, obj) {
      var keys = Object.keys(obj);
      sums.absolute[type] = sums.absolute[type] || {};
      keys.forEach(function (key) {
        sums.absolute[type][key] =  sums.absolute[type][key] || 0;
        sums.absolute[type][key] += obj[key]
      });
    }

    //
    // ### function addWeighted (type, obj)
    // Adds the values of the `obj` to the specified type.
    //
    function addWeighted(type, obj) {
      var keys = Object.keys(obj);
      if (keys.length) {
        sums.total++;
      }

      sums.weighted[type] = sums.weighted[type] || {};
      keys.forEach(function (key) {
        sums.weighted[type][key] = sums.weighted[type][key] || 0;
        sums.weighted[type][key]++;
      });
    }

    Object.keys(data)
      .forEach(function (pkg) {
        var types = Object.keys(data[pkg]);
        if (types.length) {
          types.forEach(function (type) {
            addAbsolute(type, data[pkg][type]);
            addWeighted(type, data[pkg][type]);
          });
        }
      });

    callback(null, sums);
  }

  //
  // If we have data then calculate our summary
  // now
  //
  if (data) {
    return calculate();
  }

  compStat(options, function (err, results) {
    if (err) {
      return callback(err);
    }

    data = results;
    calculate();
  });
};