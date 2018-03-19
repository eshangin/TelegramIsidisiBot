require('dotenv').config({path: './.env.txt'});
var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name: process.env.WIN_SERVICE_NAME,
  script: process.env.WIN_SERVICE_START_SCRIPT
});

svc.uninstall();
