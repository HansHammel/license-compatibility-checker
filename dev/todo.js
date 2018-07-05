var parse = require('spdx-expression-parse');
var equal = require('deep-equal');
require('spdx-license-ids').forEach(function (id) {
  equal(parse(id), {license: id})
});

var correct = require('spdx-correct');
correct('mit');

var valid = require('validate-npm-package-license');

var PJV=require('package-json-validator').PJV;
PJV.validate(data, spec, options);

var pj = "./package.json";

// Takes the JavaScript object and writes it to the package.json file.
var packagejsonTransform = function(next) {
    var fs = require("fs-extra");
    var packagesrc = require("./src/package.js");
    fs.writeJSONFile(pj, packagesrc, function(err){
        if (err) {
            next(err);
        }
        else {
            next(null);
        }
    });
};



// validate the packagejson file.
var packagejsonValidate = function(next) {
    var PJV = require('package-json-validator').PJV;
    var packagejson = require(pj);
    var validation = PJV.validate(JSON.stringify(packagejson), "npm", {
        warnings: true,
        recommendations: true,
    });

    if (validation.warnings || validation.recommendations) {
        next(validation);
    }
    else {
        next();
    }
};



var main = function() {
    var async = require("async");
    async.series([
        packagejsonTransform,
        packagejsonValidate,
    ], function(err) {
        if (err) {
            console.error("Sorry, there was an error or warning:", "\n", err);
        }
        else {
            console.log("package.json written successfully.");
        }
    });
};



if (require.main === module) {
    main();
}
else {
    console.error("This module will not do anything if you require() it.");
}