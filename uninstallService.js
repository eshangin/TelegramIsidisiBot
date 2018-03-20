const path = require('path');
require('dotenv').config({path: './.env.txt'});
var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name: path.join(__dirname, process.env.WIN_SERVICE_NAME),
  script: process.env.WIN_SERVICE_START_SCRIPT
});

svc.uninstall();
