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
    // return err.code !== 'ENOENT' && err.code !== 'EACCES'
    //   ? next(err)
    //   : next();


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