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
  //
  // Limit them to 5 right now (testing).
  //
  options.limit = 100;

  var results = {};

  //
  // ### function pipelineOne (name, next)
  // Pipelines the module with `name` and then
  // adds the result set to `results`.
  //
  function pipelineOne(name, next) {
    console.log('pipeline | %s', name)
    pipeline(name, function (err, files) {
      if (err) {
        console.error('error    | %s %s', name, err.message)
        return err.code !== 'ENOENT' && err.code !== 'EACCES'
          ? next(err)
          : next();
      }

      console.log('analyze  | %s', name)
      try { results[name] = pipeline.analyze(files, options.package); }
      catch (ex) { return next(ex); }

      console.log('results  | %s %j', name, results[name]);
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
      async.forEachLimit(list, 3, pipelineOne, done);
    }
  ], function (err) {
    if (err) { return callback(err) }
    callback(null, results);
  });
};