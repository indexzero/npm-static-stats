# comp-stat

Generate comprehensive statistical static analysis graphs based on npm packages.

## Usage

There are two distinct ways to use `npm-static-stats`:

### 1. Use it programmatically

``` js
var statStat = require('npm-static-stats');

statStat.summary({
  registry: 'https://registry.nodejitsu.com',
  package:  'winston'
}, function (err, res) {
  //
  // The returned `res` will be the set of all
  // methods counted for the specified module
  //
});
```

### 2. Use from the command line

```
npm install npm-static-stats -g
npm-static-stats -r http://localhost:5984/registry -p winston
Analyzing 699 modules
pipeline | 1 | 2lemetry
pipeline | 2 | ab-tool
pipeline | 3 | ace-log
pipeline | 4 | actionhero
pipeline | 5 | activepush
analyze  | 3 | ace-log
results  | 3 | ace-log {"new":{"Logger":2}}
...
...
```

##### License: Apache 2
##### Author: [Charlie Robbins](https://github.com/indexzero)