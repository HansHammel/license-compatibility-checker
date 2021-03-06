var licenseFile = require('../lib/licenses.json');
var pkg = require('./package.json');
var fs = require('fs');
var path = require('path');
var lcc = require('../lib');

licenseFile["Unknown"] = ['proprietary'];
licenseFile["Unlicensed"] = [];

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
        throw new Error('Cannot delete folder ' + path.join(__dirname, 'node_modules'));
        //process.exit(1);
    }
    try {
        fs.mkdirSync(path.join(__dirname, 'node_modules'))
    } catch (err) {
        throw new Error('Cannot create folder ' + path.join(__dirname, 'node_modules'));
        //process.exit(1);
    }
    for (var licenseType in licenseFile) {
        if (licenseFile.hasOwnProperty(licenseType)) {
            licenseFile[licenseType].forEach(function(el) {
                var licenseInfo = {
                    name: el,
                    frindlyName: el.replace('+', 'plus').toLowerCase(),
                    folder: path.join(__dirname, 'node_modules', el.replace('+', 'plus').toLowerCase()),
                    type: licenseType
                };
                licenses.push(licenseInfo);
                try {
                    deleteFolderRecursive(licenseInfo.folder)
                } catch (err) {
                    throw new Error('Cannot delete folder ' + licenseInfo.folder);
                    //process.exit(1);
                }
                try {
                    fs.mkdirSync(licenseInfo.folder)
                } catch (err) {
                    console.log('Cannot create folder', licenseInfo.folder);
                    throw(err);
                    //process.exit(1);
                }
                if (fs.existsSync(licenseInfo.folder)) {
                    try {
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
                    } catch(err) {
                        throw new Error('Cannot write file ' + path.join(licenseInfo.folder, 'package.json'));
                        //process.exit(1);
                    }
                } else {
                    throw new Error('Cannot find folder ' + licenseInfo.folder);
                    //process.exit(1);
                }
            });
        }
        
    }

    licenses.forEach(function(licenseInfo) {
        //var licenseInfo = { name: el, frindlyName: el.replace('+','plus').toLowerCase(),folder: path.join(__dirname,'node_modules',el.replace('+','plus').toLowerCase()), type: licenseType }
        pkg.license = licenseInfo.name;
        fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify(pkg));
        
		// lcc.check(path.join(__dirname, 'package.json'), path.join(__dirname, "node_modules"), function(err, passed, output) {
        //     if (err) console.log(err);
        //     else if (passed) {
        //         //No license issues found			
		// 		console.log(output);
        //     } else {
        //         //License issues found'); 
		// 		console.log(output);
        //         //throw new Error('License issues found');
        //     }
        // });
		
		//console.log(lcc.checkSync(path.join(__dirname, 'package.json'), path.join(__dirname, "node_modules")).result);
		
        //if (!lcc.check(path.join(process.cwd(),'package.json'), path.join(process.cwd(),"node_modules"))) process.exit(1);
    });
    fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify(require('./package_restore.json')));

    // test case for @org scoped packages
    try {
        fs.mkdirSync(path.join(__dirname, 'node_modules', "@org"))
    } catch (err) {
        console.log('Cannot create folder', licenseInfo.folder);
        throw(err);
        //process.exit(1);
    }
    try {
        fs.writeFileSync(path.join(__dirname, 'node_modules', "@org", 'package.json'), JSON.stringify({
            "name": "MIT",
            "version": "1.0.0",
            "description": "",
            "main": "index.js",
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1"
            },
            "author": "",
            "license": "MIT"
        }));
        //TODO: catch error
    } catch(err) {
        throw new Error('Cannot write file ' + path.join(__dirname, 'node_modules', "@org", 'package.json'));
        //process.exit(1);
    }

    lcc.check(path.join(process.cwd(), 'test','package.json'), path.join(process.cwd(),'test',"node_modules"), function(err, passed, output){
          if (err) console.log(err);
           else if (passed)
           {
        	   //No license issues found
         	   console.log(output);
           } else
           {
         	   //License issues found
         	   console.log(output);
         	   //process.exit(1);
         	   //or
         	   //throw new Error('License issues found');
           }
         });
	
} catch (err) {
    console.error(err);
    //fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify(require('./package_restore.json')));
    process.exit(1);
}