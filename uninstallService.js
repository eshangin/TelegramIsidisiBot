const path = require('path');
require('dotenv').config({path: path.join(__dirname, '.env.txt')});
var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name: path.join(process.env.WIN_SERVISE_APP_PATH, process.env.WIN_SERVICE_NAME),
  script: process.env.WIN_SERVICE_START_SCRIPT
});

svc.uninstall();
