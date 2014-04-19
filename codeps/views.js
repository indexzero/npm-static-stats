views.latestCodependencies = { map: function (doc) {
  if (!doc || doc.deprecated) return;
  if (doc._id.match(/^npm-test-.+$/) &&
      doc.maintainers &&
      doc.maintainers[0].name === 'isaacs') {
    return;
  }

  var l = doc['dist-tags'] && doc['dist-tags'].latest
  if (!l) return
  l = doc.versions && doc.versions[l]
  if (!l) return
  var desc = doc.description || l.description || ''
  var d = l.dependencies
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
}, reduce: '_sum' };