/*
 * inspect.js: Object inspection functions for module stats
 *
 * (C) 2014 Charlie Robbins
 *
 */

var Table = require('cli-table');

var inspect = module.exports;

inspect.codependencies = inspect.codeps = function (context) {
  var table   = new Table(),
      name    = context.name,
      lattice = context.lattice,
      names   = context.names,
      codeps  = context.codeps,
      matrix  = context.matrix,
      display;

  //
  // ### function dump (name, latt)
  // Dumps debug values for the lattice
  //
  function dumpLattice(name, latt) {
    Object.keys(latt).forEach(function (coname) {
      if (coname === 'total') { return; }
      console.log('%s | %d %s %s', name, latt[coname].count, coname, latt[coname].relative)
    });
  }

  //
  // Display the information for the lattice and the
  // sublattices (i.e. co-*dependencies).
  //
  dumpLattice(name, lattice);
  names.forEach(function (coname) {
    console.log();
    dumpLattice(coname, codeps[coname]);
  });

  //
  // Copy the matrix so we can modify it for
  // display.
  //
  display = matrix.reduce(function (copy, row) {
    copy.push(row.slice());
    return copy;
  }, []);

  //
  // Modify the matrix as follows and then display it
  // 1. Truncate to 6 significant figures.
  // 2. Add the row headers.
  // 3. Add the column headers.
  //
  display.forEach(function (row, i) {
    for (var j = 0; j < row.length; j++) {
      row[j] = row[j].toFixed(6);
    }
    row.unshift(names[i]);
  });

  display.unshift(names.slice())
  display[0].unshift('');
  table.push.apply(table, display);
  console.log(table.toString());

  //
  // This could be useful later.
  //
  // function logRatio(x, y) {
  //   console.log(
  //     '(%s, %s) %s/%s = %s/%s = %s',
  //     x, y,
  //     display[0][x], display[y][0],
  //     display[x][y], display[y][x],
  //     (display[x][y]/display[y][x]).toFixed(2)
  //   );
  // }
  //
  // for (var i = 1; i < display.length; i++) {
  //   for (var j = 1; j < display.length; j++) {
  //     if (i !== j) {
  //       logRatio(i,j);
  //       logRatio(j,i);
  //       console.log();
  //     }
  //   }
  // }
};
