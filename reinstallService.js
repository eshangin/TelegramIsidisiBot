require('dotenv').config({path: './.env.txt'});
var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name: process.env.WIN_SERVICE_NAME,
  description: process.env.WIN_SERVICE_DESCR,
  script: process.env.WIN_SERVICE_START_SCRIPT,
  env: [{
    name: "BOT_TOKEN",
    value: process.env.BOT_TOKEN
  }]
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

// Install after uninstall. As a result the service will be reinstalled.
svc.on('uninstall',function(){
  svc.install();
});

if (svc.exists) {
  svc.uninstall();
} else {
  svc.install();
}
