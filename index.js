#!/usr/bin/env node

var licenseData = require('./licenses.json');
var colors = require('colors/safe');
var path=require('path');
var fs = require("fs");

var pkg = require(path.join(process.cwd(),'package.json'));

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
    } else if (licenseData[licenseTypes.public_domain].includes(license))
        return licenseTypes.public_domain;
    else if (licenseData[licenseTypes.permissive].includes(license))
        return licenseTypes.permissive;
    else if (licenseData[licenseTypes.weak_copyleft].includes(license))
        return licenseTypes.weak_copyleft;
    else if (licenseData[licenseTypes.strong_copyleft].includes(license))
        return licenseTypes.strong_copyleft;
    else if (licenseData[licenseTypes.network_copyleft].includes(license))
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
            return [licenseTypes.unlicensed, licenseTypes.unknown, licenseTypes.public_domain, licenseTypes.permissive, licenseTypes.weak_copyleft, licenseTypes.copyleft, licenseTypes.strong_copyleft, licenseTypes.network_copyleft].includes(pkgLicenseType);
        case licenseTypes.permissive:
            return [licenseTypes.unlicensed, licenseTypes.permissive, licenseTypes.weak_copyleft, licenseTypes.copyleft, licenseTypes.strong_copyleft, licenseTypes.network_copyleft].includes(pkgLicenseType);
        case licenseTypes.weak_copyleft:
            return [licenseTypes.unlicensed, licenseTypes.weak_copyleft, licenseTypes.copyleft, licenseTypes.strong_copyleft, licenseTypes.network_copyleft].includes(pkgLicenseType);
        case licenseTypes.strong_copyleft:
            return [licenseTypes.unlicensed, licenseTypes.strong_copyleft, licenseTypes.network_copyleft].includes(pkgLicenseType);
        case licenseTypes.network_copyleft:
            return [licenseTypes.unlicensed, licenseTypes.network_copyleft].includes(pkgLicenseType);
        default:
            //console.log('Unknown license',module_license,'('+moduleLicenseType+')');
            return false;
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


foundIncompat = false;
var noLicenseStr = colors.red('No license');
var pkgLicense = pkg.license ? ((typeof pkg.license === 'string' || pkg.license instanceof String) ? pkg.license : pkg.license.type || pkgLicense) : pkgLicense;
pkgLicense = pkgLicense ? pkgLicense : (pkg.licenses && pkg.licenses[0] && pkg.licenses[0].type ? ((typeof pkg.licenses[0].type === 'string' || pkg.licenses[0].type instanceof String) ? pkg.licenses[0].type : pkg.licenses.type || pkgLicense) : pkgLicense);
var pkgLicenseType = license_type(pkgLicense);
console.log(colors.yellow('Checking', colors.blue(pkgLicense ? pkgLicense : noLicenseStr), '(' + pkgLicenseType + ')', 'of', pkg.name + '@' + pkg.version, 'against:'));
console.log();
var pkgCompatiblityString = (pkgLicenseType == licenseTypes.unknown || pkgLicenseType == licenseTypes.unlicensed) ? (foundIncompat = true) && 'possibly incompatible' : 'incompatible';

function checkProgress(progress, total, incompat){
  if (progress == total && incompat) { console.log(); console.log(colors.red('License issues found')); process.exit(1); }
}

function main() {
    fs.readdir("./node_modules", function(err, dirs) {
        if (err) {
            console.log(err);
            return;
        }
		var progress = 0;
		var total = dirs.length;
        dirs.forEach(function(dir) {
            if (dir.indexOf(".") !== 0) {
                var packageJsonFile = "./node_modules/" + dir + "/package.json";
                if (fs.existsSync(packageJsonFile)) {
                    fs.readFile(packageJsonFile, function(err, data) {
                        if (err) {
						    console.log(err);
							progress++ && checkProgress(progress, total, foundIncompat);
                        } else {
                            var modulePkg = JSON.parse(data);

                            var moduleLicense = modulePkg.license ? ((typeof modulePkg.license === 'string' || modulePkg.license instanceof String) ? modulePkg.license : modulePkg.license.type || moduleLicense) : moduleLicense;
                            moduleLicense = moduleLicense ? moduleLicense : (modulePkg.licenses && modulePkg.licenses[0] && modulePkg.licenses[0].type ? ((typeof modulePkg.licenses[0].type === 'string' || modulePkg.licenses[0].type instanceof String) ? modulePkg.licenses[0].type : pkg.licenses.type || moduleLicense) : moduleLicense);
                            var moduleLicenseType = license_type(moduleLicense);
                            if (moduleLicenseType == licenseTypes.unknown || moduleLicenseType == licenseTypes.unlicensed) (foundIncompat = true) && console.log(modulePkg.name, '@', modulePkg.version, colors.red(moduleLicense ? moduleLicense : noLicenseStr), colors.yellow('(' + moduleLicenseType + ')', '-', colors.red('possibly incompatible'), 'with', colors.blue(pkgLicense ? pkgLicense : noLicenseStr), '(' + pkgLicenseType + ')'));
                            else
                            if (!forward_compatiblity(pkgLicenseType, moduleLicenseType)) (foundIncompat = true) && console.log(modulePkg.name, '@', modulePkg.version, colors.red(moduleLicense), colors.yellow('(' + moduleLicenseType + ')', '-', colors.red(pkgCompatiblityString), 'with', colors.blue(pkgLicense ? pkgLicense : noLicenseStr), '(' + pkgLicenseType + ')'));
                            else
                                console.log(modulePkg.name, '@', modulePkg.version, colors.green(moduleLicense), colors.yellow('(' + moduleLicenseType + ')', '-', colors.green('compatible'), 'with', colors.blue(pkgLicense ? pkgLicense : noLicenseStr), '(' + pkgLicenseType + ')'));
						    progress++ && checkProgress(progress, total, foundIncompat);
                        }
                    });
                } else progress++ && checkProgress(progress, total, foundIncompat);
            } else progress++ && checkProgress(progress, total, foundIncompat);
        });
		 
    });
}

main();
//compareLicenses(pkg.license);