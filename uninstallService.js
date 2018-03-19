var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name: 'IsidisiService',
  script: 'index.js'
});

svc.uninstall();
