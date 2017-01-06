#!/usr/bin/env node
var path=require('path');
var lcc = require('../');
if (!module.parent) {
  lcc.check(process.argv[2] || path.join(process.cwd(),'package.json'), process.argv[3] || path.join(process.cwd(),"node_modules"), function(err,passed,output){
	  if (err) { 
	    console.log(err); 
		process.exit(1)
	  }
	  else if (passed)
	  {
		console.log(output);
	  } else
	  {
	    console.log(output);
	  	process.exit(1); 
      }
  }); 
} 
else
module.exports.check = lcc.check;