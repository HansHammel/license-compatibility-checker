#!/usr/bin/env node

var licenseData = require('./licenses.json');
var colors = require('colors/safe');
var path=require('path');
var fs = require("fs");
var os = require("os");

var licenseTypes = {
    'public_domain': 'Public Domain',
    'permissive': 'Permissive',
    'weak_copyleft': 'Weakly Protective',
    'strong_copyleft': 'Strongly Protective',
    'network_copyleft': 'Network Protective',
    'unknown': 'Unknown',
    'unlicensed': 'Unlicensed'
};

//var correct = require('spdx-correct');

var correctedLicense = function(license) {
    return license ? correct(license) : licenseTypes.unlicensed;
}

var license_type = function(license) {
    //license = license ? license.replace('+', '') : licenseTypes.unlicensed;
    //gives false positives try MMIT
    //license = correctedLicense(license);
    if (!license) {
        //console.log('NO license found:', license);
        return licenseTypes.unlicensed;
    } else if (licenseData[licenseTypes.public_domain].indexOf(license) >= 0)
        return licenseTypes.public_domain;
    else if (licenseData[licenseTypes.permissive].indexOf(license) >= 0)
        return licenseTypes.permissive;
    else if (licenseData[licenseTypes.weak_copyleft].indexOf(license) >= 0)
        return licenseTypes.weak_copyleft;
    else if (licenseData[licenseTypes.strong_copyleft].indexOf(license) >= 0)
        return licenseTypes.strong_copyleft;
    else if (licenseData[licenseTypes.network_copyleft].indexOf(license) >= 0)
        return licenseTypes.network_copyleft;
    else {
        //console.log('Unknown license type:', license);
        return licenseTypes.unknown;
    }
};

var forward_compatiblity = function(pkgLicenseType, moduleLicenseType) {
    switch (moduleLicenseType) {
		case licenseTypes.unlicensed:
			return false;
		case licenseTypes.unknown:
			return false;
        case licenseTypes.public_domain:
            return [licenseTypes.unlicensed, licenseTypes.unknown, licenseTypes.public_domain, licenseTypes.permissive, licenseTypes.weak_copyleft, licenseTypes.copyleft, licenseTypes.strong_copyleft, licenseTypes.network_copyleft].indexOf(pkgLicenseType)  >= 0;
        case licenseTypes.permissive:
            return [licenseTypes.unlicensed, licenseTypes.permissive, licenseTypes.weak_copyleft, licenseTypes.copyleft, licenseTypes.strong_copyleft, licenseTypes.network_copyleft].indexOf(pkgLicenseType) >= 0;
        case licenseTypes.weak_copyleft:
            return [licenseTypes.unlicensed, licenseTypes.weak_copyleft, licenseTypes.copyleft, licenseTypes.strong_copyleft, licenseTypes.network_copyleft].indexOf(pkgLicenseType) >= 0;
        case licenseTypes.strong_copyleft:
            return [licenseTypes.unlicensed, licenseTypes.strong_copyleft, licenseTypes.network_copyleft].indexOf(pkgLicenseType) >= 0;
        case licenseTypes.network_copyleft:
            return [licenseTypes.unlicensed, licenseTypes.network_copyleft].indexOf(pkgLicenseType) >= 0;
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



function checkFini(){
}

/**
 * Callback for license check.
 *
 * @callback licenseCheckCallback
 * @param {String} err - Information about the error.
 * @param {Boolean} passed - True if there were no license issues, otherwise false.
 * @param {String} output - Output to be printed to Console (including colors).
 */

/**
 * Check for licenses issues of the given project.json compared (flat) to a folder of node_modules
 *
 * @param  {string} pathOfPackageJson - The path of the package.json to check against
 * @param  {string} pathOfModules - The path of the node modules to check against e.g. ./node_modules
 * @param  {licenseCheckCallback} callback - A callback to run.
 *
 * @api public
 */
function check(pathOfPackageJson,pathOfModules, cb) {
	var incompat = false;
    var pkg = require(pathOfPackageJson);
	var output = [];
	var noLicenseStr = colors.red('No license');
	var pkgLicense = pkg.license ? ((typeof pkg.license === 'string' || pkg.license instanceof String) ? pkg.license : pkg.license.type || pkgLicense) : pkgLicense;
	pkgLicense = pkgLicense ? pkgLicense : (pkg.licenses && pkg.licenses[0] && pkg.licenses[0].type ? ((typeof pkg.licenses[0].type === 'string' || pkg.licenses[0].type instanceof String) ? pkg.licenses[0].type : pkg.licenses.type || pkgLicense) : pkgLicense);
	var pkgLicenseType = license_type(pkgLicense);
	output.push(colors.yellow('Checking', colors.blue(pkgLicense ? pkgLicense : noLicenseStr), '(' + pkgLicenseType + ')', 'of', pkg.name + '@' + pkg.version,os.EOL,'in', colors.blue(path.resolve(pathOfPackageJson)), os.EOL,'against', colors.blue(path.resolve(pathOfModules))+':'));
	output.push('');
	var pkgCompatiblityString = (pkgLicenseType == licenseTypes.unknown || pkgLicenseType == licenseTypes.unlicensed) ? (incompat = true) && 'possibly incompatible' : 'incompatible';

    fs.readdir(pathOfModules, function(err, dirs) {
        if (err) {
            console.log(err);
            cb(err,null,null);
        }
		var progress = 0;
	    var total = dirs.length;

        dirs.forEach(function(dir) {
            if (dir.indexOf(".") !== 0) {
                var packageJsonFile = path.join(pathOfModules,dir,"package.json");
                if (fs.existsSync(packageJsonFile)) {
                    fs.readFile(packageJsonFile, function(err, data) {
                        if (err) {
						    console.log(err);
							progress++; 
							if (progress == total) { 
								if (incompat) { 
									output.push(''); 
									output.push(colors.red('License issues found')); 
									output.push(''); 
									//console.log(output.join(os.EOL));
									cb(null,false,output.join(os.EOL)) 
								} 
								else { 
									output.push(''); 
									output.push(colors.green('No license issues found')); 
									output.push(''); 					
									//console.log(output.join(os.EOL));
									cb(null,true,output.join(os.EOL)); 
								}
							}

                        } else {
                            var modulePkg = JSON.parse(data);
                            var moduleLicense = modulePkg.license ? ((typeof modulePkg.license === 'string' || modulePkg.license instanceof String) ? modulePkg.license : modulePkg.license.type || moduleLicense) : moduleLicense;
                            moduleLicense = moduleLicense ? moduleLicense : (modulePkg.licenses && modulePkg.licenses[0] && modulePkg.licenses[0].type ? ((typeof modulePkg.licenses[0].type === 'string' || modulePkg.licenses[0].type instanceof String) ? modulePkg.licenses[0].type : pkg.licenses.type || moduleLicense) : moduleLicense);
                            var moduleLicenseType = license_type(moduleLicense);
                            if (moduleLicenseType == licenseTypes.unknown || moduleLicenseType == licenseTypes.unlicensed) (incompat = true) && output.push(modulePkg.name + '@' + modulePkg.version + ' ' + colors.red(moduleLicense ? moduleLicense : noLicenseStr) + ' ' + colors.yellow('(' + moduleLicenseType + ') - ' + colors.red('possibly incompatible') + ' with ' + colors.blue(pkgLicense ? pkgLicense : noLicenseStr) + ' (' + pkgLicenseType + ')'));
                            else
                            if (!forward_compatiblity(pkgLicenseType, moduleLicenseType)) (incompat = true) && output.push(modulePkg.name + '@' + modulePkg.version + ' ' + colors.red(moduleLicense) + ' ' + colors.yellow('(' + moduleLicenseType + ') - ' + colors.red(pkgCompatiblityString) + ' with ' + colors.blue(pkgLicense ? pkgLicense : noLicenseStr) + ' (' + pkgLicenseType + ')'));
                            else
                                output.push(modulePkg.name + '@' + modulePkg.version + ' ' + colors.green(moduleLicense) + ' ' + colors.yellow('(' + moduleLicenseType + ') -', colors.green('compatible') + ' with ' + colors.blue(pkgLicense ? pkgLicense : noLicenseStr) + ' (' + pkgLicenseType + ')'));
							progress++; 
							if (progress == total) { 
								if (incompat) { 
									output.push(''); 
									output.push(colors.red('License issues found')); 
									output.push(''); 
									//console.log(output.join(os.EOL));
									cb(null,false,output.join(os.EOL)) 
								} 
								else { 
									output.push(''); 
									output.push(colors.green('No license issues found')); 
									output.push(''); 					
									//console.log(output.join(os.EOL));
									cb(null,true,output.join(os.EOL)); 
								}
							}
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
							cb(null,false,output.join(os.EOL)) 
						} 
						else { 
							output.push(''); 
							output.push(colors.green('No license issues found')); 
							output.push(''); 					
							//console.log(output.join(os.EOL));
							cb(null,true,output.join(os.EOL)); 
						}
					}
				}
            } else { 
				progress++; 
				if (progress == total) { 
					if (incompat) { 
					    output.push(''); 
		                output.push(colors.red('License issues found')); 
						output.push(''); 
						//console.log(output.join(os.EOL));
						cb(null,false,output.join(os.EOL)) 
					} 
					else { 
					    output.push(''); 
		                output.push(colors.green('No license issues found')); 
						output.push(''); 					
						//console.log(output.join(os.EOL));
						cb(null,true,output.join(os.EOL)); 
					}
				}
			}
        });
    });
}

if (!module.parent) {
  check(process.argv[2] || path.join(process.cwd(),'package.json'), process.argv[3] || path.join(process.cwd(),"node_modules"), function(err,passed,output){
	  if (err) { 
	    console.log(err); 
		process.exit(1)
	  }
	  else if (passed)
	  {
		console.log(output);
	  }
	  {
	    console.log(output);
	  	process.exit(1); 
      }
  }); 
} 
else
module.exports.check = check;


//compareLicenses(pkg.license);