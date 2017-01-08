/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @module license-compatibility-checker */

/* 
for license infos see
http://www.ifross.org/en/license-center
and
https://spdx.org/
*/

var licenseData = require('./licenses.json');
var colors = require('colors/safe');
var path=require('path');
var fs = require("fs");
var os = require("os");

/** @private */
var licenseTypes = {
    'publicDomain': 'Public Domain',
    'permissive': 'Permissive',
    'weaklyProtective': 'Weakly Protective',
    'stronglyProtectivee': 'Strongly Protective',
    'networkProtective': 'Network Protective',
    'unknown': 'Unknown',
    'unlicensed': 'Unlicensed'
};

//var correct = require('spdx-correct');

/** @private */
/*
var correctedLicense = function(license) {
    return license ? correct(license) : licenseTypes.unlicensed;
};
*/

/** @private */
var license_type = function(license) {
    //license = license ? license.replace('+', '') : licenseTypes.unlicensed;
    //gives false positives try MMIT
    //license = correctedLicense(license);
    if (!license) {
        //console.log('NO license found:', license);
        return licenseTypes.unlicensed;
    } else if (licenseData[licenseTypes.publicDomain].indexOf(license) >= 0)
        return licenseTypes.publicDomain;
    else if (licenseData[licenseTypes.permissive].indexOf(license) >= 0)
        return licenseTypes.permissive;
    else if (licenseData[licenseTypes.weaklyProtective].indexOf(license) >= 0)
        return licenseTypes.weaklyProtective;
    else if (licenseData[licenseTypes.stronglyProtectivee].indexOf(license) >= 0)
        return licenseTypes.stronglyProtectivee;
    else if (licenseData[licenseTypes.networkProtective].indexOf(license) >= 0)
        return licenseTypes.networkProtective;
    else {
        //console.log('Unknown license type:', license);
        return licenseTypes.unknown;
    }
};

/** @private */
var forward_compatiblity = function(pkgLicenseType, moduleLicenseType) {
    switch (moduleLicenseType) {
		case licenseTypes.unlicensed:
			return false;
		case licenseTypes.unknown:
			return false;
        case licenseTypes.publicDomain:
            return [licenseTypes.unlicensed, licenseTypes.unknown, licenseTypes.publicDomain, licenseTypes.permissive, licenseTypes.weaklyProtective, licenseTypes.stronglyProtectivee, licenseTypes.networkProtective].indexOf(pkgLicenseType)  >= 0;
        case licenseTypes.permissive:
            return [licenseTypes.unlicensed, licenseTypes.permissive, licenseTypes.weaklyProtective, licenseTypes.stronglyProtectivee, licenseTypes.networkProtective].indexOf(pkgLicenseType) >= 0;
        case licenseTypes.weaklyProtective:
            return [licenseTypes.unlicensed, licenseTypes.weaklyProtective, licenseTypes.stronglyProtectivee, licenseTypes.networkProtective].indexOf(pkgLicenseType) >= 0;
        case licenseTypes.stronglyProtectivee:
            return [licenseTypes.unlicensed, licenseTypes.stronglyProtectivee, licenseTypes.networkProtective].indexOf(pkgLicenseType) >= 0;
        case licenseTypes.networkProtective:
            return [licenseTypes.unlicensed, licenseTypes.networkProtective].indexOf(pkgLicenseType) >= 0;
        default:
            //console.log('Unknown license',module_license,'('+moduleLicenseType+')');
            return false;
    }
};

/*
var https = require('https');

function getLicenses(callback) {
    return https.get({
        host: 'spdx.org',
        path: '/licenses/licenses.json'
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            callback(parsed.licenses);
        });
    });
}
*/

/** @private */
/*
function compareLicenses(to) {
    getLicenses(function(licenses) {
        licenses.forEach(function(element, index, array) {
            if (!element.isDeprecatedLicenseId)
                console.log(element.licenseId + ' => ' + element.name, ' compatible: ', forward_compatiblity(to, element.licenseId));
            else
                console.log('DEPRECATED!', element.licenseId + ' -> ' + element.name, ' compatible:', forward_compatiblity(to, element.licenseId));
        });
    });
}
*/
//compareLicenses(pkg.license);

/**
 * Callback for license check.
 *
 * @callback licenseCheckCallback
 * @param {String} err - Information about the error.
 * @param {Boolean} passed - True if there were no license issues, otherwise false.
 * @param {string} output - Output to be printed to Console (including colors).
 */

/**
 * @public 
 * @function check
 * @description Check for licenses issues of the given project.json compared (flat) to a folder of node_modules
 * @param {string} pathOfPackageJson - The path of the package.json to check against
 * @param {string} pathOfModules - The path of the node modules to check against e.g. ./node_modules
 * @param {licenseCheckCallback} cb - Callback for license check.
 * @example
 * var lcc = require('license-compatibility-checker');
 * var path = require('path');
 * lcc.check(path.join(process.cwd(),'package.json'), path.join(process.cwd(),"node_modules"), function(err, passed, output){
 *   if (err) console.log(err);
 *   else if (passed)
 *   {
 * 	   //No license issues found
 * 	   console.log(output);
 *   } else
 *   {
 * 	   //License issues found
 * 	   console.log(output);
 * 	   //process.exit(1);
 * 	   //or
 * 	   //throw new Error('License issues found');
 *   }
 * });
 */
function check(pathOfPackageJson,pathOfModules, cb) {
	var incompat = false;
	var pkg = require(pathOfPackageJson);
	var output = [];
	var noLicenseStr = colors.red('No license');
	var pkgLicense = pkg.license ? ((typeof pkg.license === 'string' || pkg.license instanceof String) ? pkg.license : pkg.license.type || pkgLicense) : pkgLicense;
	pkgLicense = pkgLicense ? pkgLicense : (pkg.licenses && pkg.licenses[0] && pkg.licenses[0].type ? ((typeof pkg.licenses[0].type === 'string' || pkg.licenses[0].type instanceof String) ? pkg.licenses[0].type : pkg.licenses.type || pkgLicense) : pkgLicense);
	var pkgLicenseType = license_type(pkgLicense);
	output.push(colors.yellow('Checking', colors.blue(pkgLicense ? pkgLicense : noLicenseStr), '(' + pkgLicenseType + ')', 'of', pkg.name + '@' + pkg.version, os.EOL, 'in', colors.blue(path.resolve(pathOfPackageJson)), os.EOL, 'against', colors.blue(path.resolve(pathOfModules)) + ':'));
	output.push('');
	var pkgCompatiblityString;
	if (pkgLicenseType == licenseTypes.unknown || pkgLicenseType == licenseTypes.unlicensed) {
		incompat = true;
		pkgCompatiblityString = 'possibly incompatible';
	} else {
		pkgCompatiblityString = 'incompatible';
	}

	fs.readdir(pathOfModules, function (err, dirs) {
		if (err) {
			console.log(err);
			cb(err, null, null);
		}
		var progress = 0;
		var total = dirs.length;

		dirs.forEach(function (dir) {
			if (dir.indexOf(".") !== 0) {
				var packageJsonFile = path.join(pathOfModules, dir, "package.json");
				fs.access(packageJsonFile, function (err) {
					if (err) {
						console.log(err);
						progress++;
						if (progress == total) {
							if (incompat) {
								output.push('');
								output.push(colors.red('License issues found'));
								output.push('');
								//console.log(output.join(os.EOL));
								cb(null, false, output.join(os.EOL))
							}
							else {
								output.push('');
								output.push(colors.green('No license issues found'));
								output.push('');
								//console.log(output.join(os.EOL));
								cb(null, true, output.join(os.EOL));
							}
						}
					} else {
						fs.readFile(packageJsonFile, function (err, data) {
							if (err) {
								console.log(err);
								progress++;
								if (progress == total) {
									if (incompat) {
										output.push('');
										output.push(colors.red('License issues found'));
										output.push('');
										//console.log(output.join(os.EOL));
										cb(null, false, output.join(os.EOL))
									}
									else {
										output.push('');
										output.push(colors.green('No license issues found'));
										output.push('');
										//console.log(output.join(os.EOL));
										cb(null, true, output.join(os.EOL));
									}
								}

							} else {
								var modulePkg = JSON.parse(data);
								var moduleLicense = modulePkg.license ? ((typeof modulePkg.license === 'string' || modulePkg.license instanceof String) ? modulePkg.license : modulePkg.license.type || moduleLicense) : moduleLicense;
								moduleLicense = moduleLicense ? moduleLicense : (modulePkg.licenses && modulePkg.licenses[0] && modulePkg.licenses[0].type ? ((typeof modulePkg.licenses[0].type === 'string' || modulePkg.licenses[0].type instanceof String) ? modulePkg.licenses[0].type : pkg.licenses.type || moduleLicense) : moduleLicense);
								var moduleLicenseType = license_type(moduleLicense);
								if (moduleLicenseType == licenseTypes.unknown || moduleLicenseType == licenseTypes.unlicensed) {
									incompat = true;
									output.push(modulePkg.name + '@' + modulePkg.version + ' ' + colors.red(moduleLicense ? moduleLicense : noLicenseStr) + ' ' + colors.yellow('(' + moduleLicenseType + ') - ' + colors.red('possibly incompatible') + ' with ' + colors.blue(pkgLicense ? pkgLicense : noLicenseStr) + ' (' + pkgLicenseType + ')'));
								}
								else if (!forward_compatiblity(pkgLicenseType, moduleLicenseType)) {
									incompat = true;
									output.push(modulePkg.name + '@' + modulePkg.version + ' ' + colors.red(moduleLicense) + ' ' + colors.yellow('(' + moduleLicenseType + ') - ' + colors.red(pkgCompatiblityString) + ' with ' + colors.blue(pkgLicense ? pkgLicense : noLicenseStr) + ' (' + pkgLicenseType + ')'));
								}
								else
									output.push(modulePkg.name + '@' + modulePkg.version + ' ' + colors.green(moduleLicense) + ' ' + colors.yellow('(' + moduleLicenseType + ') -', colors.green('compatible') + ' with ' + colors.blue(pkgLicense ? pkgLicense : noLicenseStr) + ' (' + pkgLicenseType + ')'));
								progress++;
								if (progress == total) {
									if (incompat) {
										output.push('');
										output.push(colors.red('License issues found'));
										output.push('');
										//console.log(output.join(os.EOL));
										cb(null, false, output.join(os.EOL))
									}
									else {
										output.push('');
										output.push(colors.green('No license issues found'));
										output.push('');
										//console.log(output.join(os.EOL));
										cb(null, true, output.join(os.EOL));
									}
								}
							}
						});
					}
				});
			} else {
				progress++;
				if (progress == total) {
					if (incompat) {
						output.push('');
						output.push(colors.red('License issues found'));
						output.push('');
						//console.log(output.join(os.EOL));
						cb(null, false, output.join(os.EOL))
					}
					else {
						output.push('');
						output.push(colors.green('No license issues found'));
						output.push('');
						//console.log(output.join(os.EOL));
						cb(null, true, output.join(os.EOL));
					}
				}
			}
		});
	});
}

/* 
 * @class LicenseCheck
 * @type {Object}
 * @property {Error} err - the Error object if any.
 * @property {Boolean} passed - ture if there were no license issues, flase otherwise.
 * @property {string} output - The resulting output (including colors) to be printed with console.log.
 * @param {Error} err - the Error object.
 * @param {Boolean} passed - ture if there were no license issues, flase otherwise.
 * @param {string} output - The resulting output (including colors) to be printed with console.log.
 */
/*
function LicenseCheck(err, passed, output) {
  return {
        err: err,
		passed: passed,
		output: output
    };
}
*/


/** 
 * @typedef licenseCheck
 * @type {Object}
 * @property {Error} err - the Error object if any.
 * @property {Boolean} passed - ture if there were no license issues, flase otherwise.
 * @property {string} output - The resulting output (including colors) to be printed with console.log.
*/

/**
 * @public 
 * @function checkSync
 * @description Check for licenses issues of the given project.json compared (flat) to a folder of node_modules. Synchronous version.
 * @param  {string} pathOfPackageJson - The path of the package.json to check against
 * @param  {string} pathOfModules - The path of the node modules to check against e.g. ./node_modules
 * @returns {licenseCheck} Returns a custom Object
 * @example
 * var lcc = require('license-compatibility-checker');
 * var path = require('path');
 * var output = lcc.checkSync(path.join(process.cwd(),'package.json'), path.join(process.cwd(),"node_modules"));
 * if (output) console.log(output);
 */
function checkSync(pathOfPackageJson, pathOfModules) {
    var x = function(err, passed, output){
	  //return new LicenseCheck(err, passed, output);
	  return {
			err: err,
			passed: passed,
			output: output
		};
	};
	check(pathOfPackageJson, pathOfModules, x);
	return x;
}

module.exports = {
    /* Check for licenses issues of the given project.json compared (flat) to a folder of node_modules. */
	check: check,
    /* Check for licenses issues of the given project.json compared (flat) to a folder of node_modules. Synchronous version. */
	checkSync: checkSync
};


