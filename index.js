var licenseData = require('./licenses.json');

var licenseTypes = {
    'public_domain': 'public_domain',
    'permissive': 'permissive',
    'weak_copyleft': 'weak_copyleft',
    'strong_copyleft': 'strong_copyleft',
    'network_copyleft': 'network_copyleft',
    'unknown': 'unknown',
	'unlicensed': 'UNLICENSED'
};

var correct = require('spdx-correct');

var correctedLicense = function(license) {
  return license ? correct(license) : licenseTypes.unlicensed;
}

var license_type = function(license) {
    //license = license ? license.replace('+', '') : licenseTypes.unlicensed;
	license = correctedLicense(license);
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
			  if (!forward_compatiblity(pkg.license,modulePkg.license)) console.log('incompatible', pkg.license +' => ' + correctedLicense(modulePkg.license));
            }
          });
        }
      }
    });

  });
}

main();
//compareLicenses(pkg.license);