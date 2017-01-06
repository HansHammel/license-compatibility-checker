var licenseFile = require('../licenses.json');
var pkg = require('./package.json');
var fs = require('fs');
var path = require('path');
var lcc = require('../');

var deleteFolderRecursive = function(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index) {
            var curPath = path + '/' + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

try {
    licenses = [];
    try {
        deleteFolderRecursive(path.join(__dirname, 'node_modules'))
    } catch (err) {
        console.log('Cannot delete folder', path.join(__dirname, 'node_modules'), err);
        process.exit(1);
    }
    try {
        fs.mkdirSync(path.join(__dirname, 'node_modules'))
    } catch (err) {
        console.log('Cannot create folder', path.join(__dirname, 'node_modules'), err);
        process.exit(1);
    }
    for (var licenseType in licenseFile) {
        if (licenseFile.hasOwnProperty(licenseType)) {
            licenseFile[licenseType].forEach(function(el) {
                var licenseInfo = {
                    name: el,
                    frindlyName: el.replace('+', 'plus').toLowerCase(),
                    folder: path.join(__dirname, 'node_modules', el.replace('+', 'plus').toLowerCase()),
                    type: licenseType
                }
                licenses.push(licenseInfo);
                try {
                    deleteFolderRecursive(licenseInfo.folder)
                } catch (err) {
                    console.log('Cannot delete folder', licenseInfo.folder, err);
                    process.exit(1);
                }
                try {
                    fs.mkdirSync(licenseInfo.folder)
                } catch (err) {
                    console.log('Cannot create folder', licenseInfo.folder, err);
                    process.exit(1);
                }
                if (fs.existsSync(licenseInfo.folder)) {
                    fs.writeFileSync(path.join(licenseInfo.folder, 'package.json'), JSON.stringify({
                        "name": licenseInfo.frindlyName,
                        "version": "1.0.0",
                        "description": "",
                        "main": "index.js",
                        "scripts": {
                            "test": "echo \"Error: no test specified\" && exit 1"
                        },
                        "author": "",
                        "license": licenseInfo.name
                    }));
                    //TODO: catch error
                } else {
                    console.log('Cannot find folder', licenseInfo.folder);
                    process.exit(1);
                };
            });
        }
    }

    licenses.forEach(function(licenseInfo) {
        //var licenseInfo = { name: el, frindlyName: el.replace('+','plus').toLowerCase(),folder: path.join(__dirname,'node_modules',el.replace('+','plus').toLowerCase()), type: licenseType }
        pkg.license = licenseInfo.name;
        fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify(pkg));
        lcc.check(path.join(__dirname, 'package.json'), path.join(__dirname, "node_modules"), function(err, passed, output) {
            if (err) console.log(err);
            else if (passed) {
                //No license issues found			
				console.log(output);
            } else {
                //License issues found'); 
				console.log(output);
                //throw new Error('License issues found');
            }
        });
        //if (!lcc.check(path.join(process.cwd(),'package.json'), path.join(process.cwd(),"node_modules"))) process.exit(1);
    });
    fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify(pkg));
} catch (err) {
    console.error(err);
    fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify(pkg));
    process.exit(1);
}