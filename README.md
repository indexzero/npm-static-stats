# comp-stat

Generate comprehensive statistical static analysis graphs.

### usage

```
$ bin/comp-stat -r http://localhost:5984/registry2 -p async
pipeline | 0815
pipeline | 1
pipeline | 2csv
analyze  | 2csv
results  | 2csv {"calls":{"forEach":1,"detectSeries":1,"map":1}}
pipeline | 2lemetry
analyze  | 1
results  | 1 {"calls":{}}
pipeline | a2p3
error    | 0815 ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/0815/0815-0.1.9/package/lib'
pipeline | a2vh
analyze  | a2p3
results  | a2p3 {"calls":{"parallel":1}}
pipeline | abac
error    | a2vh ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/a2vh/a2vh-0.0.2/package/lib'
pipeline | abc-generator
analyze  | 2lemetry
results  | 2lemetry {"calls":{}}
pipeline | abc-web
analyze  | abc-generator
results  | abc-generator {"calls":{}}
pipeline | abc-web-core
analyze  | abac
results  | abac {"calls":{"each":1}}
pipeline | abstract
analyze  | abc-web
results  | abc-web {"calls":{}}
pipeline | acetic
analyze  | acetic
results  | acetic {"calls":{"each":2,"eachSeries":1,"waterfall":1}}
pipeline | acf
analyze  | abstract
results  | abstract {"calls":{}}
pipeline | acidpm
analyze  | acidpm
results  | acidpm {"calls":{}}
pipeline | acl
error    | acf ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/acf/acf-0.2.1/package/lib'
pipeline | acmcc-node-spritesheet
analyze  | acl
results  | acl {"calls":{"series":1,"forEach":1}}
pipeline | aconvert
analyze  | acmcc-node-spritesheet
results  | acmcc-node-spritesheet {"calls":{}}
pipeline | acre
error    | aconvert ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/aconvert/aconvert-0.0.2/package/lib'
pipeline | actionhero
analyze  | acre
results  | acre {"calls":{}}
pipeline | activator
analyze  | activator
results  | activator {"calls":{"waterfall":4,"each":1}}
pipeline | active-sender
error    | actionhero ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/actionhero/actionhero-8.0.8/package/lib'
pipeline | active-user
analyze  | active-user
results  | active-user {"calls":{"map":1}}
pipeline | activedirectory
error    | active-sender ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/active-sender/active-sender-0.0.9/package/lib'
pipeline | activity-engine
analyze  | activity-engine
results  | activity-engine {"calls":{}}
pipeline | acute
analyze  | activedirectory
results  | activedirectory {"calls":{"forEach":2}}
pipeline | adamvr-geoip-lite
analyze  | acute
results  | acute {"calls":{"parallel":2,"applyEachSeries":1}}
pipeline | adbkit-logcat
analyze  | adbkit-logcat
results  | adbkit-logcat {"calls":{}}
pipeline | adbkit-monkey
analyze  | adbkit-monkey
results  | adbkit-monkey {"calls":{}}
pipeline | adc-pi-gpio
error    | adc-pi-gpio ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/adc-pi-gpio/adc-pi-gpio-0.0.2/package/lib'
pipeline | addepar-connect-less
analyze  | addepar-connect-less
results  | addepar-connect-less {"calls":{"forEach":1}}
pipeline | admin
analyze  | admin
results  | admin {"calls":{}}
pipeline | admin-forms2
error    | admin-forms2 EACCES, open '/Users/charlie/Git/indexzero/npm-pipeline/tmp/admin-forms2/admin-forms2-0.0.1/package/.idea/.name'
pipeline | admin-with-forms
error    | admin-with-forms ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/admin-with-forms/admin-with-forms-0.0.58/package/lib'
pipeline | adroit
analyze  | adroit
results  | adroit {"calls":{"waterfall":1}}
pipeline | advtxt
analyze  | advtxt
results  | advtxt {"calls":{"waterfall":1}}
pipeline | ae86
analyze  | ae86
results  | ae86 {"calls":{"parallel":5,"series":1}}
pipeline | aerobatic-yoke
error    | aerobatic-yoke ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/aerobatic-yoke/aerobatic-yoke-0.2.3/package/lib'
pipeline | agile-workflow
error    | agile-workflow ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/agile-workflow/agile-workflow-0.0.1/package/lib'
pipeline | agileworkflow
error    | agileworkflow ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/agileworkflow/agileworkflow-0.0.4/package/lib'
pipeline | ags-download
analyze  | ags-download
results  | ags-download {"calls":{}}
pipeline | ahcli
analyze  | ahcli
results  | ahcli {"calls":{"until":2}}
pipeline | aida
analyze  | aida
results  | aida {"calls":{"forEachSeries":2}}
pipeline | aiml
analyze  | aiml
results  | aiml {"calls":{}}
pipeline | air-drop
analyze  | air-drop
results  | air-drop {"calls":{"map":1}}
pipeline | airfair
error    | airfair ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/airfair/airfair-0.0.1/package/lib'
pipeline | airtunes
analyze  | abc-web-core
results  | abc-web-core {"calls":{"map":1}}
pipeline | aj-klein-capstone-project
analyze  | aj-klein-capstone-project
results  | aj-klein-capstone-project {"calls":{}}
pipeline | ajector
analyze  | airtunes
results  | airtunes {"calls":{"forEach":1,"whilst":1}}
pipeline | ajs-xgettext
analyze  | ajector
results  | ajector {"calls":{"map":1}}
pipeline | akamai
analyze  | ajs-xgettext
results  | ajs-xgettext {"calls":{}}
pipeline | akashacms
analyze  | akamai
results  | akamai {"calls":{"mapSeries":1}}
pipeline | akashacms-booknav
error    | akashacms-booknav ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/akashacms-booknav/akashacms-booknav-0.1.6/package/lib'
pipeline | akashacms-linkshare
analyze  | akashacms
results  | akashacms {"calls":{}}
pipeline | akashacms-skimlinks
error    | akashacms-linkshare ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/akashacms-linkshare/akashacms-linkshare-0.0.6/package/lib'
pipeline | ake
error    | akashacms-skimlinks ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/akashacms-skimlinks/akashacms-skimlinks-0.0.4/package/lib'
pipeline | alajs
analyze  | ake
results  | ake {"calls":{}}
pipeline | alamid
analyze  | alajs
results  | alajs {"calls":{"map":1}}
pipeline | albot
analyze  | albot
results  | albot {"calls":{}}
pipeline | albumkit
error    | albumkit ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/albumkit/albumkit-0.0.0/package/lib'
pipeline | alchemymvc
analyze  | alamid
results  | alamid {"calls":{"forEach":1,"series":1}}
pipeline | alinex-make
analyze  | alchemymvc
results  | alchemymvc {"calls":{"series":2,"waterfall":1,"parallel":6}}
pipeline | aliyun
analyze  | alinex-make
results  | alinex-make {"calls":{}}
pipeline | alopex-tools-pages
error    | alopex-tools-pages ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/alopex-tools-pages/alopex-tools-pages-0.1.3/package/lib'
pipeline | alpaca
analyze  | alpaca
results  | alpaca {"calls":{"waterfall":1}}
pipeline | amazon-products
analyze  | amazon-products
results  | amazon-products {"calls":{}}
pipeline | amazon-queue
error    | amazon-queue ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/amazon-queue/amazon-queue-0.1.2/package/lib'
pipeline | amazon-reviews
analyze  | amazon-reviews
results  | amazon-reviews {"calls":{}}
pipeline | amd-args
error    | amd-args ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/amd-args/amd-args-0.0.1/package/lib'
pipeline | amd-builder
analyze  | amd-builder
results  | amd-builder {"calls":{"waterfall":13,"forEach":4,"series":1}}
pipeline | amd-optimize
analyze  | amd-optimize
results  | amd-optimize {"calls":{}}
pipeline | amdee
error    | amdee ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/amdee/amdee-0.5.5/package/lib'
pipeline | amdify
analyze  | amdify
results  | amdify {"calls":{"forEach":5,"map":3,"eachSeries":2}}
pipeline | amerigo
error    | amerigo ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/amerigo/amerigo-0.2.2/package/lib'
pipeline | amqp-coffee
error    | amqp-coffee ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/amqp-coffee/amqp-coffee-0.1.13/package/lib'
pipeline | amqp-dsl
error    | amqp-dsl ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/amqp-dsl/amqp-dsl-1.0.6/package/lib'
pipeline | amt
analyze  | amt
results  | amt {"calls":{"waterfall":1}}
pipeline | ancestor
error    | ancestor ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/ancestor/ancestor-0.1.3/package/lib'
pipeline | anchor
analyze  | anchor
results  | anchor {"calls":{}}
pipeline | anchor-validator
analyze  | anchor-validator
results  | anchor-validator {"calls":{}}
pipeline | android-udev
analyze  | android-udev
results  | android-udev {"calls":{}}
pipeline | angelscripts-nodeapps
error    | angelscripts-nodeapps ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/angelscripts-nodeapps/angelscripts-nodeapps-0.0.4/package/lib'
pipeline | angular-project
error    | angular-project ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/angular-project/angular-project-0.0.7/package/lib'
pipeline | angular-server
analyze  | angular-server
results  | angular-server {"calls":{"series":1,"parallel":1}}
pipeline | anidb
error    | anidb ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/anidb/anidb-0.0.2/package/lib'
pipeline | ann
analyze  | ann
results  | ann {"calls":{}}
pipeline | annotext
error    | annotext ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/annotext/annotext-0.17.0/package/lib'
pipeline | another-circuit-breaker
analyze  | another-circuit-breaker
results  | another-circuit-breaker {"calls":{}}
pipeline | ansi-logview
error    | ansi-logview ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/ansi-logview/ansi-logview-0.0.1/package/lib'
pipeline | anthpack
analyze  | aliyun
results  | aliyun {"calls":{}}
pipeline | antifreeze
error    | antifreeze ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/antifreeze/antifreeze-0.4.0-dev.4/package/lib'
pipeline | antr
analyze  | antr
results  | antr {"calls":{"eachLimit":1,"map":1,"filter":1}}
pipeline | anvil
analyze  | anvil
results  | anvil {"calls":{"series":1}}
pipeline | anyfetch-file-hydrater
analyze  | anyfetch-file-hydrater
results  | anyfetch-file-hydrater {"calls":{"waterfall":1}}
pipeline | anyfetch-provider
analyze  | anyfetch-provider
results  | anyfetch-provider {"calls":{"waterfall":2,"queue":1,"parallel":1}}
pipeline | ape
analyze  | ape
results  | ape {"calls":{}}
pipeline | ape-utils
error    | ape-utils ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/ape-utils/ape-utils-0.0.4/package/lib'
pipeline | apeman
analyze  | apeman
results  | apeman {"calls":{"eachSeries":2,"waterfall":3}}
pipeline | api_botnik_com
analyze  | api_botnik_com
results  | api_botnik_com {"calls":{"forEachSeries":1}}
pipeline | api-client-limiter
error    | api-client-limiter ENOENT, readdir '/Users/charlie/Git/indexzero/npm-pipeline/tmp/api-client-limiter/api-client-limiter-0.1.0/package/lib'
pipeline | api-facade
analyze  | api-facade
results  | api-facade {"calls":{}}
analyze  | anthpack
results  | anthpack {"calls":{"each":4,"eachSeries":3,"waterfall":5,"parallel":1}}
analyze  | adamvr-geoip-lite
results  | adamvr-geoip-lite {"calls":{"series":7}}
null
{ '1': { calls: {} },
  '2csv': { calls: { forEach: 1, detectSeries: 1, map: 1 } },
  a2p3: { calls: { parallel: 1 } },
  '2lemetry': { calls: {} },
  'abc-generator': { calls: {} },
  abac: { calls: { each: 1 } },
  'abc-web': { calls: {} },
  acetic: { calls: { each: 2, eachSeries: 1, waterfall: 1 } },
  abstract: { calls: {} },
  acidpm: { calls: {} },
  acl: { calls: { series: 1, forEach: 1 } },
  'acmcc-node-spritesheet': { calls: {} },
  acre: { calls: {} },
  activator: { calls: { waterfall: 4, each: 1 } },
  'active-user': { calls: { map: 1 } },
  'activity-engine': { calls: {} },
  activedirectory: { calls: { forEach: 2 } },
  acute: { calls: { parallel: 2, applyEachSeries: 1 } },
  'adbkit-logcat': { calls: {} },
  'adbkit-monkey': { calls: {} },
  'addepar-connect-less': { calls: { forEach: 1 } },
  admin: { calls: {} },
  adroit: { calls: { waterfall: 1 } },
  advtxt: { calls: { waterfall: 1 } },
  ae86: { calls: { parallel: 5, series: 1 } },
  'ags-download': { calls: {} },
  ahcli: { calls: { until: 2 } },
  aida: { calls: { forEachSeries: 2 } },
  aiml: { calls: {} },
  'air-drop': { calls: { map: 1 } },
  'abc-web-core': { calls: { map: 1 } },
  'aj-klein-capstone-project': { calls: {} },
  airtunes: { calls: { forEach: 1, whilst: 1 } },
  ajector: { calls: { map: 1 } },
  'ajs-xgettext': { calls: {} },
  akamai: { calls: { mapSeries: 1 } },
  akashacms: { calls: {} },
  ake: { calls: {} },
  alajs: { calls: { map: 1 } },
  albot: { calls: {} },
  alamid: { calls: { forEach: 1, series: 1 } },
  alchemymvc: { calls: { series: 2, waterfall: 1, parallel: 6 } },
  'alinex-make': { calls: {} },
  alpaca: { calls: { waterfall: 1 } },
  'amazon-products': { calls: {} },
  'amazon-reviews': { calls: {} },
  'amd-builder': { calls: { waterfall: 13, forEach: 4, series: 1 } },
  'amd-optimize': { calls: {} },
  amdify: { calls: { forEach: 5, map: 3, eachSeries: 2 } },
  amt: { calls: { waterfall: 1 } },
  anchor: { calls: {} },
  'anchor-validator': { calls: {} },
  'android-udev': { calls: {} },
  'angular-server': { calls: { series: 1, parallel: 1 } },
  ann: { calls: {} },
  'another-circuit-breaker': { calls: {} },
  aliyun: { calls: {} },
  antr: { calls: { eachLimit: 1, map: 1, filter: 1 } },
  anvil: { calls: { series: 1 } },
  'anyfetch-file-hydrater': { calls: { waterfall: 1 } },
  'anyfetch-provider': { calls: { waterfall: 2, queue: 1, parallel: 1 } },
  ape: { calls: {} },
  apeman: { calls: { eachSeries: 2, waterfall: 3 } },
  api_botnik_com: { calls: { forEachSeries: 1 } },
  'api-facade': { calls: {} },
  anthpack: { calls: { each: 4, eachSeries: 3, waterfall: 5, parallel: 1 } },
  'adamvr-geoip-lite': { calls: { series: 7 } } }
```