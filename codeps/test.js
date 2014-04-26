var fs = require('fs'),
    matrix = require('./matrix'),
    weights = require('./weights');

matrix({
  package: 'winston'
}, function (err, codeps, rows) {
  if (err) {
    throw err;
  }

  function dump(name, relate) {
    Object.keys(relate).forEach(function (codep) {
      console.log('%s | %d %s %s', name, relate[codep].count, codep, relate[codep].relative)
    });
  }

  function values (relate) {
    return Object.keys(relate).map(function (name) {
      return relate[name].count;
    });
  }

  var conames = Object.keys(rows),
      names   = ['winston'].concat(conames).sort(),
      matrix,
      row;

console.log(names);


  dump('winston', codeps);
  Object.keys(rows).forEach(function (name) {
    console.log();
    dump(name, rows[name]);
  });

  //
  // 1. The first row is the codep count of the target
  //    with a significant zero for the target itself.
  //
  row = values(codeps);
  row.splice(names.indexOf('winston'), 0, 0);
  matrix = [row.slice()];

  //
  // 2. Now, for each of the codeps in rows
  //    return an Array of values for only
  //    it's peers
  //
  conames.forEach(function (name) {
    row = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    Object.keys(rows[name]).forEach(function (coname) {
      var index = names.indexOf(coname);
      if (index !== -1) {
        row[index] = rows[name][coname].count;
      }
    });

    matrix.push(row.slice());
  });


console.dir(matrix);
  //
  // ### Dump the whole JSON
  //
  fs.writeFile(
    'codeps.json',
    JSON.stringify({
      name: 'winston',
      codeps: codeps,
      rows: rows
    }, null, 2),
    'utf8',
    console.log
  );

  //
  // But also dump the matrix
  //

});