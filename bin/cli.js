#!/usr/bin/env node

var path=require('path');
var updateNotifier = require('update-notifier');
var pkg = require('../package.json');
var lcc = require('../lib');

if (!module.parent) {
  lcc.check(process.argv[2] || path.join(process.cwd(),'package.json'), process.argv[3] || path.join(process.cwd(),"node_modules"), function(err,passed,output){
	  if (err) { 
	    console.log(err); 
		updateNotifier({
			pkg
		}).notify();
		process.exit(1);
	  }
	  else if (passed)
	  {
		console.log(output);
	  	updateNotifier({
			pkg
		}).notify();		
	  } else
	  {
	    console.log(output);
	  	updateNotifier({
			pkg
		}).notify();		
	  	process.exit(1); 
      }
  }); 
} 
else
module.exports.check = lcc.check;