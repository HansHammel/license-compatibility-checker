var licenseData = require('./licenses.json');
var colors = require('colors/safe');

var licenseTypes = {
    'public_domain': 'Public Domain',
    'permissive': 'Permissive',
    'weak_copyleft': 'Weakly Protective',
    'strong_copyleft': 'Strongly Protective',
    'network_copyleft': 'Network Protective',
    'unknown': 'UNKNOWN',
	'unlicensed': 'UNLICENSED'
};

var correct = require('spdx-correct');

var correctedLicense = function(license) {
  return license ? correct(license) : licenseTypes.unlicensed;
}

var license_type = function(license) {
    //license = license ? license.replace('+', '') : licenseTypes.unlicensed;
	//gives false positives try MMIT
	//license = correctedLicense(license);
    if (licenseData[licenseTypes.public_domain].includes(license))
        return licenseTypes.public_domain;
    else if (licenseData[licenseTypes.permissive].includes(license))
        return licenseTypes.permissive;
    else if (licenseData[licenseTypes.weak_copyleft].includes(license))
        return licenseTypes.weak_copyleft;
    else if (licenseData[licenseTypes.strong_copyleft].includes(license))
        return licenseTypes.strong_copyleft;
    else if (licenseData[licenseTypes.network_copyleft].includes(license))
        return licenseTypes.network_copyleft;
    else 
        console.log('Unknown license type:', license);
        return licenseTypes.unknown;
};

var forward_compatiblity = function(derivative_license,source_license) {
    var souce_type = license_type(source_license);
    var derivative_type = license_type(derivative_license);
    switch (souce_type) {
        case licenseTypes.public_domain:
            return true;
        case licenseTypes.permissive:
            return [licenseTypes.public_domain, licenseTypes.permissive, licenseTypes.weak_copyleft, licenseTypes.copyleft, licenseTypes.strong_copyleft, licenseTypes.network_copyleft].includes(derivative_type);
        case licenseTypes.weak_copyleft:
            return [licenseTypes.public_domain, licenseTypes.permissive, licenseTypes.weak_copyleft, licenseTypes.copyleft, licenseTypes.strong_copyleft, licenseTypes.network_copyleft].includes(derivative_type);
        case licenseTypes.strong_copyleft:
            return [licenseTypes.weak_copyleft, licenseTypes.strong_copyleft, licenseTypes.network_copyleft].includes(derivative_type);
        case licenseTypes.network_copyleft:
            return [licenseTypes.network_copyleft].includes(derivative_type);
        default:
            console.log('Unknown license type: ' + souce_type);
            return licenseTypes.unknown;
    }
};

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



function compareLicenses(to){
	getLicenses(function(licenses){
		licenses.forEach(function(element, index, array) {
		  if (!element.isDeprecatedLicenseId)
		  console.log(element.licenseId+' => '+element.name,' compatible: ', forward_compatiblity(to,element.licenseId));
		  else
		  console.log('DEPRECATED!',element.licenseId+' -> '+element.name,' compatible:', forward_compatiblity(to,element.licenseId));
		});
	});
}

var pkg = require('./package.json');


var fs = require("fs");

var pkgLicense = pkg.license ? ((typeof pkg.license === 'string' || pkg.license instanceof String) ? pkg.license : pkg.license.type || pkgLicense) : pkgLicense;
pkgLicense = pkgLicense ? pkgLicense : ( pkg.licenses && pkg.licenses[0] && pkg.licenses[0].type ? ((typeof pkg.licenses[0].type === 'string' || pkg.licenses[0].type instanceof String) ? pkg.licenses[0].type : pkg.licenses.type || pkgLicense) : pkgLicense);
var pkgLicenseType = license_type(pkgLicense);
console.log(colors.yellow('Checking', colors.blue(pkgLicense),'('+pkgLicenseType+')', 'of', pkg.name+'@'+pkg.version, 'against:'));
console.log();

function main() {
  fs.readdir("./node_modules", function (err, dirs) {
    if (err) {
      console.log(err);
      return;
    }
    dirs.forEach(function(dir){
      if (dir.indexOf(".") !== 0) {
        var packageJsonFile = "./node_modules/" + dir + "/package.json";
        if (fs.existsSync(packageJsonFile)) {
          fs.readFile(packageJsonFile, function (err, data) {
            if (err) {
              console.log(err);
            }
            else {
              var modulePkg = JSON.parse(data);

			  var moduleLicense = modulePkg.license ? ((typeof modulePkg.license === 'string' || modulePkg.license instanceof String) ? modulePkg.license : modulePkg.license.type || moduleLicense) : moduleLicense;
			  moduleLicense = moduleLicense ? moduleLicense : ( modulePkg.licenses && modulePkg.licenses[0] && modulePkg.licenses[0].type ? ((typeof modulePkg.licenses[0].type === 'string' || modulePkg.licenses[0].type instanceof String) ? modulePkg.licenses[0].type : pkg.licenses.type || moduleLicense) : moduleLicense);
              var moduleLicenseType = license_type(moduleLicense);			  			  
			  if (!moduleLicense || moduleLicenseType==licenseTypes.unlicensed) console.log(modulePkg.name,'@',modulePkg.version,colors.red(moduleLicenseType));
			  else
			  if (moduleLicenseType==licenseTypes.unknown) console.log(modulePkg.name,'@',modulePkg.version,colors.red(moduleLicense), colors.yellow('('+moduleLicenseType+')','-',colors.red('possibly incompatible'),'with',colors.blue(pkgLicense),'('+pkgLicenseType+')'));
			  else
			  if (!forward_compatiblity(pkgLicense,moduleLicense)) console.log(modulePkg.name,'@',modulePkg.version, colors.red(moduleLicense), colors.yellow('('+moduleLicenseType+')','-',colors.red('incompatible'),'with',colors.blue(pkgLicense),'('+pkgLicenseType+')'));
			  else
			  console.log(modulePkg.name,'@',modulePkg.version, colors.green(moduleLicense), colors.yellow('('+moduleLicenseType+')','-',colors.green('compatible'),'with',colors.blue(pkgLicense),'('+pkgLicenseType+')'));
            }
          });
        }
      }
    });

  });
}

main();
//compareLicenses(pkg.license);