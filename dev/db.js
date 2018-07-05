// for use on https://tldrlegal.com/search?reverse=true

(function(console) {
    if (!console.save) {
        console.save = function(data, filename) {

            if (!data) {
                console.error('Console.save: No data');
                return;
            }

            if (!filename) filename = 'console.json';

            if (typeof data === "object") {
                data = JSON.stringify(data, undefined, 4)
            }

            var blob = new Blob([data], {
                    type: 'text/json'
                }),
                e = document.createEvent('MouseEvents'),
                a = document.createElement('a');

            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e)
        }
    }
})(console);

(function() {

    var camelize = function() {
        var preserveCamelCase = function(str) {
            let isLastCharLower = false;
            let isLastCharUpper = false;
            let isLastLastCharUpper = false;

            for (let i = 0; i < str.length; i++) {
                const c = str[i];

                if (isLastCharLower && (/[a-zA-Z]/).test(c) && c.toUpperCase() === c) {
                    str = str.substr(0, i) + '-' + str.substr(i);
                    isLastCharLower = false;
                    isLastLastCharUpper = isLastCharUpper;
                    isLastCharUpper = true;
                    i++;
                } else if (isLastCharUpper && isLastLastCharUpper && (/[a-zA-Z]/).test(c) && c.toLowerCase() === c) {
                    str = str.substr(0, i - 1) + '-' + str.substr(i - 1);
                    isLastLastCharUpper = isLastCharUpper;
                    isLastCharUpper = false;
                    isLastCharLower = true;
                } else {
                    isLastCharLower = c.toLowerCase() === c;
                    isLastLastCharUpper = isLastCharUpper;
                    isLastCharUpper = c.toUpperCase() === c;
                }
            }

            return str;
        };
        let str = Array
            .from(arguments)
            .map(x => x.trim();)
            .filter(x => x.length;)
            .join('-');

        if (str.length === 0) {
            return '';
        }

        if (str.length === 1) {
            return str.toLowerCase();
        }

        str = preserveCamelCase(str);

        return str
            .replace(/^[_.\- ]+/, '')
            .toLowerCase()
            .replace(/[_.\- ]+(\w|$)/g, (m, p1) => p1.toUpperCase(););
    };

	//filter function
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    var slags = [];
    var licenseData = {
        licenses: []
    };
	
    var licenseElement = $('.search-result.flatbox');
    licenseElement.each(function(index1, value1) {
        var n = $(value1).find('h3').text();
        $(value1).find('.license-preview').each(function(index2, value2) {
            var id = n.match(/\(([^)]+)\)/) ? n.match(/\(([^)]+)\)/)[1].trim() : null;
            var name = n.match(/(.*)\(([^)]+)\)/) ? n.match(/(.*)\(([^)]+)\)/)[1].trim() : n;
            var lic = {
                licenseId: id,
                name: name,
                can: [],
                must: [],
                cannot: []
            };
            $(value2).find('.license-attribute.can').each(function(index3, value3) {
                lic.can.push($(value3).text().trim());
                slags.push($(value3).text().trim());
            });
            $(value2).find('.license-attribute.cannot').each(function(index3, value3) {
                lic.cannot.push($(value3).text().trim());
                slags.push($(value3).text().trim());
            });
            $(value2).find('.license-attribute.must').each(function(index3, value3) {
                lic.must.push($(value3).text().trim());
                slags.push($(value3).text().trim());
            });
            licenseData.licenses.push(lic);
        });
    });
    //console.dir(licenseData);
    slags = slags.sort().filter(onlyUnique);
    //console.dir(slags);
    var licenseSlags = {};
    slags.forEach(function(data) {
        licenseSlags[camelize(data)] = data
    });
    //console.dir(licenseSlags);

    //https://spdx.org/licenses/licenses.json
    var spdxData = {
        "releaseDate": "18 July 2016",
        "licenseListVersion": "2.5",
        "licenses": [{
            "isDeprecatedLicenseId": false,
            "licenseId": "Glide",
            "isOsiApproved": false,
            "name": "3dfx Glide License",
            "referenceNumber": "1",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Glide.json",
            "seeAlso": ["http:\/\/www.users.on.net\/~triforce\/glidexp\/COPYING.txt"],
            "reference": ".\/Glide.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Abstyles",
            "isOsiApproved": false,
            "name": "Abstyles License",
            "referenceNumber": "2",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Abstyles.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Abstyles"],
            "reference": ".\/Abstyles.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "AFL-1.1",
            "isOsiApproved": true,
            "name": "Academic Free License v1.1",
            "referenceNumber": "3",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/AFL-1.1.json",
            "seeAlso": ["http:\/\/opensource.linux-mirror.org\/licenses\/afl-1.1.txt"],
            "reference": ".\/AFL-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "AFL-1.2",
            "isOsiApproved": true,
            "name": "Academic Free License v1.2",
            "referenceNumber": "4",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/AFL-1.2.json",
            "seeAlso": ["http:\/\/opensource.linux-mirror.org\/licenses\/afl-1.2.txt"],
            "reference": ".\/AFL-1.2.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "AFL-2.0",
            "isOsiApproved": true,
            "name": "Academic Free License v2.0",
            "referenceNumber": "5",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/AFL-2.0.json",
            "seeAlso": ["http:\/\/opensource.linux-mirror.org\/licenses\/afl-2.0.txt"],
            "reference": ".\/AFL-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "AFL-2.1",
            "isOsiApproved": true,
            "name": "Academic Free License v2.1",
            "referenceNumber": "6",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/AFL-2.1.json",
            "seeAlso": ["http:\/\/opensource.linux-mirror.org\/licenses\/afl-2.1.txt"],
            "reference": ".\/AFL-2.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "AFL-3.0",
            "isOsiApproved": true,
            "name": "Academic Free License v3.0",
            "referenceNumber": "7",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/AFL-3.0.json",
            "seeAlso": ["http:\/\/www.rosenlaw.com\/AFL3.0.htm", "http:\/\/www.opensource.org\/licenses\/afl-3.0"],
            "reference": ".\/AFL-3.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "AMPAS",
            "isOsiApproved": false,
            "name": "Academy of Motion Picture Arts and Sciences BSD",
            "referenceNumber": "8",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/AMPAS.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/BSD#AMPASBSD"],
            "reference": ".\/AMPAS.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "APL-1.0",
            "isOsiApproved": true,
            "name": "Adaptive Public License 1.0",
            "referenceNumber": "9",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/APL-1.0.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/APL-1.0"],
            "reference": ".\/APL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Adobe-Glyph",
            "isOsiApproved": false,
            "name": "Adobe Glyph List License",
            "referenceNumber": "10",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Adobe-Glyph.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/MIT#AdobeGlyph"],
            "reference": ".\/Adobe-Glyph.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "APAFML",
            "isOsiApproved": false,
            "name": "Adobe Postscript AFM License",
            "referenceNumber": "11",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/APAFML.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/AdobePostscriptAFM"],
            "reference": ".\/APAFML.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Adobe-2006",
            "isOsiApproved": false,
            "name": "Adobe Systems Incorporated Source Code License Agreement",
            "referenceNumber": "12",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Adobe-2006.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/AdobeLicense"],
            "reference": ".\/Adobe-2006.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "AGPL-1.0",
            "isOsiApproved": false,
            "name": "Affero General Public License v1.0",
            "referenceNumber": "13",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/AGPL-1.0.json",
            "seeAlso": ["http:\/\/www.affero.org\/oagpl.html"],
            "reference": ".\/AGPL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Afmparse",
            "isOsiApproved": false,
            "name": "Afmparse License",
            "referenceNumber": "14",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Afmparse.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Afmparse"],
            "reference": ".\/Afmparse.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Aladdin",
            "isOsiApproved": false,
            "name": "Aladdin Free Public License",
            "referenceNumber": "15",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Aladdin.json",
            "seeAlso": ["http:\/\/pages.cs.wisc.edu\/~ghost\/doc\/AFPL\/6.01\/Public.htm"],
            "reference": ".\/Aladdin.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "ADSL",
            "isOsiApproved": false,
            "name": "Amazon Digital Services License",
            "referenceNumber": "16",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/ADSL.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/AmazonDigitalServicesLicense"],
            "reference": ".\/ADSL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "AMDPLPA",
            "isOsiApproved": false,
            "name": "AMD's plpa_map.c License",
            "referenceNumber": "17",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/AMDPLPA.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/AMD_plpa_map_License"],
            "reference": ".\/AMDPLPA.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "ANTLR-PD",
            "isOsiApproved": false,
            "name": "ANTLR Software Rights Notice",
            "referenceNumber": "18",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/ANTLR-PD.json",
            "seeAlso": ["http:\/\/www.antlr2.org\/license.html"],
            "reference": ".\/ANTLR-PD.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Apache-1.0",
            "isOsiApproved": false,
            "name": "Apache License 1.0",
            "referenceNumber": "19",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Apache-1.0.json",
            "seeAlso": ["http:\/\/www.apache.org\/licenses\/LICENSE-1.0"],
            "reference": ".\/Apache-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Apache-1.1",
            "isOsiApproved": true,
            "name": "Apache License 1.1",
            "referenceNumber": "20",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Apache-1.1.json",
            "seeAlso": ["http:\/\/apache.org\/licenses\/LICENSE-1.1", "http:\/\/opensource.org\/licenses\/Apache-1.1"],
            "reference": ".\/Apache-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Apache-2.0",
            "isOsiApproved": true,
            "name": "Apache License 2.0",
            "referenceNumber": "21",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Apache-2.0.json",
            "seeAlso": ["http:\/\/www.apache.org\/licenses\/LICENSE-2.0", "http:\/\/www.opensource.org\/licenses\/Apache-2.0"],
            "reference": ".\/Apache-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "AML",
            "isOsiApproved": false,
            "name": "Apple MIT License",
            "referenceNumber": "22",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/AML.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Apple_MIT_License"],
            "reference": ".\/AML.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "APSL-1.0",
            "isOsiApproved": true,
            "name": "Apple Public Source License 1.0",
            "referenceNumber": "23",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/APSL-1.0.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Apple_Public_Source_License_1.0"],
            "reference": ".\/APSL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "APSL-1.1",
            "isOsiApproved": true,
            "name": "Apple Public Source License 1.1",
            "referenceNumber": "24",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/APSL-1.1.json",
            "seeAlso": ["http:\/\/www.opensource.apple.com\/source\/IOSerialFamily\/IOSerialFamily-7\/APPLE_LICENSE"],
            "reference": ".\/APSL-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "APSL-1.2",
            "isOsiApproved": true,
            "name": "Apple Public Source License 1.2",
            "referenceNumber": "25",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/APSL-1.2.json",
            "seeAlso": ["http:\/\/www.samurajdata.se\/opensource\/mirror\/licenses\/apsl.php"],
            "reference": ".\/APSL-1.2.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "APSL-2.0",
            "isOsiApproved": true,
            "name": "Apple Public Source License 2.0",
            "referenceNumber": "26",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/APSL-2.0.json",
            "seeAlso": ["http:\/\/www.opensource.apple.com\/license\/apsl\/"],
            "reference": ".\/APSL-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Artistic-1.0",
            "isOsiApproved": true,
            "name": "Artistic License 1.0",
            "referenceNumber": "27",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Artistic-1.0.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/Artistic-1.0"],
            "reference": ".\/Artistic-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Artistic-1.0-Perl",
            "isOsiApproved": true,
            "name": "Artistic License 1.0 (Perl)",
            "referenceNumber": "28",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Artistic-1.0-Perl.json",
            "seeAlso": ["http:\/\/dev.perl.org\/licenses\/artistic.html"],
            "reference": ".\/Artistic-1.0-Perl.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Artistic-1.0-cl8",
            "isOsiApproved": true,
            "name": "Artistic License 1.0 w\/clause 8",
            "referenceNumber": "29",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Artistic-1.0-cl8.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/Artistic-1.0"],
            "reference": ".\/Artistic-1.0-cl8.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Artistic-2.0",
            "isOsiApproved": true,
            "name": "Artistic License 2.0",
            "referenceNumber": "30",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Artistic-2.0.json",
            "seeAlso": ["http:\/\/www.perlfoundation.org\/artistic_license_2_0", "", "", "http:\/\/www.opensource.org\/licenses\/artistic-license-2.0"],
            "reference": ".\/Artistic-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "AAL",
            "isOsiApproved": true,
            "name": "Attribution Assurance License",
            "referenceNumber": "31",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/AAL.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/attribution"],
            "reference": ".\/AAL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Bahyph",
            "isOsiApproved": false,
            "name": "Bahyph License",
            "referenceNumber": "32",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Bahyph.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Bahyph"],
            "reference": ".\/Bahyph.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Barr",
            "isOsiApproved": false,
            "name": "Barr License",
            "referenceNumber": "33",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Barr.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Barr"],
            "reference": ".\/Barr.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Beerware",
            "isOsiApproved": false,
            "name": "Beerware License",
            "referenceNumber": "34",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Beerware.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Beerware"],
            "reference": ".\/Beerware.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "BitTorrent-1.0",
            "isOsiApproved": false,
            "name": "BitTorrent Open Source License v1.0",
            "referenceNumber": "35",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/BitTorrent-1.0.json",
            "seeAlso": ["http:\/\/sources.gentoo.org\/cgi-bin\/viewvc.cgi\/gentoo-x86\/licenses\/BitTorrent?r1=1.1&r2=1.1.1.1&diff_format=s"],
            "reference": ".\/BitTorrent-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "BitTorrent-1.1",
            "isOsiApproved": false,
            "name": "BitTorrent Open Source License v1.1",
            "referenceNumber": "36",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/BitTorrent-1.1.json",
            "seeAlso": ["http:\/\/directory.fsf.org\/wiki\/License:BitTorrentOSL1.1"],
            "reference": ".\/BitTorrent-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "BSL-1.0",
            "isOsiApproved": true,
            "name": "Boost Software License 1.0",
            "referenceNumber": "37",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/BSL-1.0.json",
            "seeAlso": ["http:\/\/www.boost.org\/LICENSE_1_0.txt", "http:\/\/www.opensource.org\/licenses\/BSL-1.0"],
            "reference": ".\/BSL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Borceux",
            "isOsiApproved": false,
            "name": "Borceux license",
            "referenceNumber": "38",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Borceux.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Borceux"],
            "reference": ".\/Borceux.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "BSD-2-Clause",
            "isOsiApproved": true,
            "name": "BSD 2-clause \"Simplified\" License",
            "referenceNumber": "39",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/BSD-2-Clause.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/BSD-2-Clause"],
            "reference": ".\/BSD-2-Clause.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "BSD-2-Clause-FreeBSD",
            "isOsiApproved": false,
            "name": "BSD 2-clause FreeBSD License",
            "referenceNumber": "40",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/BSD-2-Clause-FreeBSD.json",
            "seeAlso": ["http:\/\/www.freebsd.org\/copyright\/freebsd-license.html"],
            "reference": ".\/BSD-2-Clause-FreeBSD.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "BSD-2-Clause-NetBSD",
            "isOsiApproved": false,
            "name": "BSD 2-clause NetBSD License",
            "referenceNumber": "41",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/BSD-2-Clause-NetBSD.json",
            "seeAlso": ["http:\/\/www.netbsd.org\/about\/redistribution.html#default"],
            "reference": ".\/BSD-2-Clause-NetBSD.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "BSD-3-Clause",
            "isOsiApproved": true,
            "name": "BSD 3-clause \"New\" or \"Revised\" License",
            "referenceNumber": "42",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/BSD-3-Clause.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/BSD-3-Clause"],
            "reference": ".\/BSD-3-Clause.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "BSD-3-Clause-Clear",
            "isOsiApproved": false,
            "name": "BSD 3-clause Clear License",
            "referenceNumber": "43",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/BSD-3-Clause-Clear.json",
            "seeAlso": ["http:\/\/labs.metacarta.com\/license-explanation.html#license"],
            "reference": ".\/BSD-3-Clause-Clear.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "BSD-4-Clause",
            "isOsiApproved": false,
            "name": "BSD 4-clause \"Original\" or \"Old\" License",
            "referenceNumber": "44",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/BSD-4-Clause.json",
            "seeAlso": ["http:\/\/directory.fsf.org\/wiki\/License:BSD_4Clause"],
            "reference": ".\/BSD-4-Clause.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "BSD-Protection",
            "isOsiApproved": false,
            "name": "BSD Protection License",
            "referenceNumber": "45",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/BSD-Protection.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/BSD_Protection_License"],
            "reference": ".\/BSD-Protection.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "BSD-Source-Code",
            "isOsiApproved": false,
            "name": "BSD Source Code Attribution",
            "referenceNumber": "46",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/BSD-Source-Code.json",
            "seeAlso": ["https:\/\/github.com\/robbiehanson\/CocoaHTTPServer\/blob\/master\/LICENSE.txt"],
            "reference": ".\/BSD-Source-Code.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "BSD-3-Clause-Attribution",
            "isOsiApproved": false,
            "name": "BSD with attribution",
            "referenceNumber": "47",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/BSD-3-Clause-Attribution.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/BSD_with_Attribution"],
            "reference": ".\/BSD-3-Clause-Attribution.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "0BSD",
            "isOsiApproved": true,
            "name": "BSD Zero Clause License",
            "referenceNumber": "48",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/0BSD.json",
            "seeAlso": ["http:\/\/landley.net\/toybox\/license.html"],
            "reference": ".\/0BSD.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "BSD-4-Clause-UC",
            "isOsiApproved": false,
            "name": "BSD-4-Clause (University of California-Specific)",
            "referenceNumber": "49",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/BSD-4-Clause-UC.json",
            "seeAlso": ["http:\/\/www.freebsd.org\/copyright\/license.html"],
            "reference": ".\/BSD-4-Clause-UC.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "bzip2-1.0.5",
            "isOsiApproved": false,
            "name": "bzip2 and libbzip2 License v1.0.5",
            "referenceNumber": "50",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/bzip2-1.0.5.json",
            "seeAlso": ["http:\/\/bzip.org\/1.0.5\/bzip2-manual-1.0.5.html"],
            "reference": ".\/bzip2-1.0.5.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "bzip2-1.0.6",
            "isOsiApproved": false,
            "name": "bzip2 and libbzip2 License v1.0.6",
            "referenceNumber": "51",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/bzip2-1.0.6.json",
            "seeAlso": ["https:\/\/github.com\/asimonov-im\/bzip2\/blob\/master\/LICENSE"],
            "reference": ".\/bzip2-1.0.6.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Caldera",
            "isOsiApproved": false,
            "name": "Caldera License",
            "referenceNumber": "52",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Caldera.json",
            "seeAlso": ["http:\/\/www.lemis.com\/grog\/UNIX\/ancient-source-all.pdf"],
            "reference": ".\/Caldera.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CECILL-1.0",
            "isOsiApproved": false,
            "name": "CeCILL Free Software License Agreement v1.0",
            "referenceNumber": "53",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CECILL-1.0.json",
            "seeAlso": ["http:\/\/www.cecill.info\/licences\/Licence_CeCILL_V1-fr.html"],
            "reference": ".\/CECILL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CECILL-1.1",
            "isOsiApproved": false,
            "name": "CeCILL Free Software License Agreement v1.1",
            "referenceNumber": "54",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CECILL-1.1.json",
            "seeAlso": ["http:\/\/www.cecill.info\/licences\/Licence_CeCILL_V1.1-US.html"],
            "reference": ".\/CECILL-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CECILL-2.0",
            "isOsiApproved": false,
            "name": "CeCILL Free Software License Agreement v2.0",
            "referenceNumber": "55",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CECILL-2.0.json",
            "seeAlso": ["http:\/\/www.cecill.info\/licences\/Licence_CeCILL_V2-fr.html"],
            "reference": ".\/CECILL-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CECILL-2.1",
            "isOsiApproved": true,
            "name": "CeCILL Free Software License Agreement v2.1",
            "referenceNumber": "56",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CECILL-2.1.json",
            "seeAlso": ["http:\/\/www.cecill.info\/licences\/Licence_CeCILL_V2.1-fr.html", "http:\/\/opensource.org\/licenses\/CECILL-2.1"],
            "reference": ".\/CECILL-2.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CECILL-B",
            "isOsiApproved": false,
            "name": "CeCILL-B Free Software License Agreement",
            "referenceNumber": "57",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CECILL-B.json",
            "seeAlso": ["http:\/\/www.cecill.info\/licences\/Licence_CeCILL-B_V1-fr.html"],
            "reference": ".\/CECILL-B.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CECILL-C",
            "isOsiApproved": false,
            "name": "CeCILL-C Free Software License Agreement",
            "referenceNumber": "58",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CECILL-C.json",
            "seeAlso": ["http:\/\/www.cecill.info\/licences\/Licence_CeCILL-C_V1-fr.html"],
            "reference": ".\/CECILL-C.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "ClArtistic",
            "isOsiApproved": false,
            "name": "Clarified Artistic License",
            "referenceNumber": "59",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/ClArtistic.json",
            "seeAlso": ["http:\/\/www.ncftp.com\/ncftp\/doc\/LICENSE.txt"],
            "reference": ".\/ClArtistic.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "MIT-CMU",
            "isOsiApproved": false,
            "name": "CMU License",
            "referenceNumber": "60",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/MIT-CMU.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing:MIT?rd=Licensing\/MIT#CMU_Style"],
            "reference": ".\/MIT-CMU.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CNRI-Jython",
            "isOsiApproved": false,
            "name": "CNRI Jython License",
            "referenceNumber": "61",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CNRI-Jython.json",
            "seeAlso": ["http:\/\/www.jython.org\/license.html"],
            "reference": ".\/CNRI-Jython.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CNRI-Python",
            "isOsiApproved": true,
            "name": "CNRI Python License",
            "referenceNumber": "62",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CNRI-Python.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/CNRI-Python"],
            "reference": ".\/CNRI-Python.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CNRI-Python-GPL-Compatible",
            "isOsiApproved": false,
            "name": "CNRI Python Open Source GPL Compatible License Agreement",
            "referenceNumber": "63",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CNRI-Python-GPL-Compatible.json",
            "seeAlso": ["http:\/\/www.python.org\/download\/releases\/1.6.1\/download_win\/"],
            "reference": ".\/CNRI-Python-GPL-Compatible.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CPOL-1.02",
            "isOsiApproved": false,
            "name": "Code Project Open License 1.02",
            "referenceNumber": "64",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CPOL-1.02.json",
            "seeAlso": ["http:\/\/www.codeproject.com\/info\/cpol10.aspx"],
            "reference": ".\/CPOL-1.02.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CDDL-1.0",
            "isOsiApproved": true,
            "name": "Common Development and Distribution License 1.0",
            "referenceNumber": "65",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CDDL-1.0.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/cddl1"],
            "reference": ".\/CDDL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CDDL-1.1",
            "isOsiApproved": false,
            "name": "Common Development and Distribution License 1.1",
            "referenceNumber": "66",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CDDL-1.1.json",
            "seeAlso": ["http:\/\/glassfish.java.net\/public\/CDDL+GPL_1_1.html"],
            "reference": ".\/CDDL-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CPAL-1.0",
            "isOsiApproved": true,
            "name": "Common Public Attribution License 1.0",
            "referenceNumber": "67",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CPAL-1.0.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/CPAL-1.0"],
            "reference": ".\/CPAL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CPL-1.0",
            "isOsiApproved": true,
            "name": "Common Public License 1.0",
            "referenceNumber": "68",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CPL-1.0.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/CPL-1.0"],
            "reference": ".\/CPL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CATOSL-1.1",
            "isOsiApproved": true,
            "name": "Computer Associates Trusted Open Source License 1.1",
            "referenceNumber": "69",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CATOSL-1.1.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/CATOSL-1.1"],
            "reference": ".\/CATOSL-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Condor-1.1",
            "isOsiApproved": false,
            "name": "Condor Public License v1.1",
            "referenceNumber": "70",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Condor-1.1.json",
            "seeAlso": ["http:\/\/research.cs.wisc.edu\/condor\/license.html#condor"],
            "reference": ".\/Condor-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-1.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution 1.0",
            "referenceNumber": "71",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-1.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by\/1.0\/legalcode"],
            "reference": ".\/CC-BY-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-2.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution 2.0",
            "referenceNumber": "72",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-2.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by\/2.0\/legalcode"],
            "reference": ".\/CC-BY-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-2.5",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution 2.5",
            "referenceNumber": "73",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-2.5.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by\/2.5\/legalcode"],
            "reference": ".\/CC-BY-2.5.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-3.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution 3.0",
            "referenceNumber": "74",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-3.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by\/3.0\/legalcode"],
            "reference": ".\/CC-BY-3.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-4.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution 4.0",
            "referenceNumber": "75",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-4.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by\/4.0\/legalcode"],
            "reference": ".\/CC-BY-4.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-ND-1.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution No Derivatives 1.0",
            "referenceNumber": "76",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-ND-1.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nd\/1.0\/legalcode"],
            "reference": ".\/CC-BY-ND-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-ND-2.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution No Derivatives 2.0",
            "referenceNumber": "77",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-ND-2.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nd\/2.0\/legalcode"],
            "reference": ".\/CC-BY-ND-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-ND-2.5",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution No Derivatives 2.5",
            "referenceNumber": "78",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-ND-2.5.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nd\/2.5\/legalcode"],
            "reference": ".\/CC-BY-ND-2.5.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-ND-3.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution No Derivatives 3.0",
            "referenceNumber": "79",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-ND-3.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nd\/3.0\/legalcode"],
            "reference": ".\/CC-BY-ND-3.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-ND-4.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution No Derivatives 4.0",
            "referenceNumber": "80",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-ND-4.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nd\/4.0\/legalcode"],
            "reference": ".\/CC-BY-ND-4.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-NC-1.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Non Commercial 1.0",
            "referenceNumber": "81",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-NC-1.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nc\/1.0\/legalcode"],
            "reference": ".\/CC-BY-NC-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-NC-2.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Non Commercial 2.0",
            "referenceNumber": "82",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-NC-2.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nc\/2.0\/legalcode"],
            "reference": ".\/CC-BY-NC-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-NC-2.5",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Non Commercial 2.5",
            "referenceNumber": "83",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-NC-2.5.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nc\/2.5\/legalcode"],
            "reference": ".\/CC-BY-NC-2.5.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-NC-3.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Non Commercial 3.0",
            "referenceNumber": "84",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-NC-3.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nc\/3.0\/legalcode"],
            "reference": ".\/CC-BY-NC-3.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-NC-4.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Non Commercial 4.0",
            "referenceNumber": "85",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-NC-4.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nc\/4.0\/legalcode"],
            "reference": ".\/CC-BY-NC-4.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-NC-ND-1.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Non Commercial No Derivatives 1.0",
            "referenceNumber": "86",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-NC-ND-1.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nd-nc\/1.0\/legalcode"],
            "reference": ".\/CC-BY-NC-ND-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-NC-ND-2.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Non Commercial No Derivatives 2.0",
            "referenceNumber": "87",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-NC-ND-2.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nc-nd\/2.0\/legalcode"],
            "reference": ".\/CC-BY-NC-ND-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-NC-ND-2.5",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Non Commercial No Derivatives 2.5",
            "referenceNumber": "88",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-NC-ND-2.5.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nc-nd\/2.5\/legalcode"],
            "reference": ".\/CC-BY-NC-ND-2.5.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-NC-ND-3.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Non Commercial No Derivatives 3.0",
            "referenceNumber": "89",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-NC-ND-3.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nc-nd\/3.0\/legalcode"],
            "reference": ".\/CC-BY-NC-ND-3.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-NC-ND-4.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Non Commercial No Derivatives 4.0",
            "referenceNumber": "90",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-NC-ND-4.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nc-nd\/4.0\/legalcode"],
            "reference": ".\/CC-BY-NC-ND-4.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-NC-SA-1.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Non Commercial Share Alike 1.0",
            "referenceNumber": "91",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-NC-SA-1.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nc-sa\/1.0\/legalcode"],
            "reference": ".\/CC-BY-NC-SA-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-NC-SA-2.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Non Commercial Share Alike 2.0",
            "referenceNumber": "92",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-NC-SA-2.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nc-sa\/2.0\/legalcode"],
            "reference": ".\/CC-BY-NC-SA-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-NC-SA-2.5",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Non Commercial Share Alike 2.5",
            "referenceNumber": "93",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-NC-SA-2.5.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nc-sa\/2.5\/legalcode"],
            "reference": ".\/CC-BY-NC-SA-2.5.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-NC-SA-3.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Non Commercial Share Alike 3.0",
            "referenceNumber": "94",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-NC-SA-3.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nc-sa\/3.0\/legalcode"],
            "reference": ".\/CC-BY-NC-SA-3.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-NC-SA-4.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Non Commercial Share Alike 4.0",
            "referenceNumber": "95",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-NC-SA-4.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-nc-sa\/4.0\/legalcode"],
            "reference": ".\/CC-BY-NC-SA-4.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-SA-1.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Share Alike 1.0",
            "referenceNumber": "96",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-SA-1.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-sa\/1.0\/legalcode"],
            "reference": ".\/CC-BY-SA-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-SA-2.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Share Alike 2.0",
            "referenceNumber": "97",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-SA-2.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-sa\/2.0\/legalcode"],
            "reference": ".\/CC-BY-SA-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-SA-2.5",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Share Alike 2.5",
            "referenceNumber": "98",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-SA-2.5.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-sa\/2.5\/legalcode"],
            "reference": ".\/CC-BY-SA-2.5.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-SA-3.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Share Alike 3.0",
            "referenceNumber": "99",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-SA-3.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-sa\/3.0\/legalcode"],
            "reference": ".\/CC-BY-SA-3.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC-BY-SA-4.0",
            "isOsiApproved": false,
            "name": "Creative Commons Attribution Share Alike 4.0",
            "referenceNumber": "100",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC-BY-SA-4.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/licenses\/by-sa\/4.0\/legalcode"],
            "reference": ".\/CC-BY-SA-4.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CC0-1.0",
            "isOsiApproved": false,
            "name": "Creative Commons Zero v1.0 Universal",
            "referenceNumber": "101",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CC0-1.0.json",
            "seeAlso": ["http:\/\/creativecommons.org\/publicdomain\/zero\/1.0\/legalcode"],
            "reference": ".\/CC0-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Crossword",
            "isOsiApproved": false,
            "name": "Crossword License",
            "referenceNumber": "102",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Crossword.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Crossword"],
            "reference": ".\/Crossword.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CrystalStacker",
            "isOsiApproved": false,
            "name": "CrystalStacker License",
            "referenceNumber": "103",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CrystalStacker.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing:CrystalStacker?rd=Licensing\/CrystalStacker"],
            "reference": ".\/CrystalStacker.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "CUA-OPL-1.0",
            "isOsiApproved": true,
            "name": "CUA Office Public License v1.0",
            "referenceNumber": "104",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/CUA-OPL-1.0.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/CUA-OPL-1.0"],
            "reference": ".\/CUA-OPL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Cube",
            "isOsiApproved": false,
            "name": "Cube License",
            "referenceNumber": "105",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Cube.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Cube"],
            "reference": ".\/Cube.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "curl",
            "isOsiApproved": false,
            "name": "curl License",
            "referenceNumber": "106",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/curl.json",
            "seeAlso": ["https:\/\/github.com\/bagder\/curl\/blob\/master\/COPYING"],
            "reference": ".\/curl.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "D-FSL-1.0",
            "isOsiApproved": false,
            "name": "Deutsche Freie Software Lizenz",
            "referenceNumber": "107",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/D-FSL-1.0.json",
            "seeAlso": ["http:\/\/www.dipp.nrw.de\/d-fsl\/lizenzen\/", "http:\/\/www.dipp.nrw.de\/d-fsl\/index_html\/lizenzen\/de\/D-FSL-1_0_de.txt"],
            "reference": ".\/D-FSL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "diffmark",
            "isOsiApproved": false,
            "name": "diffmark license",
            "referenceNumber": "108",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/diffmark.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/diffmark"],
            "reference": ".\/diffmark.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "WTFPL",
            "isOsiApproved": false,
            "name": "Do What The F*ck You Want To Public License",
            "referenceNumber": "109",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/WTFPL.json",
            "seeAlso": ["http:\/\/sam.zoy.org\/wtfpl\/COPYING"],
            "reference": ".\/WTFPL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "DOC",
            "isOsiApproved": false,
            "name": "DOC License",
            "referenceNumber": "110",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/DOC.json",
            "seeAlso": ["http:\/\/www.cs.wustl.edu\/~schmidt\/ACE-copying.html"],
            "reference": ".\/DOC.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Dotseqn",
            "isOsiApproved": false,
            "name": "Dotseqn License",
            "referenceNumber": "111",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Dotseqn.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Dotseqn"],
            "reference": ".\/Dotseqn.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "DSDP",
            "isOsiApproved": false,
            "name": "DSDP License",
            "referenceNumber": "112",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/DSDP.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/DSDP"],
            "reference": ".\/DSDP.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "dvipdfm",
            "isOsiApproved": false,
            "name": "dvipdfm License",
            "referenceNumber": "113",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/dvipdfm.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/dvipdfm"],
            "reference": ".\/dvipdfm.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "EPL-1.0",
            "isOsiApproved": true,
            "name": "Eclipse Public License 1.0",
            "referenceNumber": "114",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/EPL-1.0.json",
            "seeAlso": ["http:\/\/www.eclipse.org\/legal\/epl-v10.html", "http:\/\/www.opensource.org\/licenses\/EPL-1.0"],
            "reference": ".\/EPL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "ECL-1.0",
            "isOsiApproved": true,
            "name": "Educational Community License v1.0",
            "referenceNumber": "115",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/ECL-1.0.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/ECL-1.0"],
            "reference": ".\/ECL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "ECL-2.0",
            "isOsiApproved": true,
            "name": "Educational Community License v2.0",
            "referenceNumber": "116",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/ECL-2.0.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/ECL-2.0"],
            "reference": ".\/ECL-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "eGenix",
            "isOsiApproved": false,
            "name": "eGenix.com Public License 1.1.0",
            "referenceNumber": "117",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/eGenix.json",
            "seeAlso": ["http:\/\/www.egenix.com\/products\/eGenix.com-Public-License-1.1.0.pdf", "https:\/\/fedoraproject.org\/wiki\/Licensing\/eGenix.com_Public_License_1.1.0"],
            "reference": ".\/eGenix.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "EFL-1.0",
            "isOsiApproved": true,
            "name": "Eiffel Forum License v1.0",
            "referenceNumber": "118",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/EFL-1.0.json",
            "seeAlso": ["http:\/\/www.eiffel-nice.org\/license\/forum.txt", "http:\/\/opensource.org\/licenses\/EFL-1.0"],
            "reference": ".\/EFL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "EFL-2.0",
            "isOsiApproved": true,
            "name": "Eiffel Forum License v2.0",
            "referenceNumber": "119",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/EFL-2.0.json",
            "seeAlso": ["http:\/\/www.eiffel-nice.org\/license\/eiffel-forum-license-2.html", "http:\/\/opensource.org\/licenses\/EFL-2.0"],
            "reference": ".\/EFL-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "MIT-advertising",
            "isOsiApproved": false,
            "name": "Enlightenment License (e16)",
            "referenceNumber": "120",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/MIT-advertising.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/MIT_With_Advertising"],
            "reference": ".\/MIT-advertising.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "MIT-enna",
            "isOsiApproved": false,
            "name": "enna License",
            "referenceNumber": "121",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/MIT-enna.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/MIT#enna"],
            "reference": ".\/MIT-enna.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Entessa",
            "isOsiApproved": true,
            "name": "Entessa Public License v1.0",
            "referenceNumber": "122",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Entessa.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/Entessa"],
            "reference": ".\/Entessa.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "ErlPL-1.1",
            "isOsiApproved": false,
            "name": "Erlang Public License v1.1",
            "referenceNumber": "123",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/ErlPL-1.1.json",
            "seeAlso": ["http:\/\/www.erlang.org\/EPLICENSE"],
            "reference": ".\/ErlPL-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "EUDatagrid",
            "isOsiApproved": true,
            "name": "EU DataGrid Software License",
            "referenceNumber": "124",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/EUDatagrid.json",
            "seeAlso": ["http:\/\/eu-datagrid.web.cern.ch\/eu-datagrid\/license.html", "http:\/\/www.opensource.org\/licenses\/EUDatagrid"],
            "reference": ".\/EUDatagrid.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "EUPL-1.0",
            "isOsiApproved": false,
            "name": "European Union Public License 1.0",
            "referenceNumber": "125",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/EUPL-1.0.json",
            "seeAlso": ["http:\/\/ec.europa.eu\/idabc\/en\/document\/7330.html", "http:\/\/ec.europa.eu\/idabc\/servlets\/Doc027f.pdf?id=31096"],
            "reference": ".\/EUPL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "EUPL-1.1",
            "isOsiApproved": true,
            "name": "European Union Public License 1.1",
            "referenceNumber": "126",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/EUPL-1.1.json",
            "seeAlso": ["https:\/\/joinup.ec.europa.eu\/software\/page\/eupl\/licence-eupl", "https:\/\/joinup.ec.europa.eu\/system\/files\/EN\/EUPL%20v.1.1%20-%20Licence.pdf", "http:\/\/www.opensource.org\/licenses\/EUPL-1.1"],
            "reference": ".\/EUPL-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Eurosym",
            "isOsiApproved": false,
            "name": "Eurosym License",
            "referenceNumber": "127",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Eurosym.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Eurosym"],
            "reference": ".\/Eurosym.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Fair",
            "isOsiApproved": true,
            "name": "Fair License",
            "referenceNumber": "128",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Fair.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/Fair"],
            "reference": ".\/Fair.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "MIT-feh",
            "isOsiApproved": false,
            "name": "feh License",
            "referenceNumber": "129",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/MIT-feh.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/MIT#feh"],
            "reference": ".\/MIT-feh.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Frameworx-1.0",
            "isOsiApproved": true,
            "name": "Frameworx Open License 1.0",
            "referenceNumber": "130",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Frameworx-1.0.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/Frameworx-1.0"],
            "reference": ".\/Frameworx-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "FreeImage",
            "isOsiApproved": false,
            "name": "FreeImage Public License v1.0",
            "referenceNumber": "131",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/FreeImage.json",
            "seeAlso": ["http:\/\/freeimage.sourceforge.net\/freeimage-license.txt"],
            "reference": ".\/FreeImage.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "FTL",
            "isOsiApproved": false,
            "name": "Freetype Project License",
            "referenceNumber": "132",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/FTL.json",
            "seeAlso": ["http:\/\/freetype.fis.uniroma2.it\/FTL.TXT"],
            "reference": ".\/FTL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "FSFAP",
            "isOsiApproved": false,
            "name": "FSF All Permissive License",
            "referenceNumber": "133",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/FSFAP.json",
            "seeAlso": ["http:\/\/www.gnu.org\/prep\/maintain\/html_node\/License-Notices-for-Other-Files.html"],
            "reference": ".\/FSFAP.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "FSFUL",
            "isOsiApproved": false,
            "name": "FSF Unlimited License",
            "referenceNumber": "134",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/FSFUL.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/FSF_Unlimited_License"],
            "reference": ".\/FSFUL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "FSFULLR",
            "isOsiApproved": false,
            "name": "FSF Unlimited License (with License Retention)",
            "referenceNumber": "135",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/FSFULLR.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/FSF_Unlimited_License#License_Retention_Variant"],
            "reference": ".\/FSFULLR.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Giftware",
            "isOsiApproved": false,
            "name": "Giftware License",
            "referenceNumber": "136",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Giftware.json",
            "seeAlso": ["http:\/\/alleg.sourceforge.net\/\/license.html"],
            "reference": ".\/Giftware.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "GL2PS",
            "isOsiApproved": false,
            "name": "GL2PS License",
            "referenceNumber": "137",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/GL2PS.json",
            "seeAlso": ["http:\/\/www.geuz.org\/gl2ps\/COPYING.GL2PS"],
            "reference": ".\/GL2PS.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Glulxe",
            "isOsiApproved": false,
            "name": "Glulxe License",
            "referenceNumber": "138",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Glulxe.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Glulxe"],
            "reference": ".\/Glulxe.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "AGPL-3.0",
            "isOsiApproved": true,
            "name": "GNU Affero General Public License v3.0",
            "referenceNumber": "139",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/AGPL-3.0.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/agpl.txt", "http:\/\/www.opensource.org\/licenses\/AGPL-3.0"],
            "reference": ".\/AGPL-3.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "GFDL-1.1",
            "isOsiApproved": false,
            "name": "GNU Free Documentation License v1.1",
            "referenceNumber": "140",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/GFDL-1.1.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/old-licenses\/fdl-1.1.txt"],
            "reference": ".\/GFDL-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "GFDL-1.2",
            "isOsiApproved": false,
            "name": "GNU Free Documentation License v1.2",
            "referenceNumber": "141",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/GFDL-1.2.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/old-licenses\/fdl-1.2.txt"],
            "reference": ".\/GFDL-1.2.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "GFDL-1.3",
            "isOsiApproved": false,
            "name": "GNU Free Documentation License v1.3",
            "referenceNumber": "142",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/GFDL-1.3.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/fdl-1.3.txt"],
            "reference": ".\/GFDL-1.3.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "GPL-1.0",
            "isOsiApproved": false,
            "name": "GNU General Public License v1.0 only",
            "referenceNumber": "143",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/GPL-1.0.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/old-licenses\/gpl-1.0-standalone.html"],
            "reference": ".\/GPL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "GPL-2.0",
            "isOsiApproved": true,
            "name": "GNU General Public License v2.0 only",
            "referenceNumber": "144",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/GPL-2.0.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/old-licenses\/gpl-2.0-standalone.html", "http:\/\/www.opensource.org\/licenses\/GPL-2.0"],
            "reference": ".\/GPL-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "GPL-3.0",
            "isOsiApproved": true,
            "name": "GNU General Public License v3.0 only",
            "referenceNumber": "145",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/GPL-3.0.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/gpl-3.0-standalone.html", "http:\/\/www.opensource.org\/licenses\/GPL-3.0"],
            "reference": ".\/GPL-3.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "LGPL-2.1",
            "isOsiApproved": true,
            "name": "GNU Lesser General Public License v2.1 only",
            "referenceNumber": "146",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LGPL-2.1.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/old-licenses\/lgpl-2.1-standalone.html", "http:\/\/www.opensource.org\/licenses\/LGPL-2.1"],
            "reference": ".\/LGPL-2.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "LGPL-3.0",
            "isOsiApproved": true,
            "name": "GNU Lesser General Public License v3.0 only",
            "referenceNumber": "147",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LGPL-3.0.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/lgpl-3.0-standalone.html", "http:\/\/www.opensource.org\/licenses\/LGPL-3.0"],
            "reference": ".\/LGPL-3.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "LGPL-2.0",
            "isOsiApproved": true,
            "name": "GNU Library General Public License v2 only",
            "referenceNumber": "148",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LGPL-2.0.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/old-licenses\/lgpl-2.0-standalone.html"],
            "reference": ".\/LGPL-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "gnuplot",
            "isOsiApproved": false,
            "name": "gnuplot License",
            "referenceNumber": "149",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/gnuplot.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Gnuplot"],
            "reference": ".\/gnuplot.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "gSOAP-1.3b",
            "isOsiApproved": false,
            "name": "gSOAP Public License v1.3b",
            "referenceNumber": "150",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/gSOAP-1.3b.json",
            "seeAlso": ["http:\/\/www.cs.fsu.edu\/~engelen\/license.html"],
            "reference": ".\/gSOAP-1.3b.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "HaskellReport",
            "isOsiApproved": false,
            "name": "Haskell Language Report License",
            "referenceNumber": "151",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/HaskellReport.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Haskell_Language_Report_License"],
            "reference": ".\/HaskellReport.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "HPND",
            "isOsiApproved": true,
            "name": "Historic Permission Notice and Disclaimer",
            "referenceNumber": "152",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/HPND.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/HPND"],
            "reference": ".\/HPND.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "IBM-pibs",
            "isOsiApproved": false,
            "name": "IBM PowerPC Initialization and Boot Software",
            "referenceNumber": "153",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/IBM-pibs.json",
            "seeAlso": ["http:\/\/git.denx.de\/?p=u-boot.git;a=blob;f=arch\/powerpc\/cpu\/ppc4xx\/miiphy.c;h=297155fdafa064b955e53e9832de93bfb0cfb85b;hb=9fab4bf4cc077c21e43941866f3f2c196f28670d"],
            "reference": ".\/IBM-pibs.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "IPL-1.0",
            "isOsiApproved": true,
            "name": "IBM Public License v1.0",
            "referenceNumber": "154",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/IPL-1.0.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/IPL-1.0"],
            "reference": ".\/IPL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "ICU",
            "isOsiApproved": false,
            "name": "ICU License",
            "referenceNumber": "155",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/ICU.json",
            "seeAlso": ["http:\/\/source.icu-project.org\/repos\/icu\/icu\/trunk\/license.html"],
            "reference": ".\/ICU.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "ImageMagick",
            "isOsiApproved": false,
            "name": "ImageMagick License",
            "referenceNumber": "156",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/ImageMagick.json",
            "seeAlso": ["http:\/\/www.imagemagick.org\/script\/license.php"],
            "reference": ".\/ImageMagick.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "iMatix",
            "isOsiApproved": false,
            "name": "iMatix Standard Function Library Agreement",
            "referenceNumber": "157",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/iMatix.json",
            "seeAlso": ["http:\/\/legacy.imatix.com\/html\/sfl\/sfl4.htm#license"],
            "reference": ".\/iMatix.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Imlib2",
            "isOsiApproved": false,
            "name": "Imlib2 License",
            "referenceNumber": "158",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Imlib2.json",
            "seeAlso": ["http:\/\/trac.enlightenment.org\/e\/browser\/trunk\/imlib2\/COPYING"],
            "reference": ".\/Imlib2.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "IJG",
            "isOsiApproved": false,
            "name": "Independent JPEG Group License",
            "referenceNumber": "159",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/IJG.json",
            "seeAlso": ["http:\/\/dev.w3.org\/cvsweb\/Amaya\/libjpeg\/Attic\/README?rev=1.2"],
            "reference": ".\/IJG.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Info-ZIP",
            "isOsiApproved": false,
            "name": "Info-ZIP License",
            "referenceNumber": "160",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Info-ZIP.json",
            "seeAlso": ["http:\/\/www.info-zip.org\/license.html"],
            "reference": ".\/Info-ZIP.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Intel-ACPI",
            "isOsiApproved": false,
            "name": "Intel ACPI Software License Agreement",
            "referenceNumber": "161",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Intel-ACPI.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Intel_ACPI_Software_License_Agreement"],
            "reference": ".\/Intel-ACPI.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Intel",
            "isOsiApproved": true,
            "name": "Intel Open Source License",
            "referenceNumber": "162",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Intel.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/Intel"],
            "reference": ".\/Intel.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Interbase-1.0",
            "isOsiApproved": false,
            "name": "Interbase Public License v1.0",
            "referenceNumber": "163",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Interbase-1.0.json",
            "seeAlso": ["https:\/\/web.archive.org\/web\/20060319014854\/http:\/\/info.borland.com\/devsupport\/interbase\/opensource\/IPL.html"],
            "reference": ".\/Interbase-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "IPA",
            "isOsiApproved": true,
            "name": "IPA Font License",
            "referenceNumber": "164",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/IPA.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/IPA"],
            "reference": ".\/IPA.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "ISC",
            "isOsiApproved": true,
            "name": "ISC License",
            "referenceNumber": "165",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/ISC.json",
            "seeAlso": ["http:\/\/www.isc.org\/software\/license", "http:\/\/www.opensource.org\/licenses\/ISC"],
            "reference": ".\/ISC.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "JasPer-2.0",
            "isOsiApproved": false,
            "name": "JasPer License",
            "referenceNumber": "166",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/JasPer-2.0.json",
            "seeAlso": ["http:\/\/www.ece.uvic.ca\/~mdadams\/jasper\/LICENSE"],
            "reference": ".\/JasPer-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "JSON",
            "isOsiApproved": false,
            "name": "JSON License",
            "referenceNumber": "167",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/JSON.json",
            "seeAlso": ["http:\/\/www.json.org\/license.html"],
            "reference": ".\/JSON.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "LPPL-1.0",
            "isOsiApproved": false,
            "name": "LaTeX Project Public License v1.0",
            "referenceNumber": "168",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LPPL-1.0.json",
            "seeAlso": ["http:\/\/www.latex-project.org\/lppl\/lppl-1-0.txt"],
            "reference": ".\/LPPL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "LPPL-1.1",
            "isOsiApproved": false,
            "name": "LaTeX Project Public License v1.1",
            "referenceNumber": "169",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LPPL-1.1.json",
            "seeAlso": ["http:\/\/www.latex-project.org\/lppl\/lppl-1-1.txt"],
            "reference": ".\/LPPL-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "LPPL-1.2",
            "isOsiApproved": false,
            "name": "LaTeX Project Public License v1.2",
            "referenceNumber": "170",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LPPL-1.2.json",
            "seeAlso": ["http:\/\/www.latex-project.org\/lppl\/lppl-1-2.txt"],
            "reference": ".\/LPPL-1.2.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "LPPL-1.3a",
            "isOsiApproved": false,
            "name": "LaTeX Project Public License v1.3a",
            "referenceNumber": "171",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LPPL-1.3a.json",
            "seeAlso": ["http:\/\/www.latex-project.org\/lppl\/lppl-1-3a.txt"],
            "reference": ".\/LPPL-1.3a.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "LPPL-1.3c",
            "isOsiApproved": true,
            "name": "LaTeX Project Public License v1.3c",
            "referenceNumber": "172",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LPPL-1.3c.json",
            "seeAlso": ["http:\/\/www.latex-project.org\/lppl\/lppl-1-3c.txt", "http:\/\/www.opensource.org\/licenses\/LPPL-1.3c"],
            "reference": ".\/LPPL-1.3c.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Latex2e",
            "isOsiApproved": false,
            "name": "Latex2e License",
            "referenceNumber": "173",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Latex2e.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Latex2e"],
            "reference": ".\/Latex2e.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "BSD-3-Clause-LBNL",
            "isOsiApproved": false,
            "name": "Lawrence Berkeley National Labs BSD variant license",
            "referenceNumber": "174",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/BSD-3-Clause-LBNL.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/LBNLBSD"],
            "reference": ".\/BSD-3-Clause-LBNL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Leptonica",
            "isOsiApproved": false,
            "name": "Leptonica License",
            "referenceNumber": "175",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Leptonica.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Leptonica"],
            "reference": ".\/Leptonica.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "LGPLLR",
            "isOsiApproved": false,
            "name": "Lesser General Public License For Linguistic Resources",
            "referenceNumber": "176",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LGPLLR.json",
            "seeAlso": ["http:\/\/www-igm.univ-mlv.fr\/~unitex\/lgpllr.html"],
            "reference": ".\/LGPLLR.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Libpng",
            "isOsiApproved": false,
            "name": "libpng License",
            "referenceNumber": "177",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Libpng.json",
            "seeAlso": ["http:\/\/www.libpng.org\/pub\/png\/src\/libpng-LICENSE.txt"],
            "reference": ".\/Libpng.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "libtiff",
            "isOsiApproved": false,
            "name": "libtiff License",
            "referenceNumber": "178",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/libtiff.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/libtiff"],
            "reference": ".\/libtiff.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "LAL-1.2",
            "isOsiApproved": false,
            "name": "Licence Art Libre 1.2",
            "referenceNumber": "179",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LAL-1.2.json",
            "seeAlso": ["http:\/\/artlibre.org\/licence\/lal\/licence-art-libre-12\/"],
            "reference": ".\/LAL-1.2.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "LAL-1.3",
            "isOsiApproved": false,
            "name": "Licence Art Libre 1.3",
            "referenceNumber": "180",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LAL-1.3.json",
            "seeAlso": ["http:\/\/artlibre.org\/"],
            "reference": ".\/LAL-1.3.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "LiLiQ-P-1.1",
            "isOsiApproved": true,
            "name": "Licence Libre du Québec \u2013 Permissive version 1.1",
            "referenceNumber": "181",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LiLiQ-P-1.1.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/LiLiQ-P-1.1", "https:\/\/www.forge.gouv.qc.ca\/participez\/licence-logicielle\/licence-libre-du-quebec-liliq-en-francais\/licence-libre-du-quebec-liliq-en-francais-v1-0\/licence-libre-du-quebec-reciprocite-liliq-r-v1-0\/"],
            "reference": ".\/LiLiQ-P-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "LiLiQ-Rplus-1.1",
            "isOsiApproved": true,
            "name": "Licence Libre du Québec \u2013 Réciprocité forte version 1.1",
            "referenceNumber": "182",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LiLiQ-Rplus-1.1.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/LiLiQ-Rplus-1.1", "https:\/\/www.forge.gouv.qc.ca\/participez\/licence-logicielle\/licence-libre-du-quebec-liliq-en-francais\/licence-libre-du-quebec-reciprocite-forte-liliq-r-v1-1\/"],
            "reference": ".\/LiLiQ-Rplus-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "LiLiQ-R-1.1",
            "isOsiApproved": true,
            "name": "Licence Libre du Québec \u2013 Réciprocité version 1.1",
            "referenceNumber": "183",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LiLiQ-R-1.1.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/LiLiQ-R-1.1", "https:\/\/www.forge.gouv.qc.ca\/participez\/licence-logicielle\/licence-libre-du-quebec-liliq-en-francais\/licence-libre-du-quebec-reciprocite-liliq-r-v1-1\/"],
            "reference": ".\/LiLiQ-R-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "LPL-1.02",
            "isOsiApproved": true,
            "name": "Lucent Public License v1.02",
            "referenceNumber": "184",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LPL-1.02.json",
            "seeAlso": ["http:\/\/plan9.bell-labs.com\/plan9\/license.html", "http:\/\/www.opensource.org\/licenses\/LPL-1.02"],
            "reference": ".\/LPL-1.02.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "LPL-1.0",
            "isOsiApproved": true,
            "name": "Lucent Public License Version 1.0",
            "referenceNumber": "185",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LPL-1.0.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/LPL-1.0"],
            "reference": ".\/LPL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "MakeIndex",
            "isOsiApproved": false,
            "name": "MakeIndex License",
            "referenceNumber": "186",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/MakeIndex.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/MakeIndex"],
            "reference": ".\/MakeIndex.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "MTLL",
            "isOsiApproved": false,
            "name": "Matrix Template Library License",
            "referenceNumber": "187",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/MTLL.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Matrix_Template_Library_License"],
            "reference": ".\/MTLL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "MS-PL",
            "isOsiApproved": true,
            "name": "Microsoft Public License",
            "referenceNumber": "188",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/MS-PL.json",
            "seeAlso": ["http:\/\/www.microsoft.com\/opensource\/licenses.mspx", "http:\/\/www.opensource.org\/licenses\/MS-PL"],
            "reference": ".\/MS-PL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "MS-RL",
            "isOsiApproved": true,
            "name": "Microsoft Reciprocal License",
            "referenceNumber": "189",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/MS-RL.json",
            "seeAlso": ["http:\/\/www.microsoft.com\/opensource\/licenses.mspx", "http:\/\/www.opensource.org\/licenses\/MS-RL"],
            "reference": ".\/MS-RL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "MirOS",
            "isOsiApproved": true,
            "name": "MirOS Licence",
            "referenceNumber": "190",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/MirOS.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/MirOS"],
            "reference": ".\/MirOS.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "MITNFA",
            "isOsiApproved": false,
            "name": "MIT +no-false-attribs license",
            "referenceNumber": "191",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/MITNFA.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/MITNFA"],
            "reference": ".\/MITNFA.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "MIT",
            "isOsiApproved": true,
            "name": "MIT License",
            "referenceNumber": "192",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/MIT.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/MIT"],
            "reference": ".\/MIT.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Motosoto",
            "isOsiApproved": true,
            "name": "Motosoto License",
            "referenceNumber": "193",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Motosoto.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/Motosoto"],
            "reference": ".\/Motosoto.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "MPL-1.0",
            "isOsiApproved": true,
            "name": "Mozilla Public License 1.0",
            "referenceNumber": "194",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/MPL-1.0.json",
            "seeAlso": ["http:\/\/www.mozilla.org\/MPL\/MPL-1.0.html", "http:\/\/opensource.org\/licenses\/MPL-1.0"],
            "reference": ".\/MPL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "MPL-1.1",
            "isOsiApproved": true,
            "name": "Mozilla Public License 1.1",
            "referenceNumber": "195",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/MPL-1.1.json",
            "seeAlso": ["http:\/\/www.mozilla.org\/MPL\/MPL-1.1.html", "http:\/\/www.opensource.org\/licenses\/MPL-1.1"],
            "reference": ".\/MPL-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "MPL-2.0",
            "isOsiApproved": true,
            "name": "Mozilla Public License 2.0",
            "referenceNumber": "196",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/MPL-2.0.json",
            "seeAlso": ["http:\/\/www.mozilla.org\/MPL\/2.0\/", "http:\/\/opensource.org\/licenses\/MPL-2.0"],
            "reference": ".\/MPL-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "MPL-2.0-no-copyleft-exception",
            "isOsiApproved": true,
            "name": "Mozilla Public License 2.0 (no copyleft exception)",
            "referenceNumber": "197",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/MPL-2.0-no-copyleft-exception.json",
            "seeAlso": ["http:\/\/www.mozilla.org\/MPL\/2.0\/", "http:\/\/opensource.org\/licenses\/MPL-2.0"],
            "reference": ".\/MPL-2.0-no-copyleft-exception.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "mpich2",
            "isOsiApproved": false,
            "name": "mpich2 License",
            "referenceNumber": "198",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/mpich2.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/MIT"],
            "reference": ".\/mpich2.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Multics",
            "isOsiApproved": true,
            "name": "Multics License",
            "referenceNumber": "199",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Multics.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/Multics"],
            "reference": ".\/Multics.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Mup",
            "isOsiApproved": false,
            "name": "Mup License",
            "referenceNumber": "200",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Mup.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Mup"],
            "reference": ".\/Mup.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "NASA-1.3",
            "isOsiApproved": true,
            "name": "NASA Open Source Agreement 1.3",
            "referenceNumber": "201",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/NASA-1.3.json",
            "seeAlso": ["http:\/\/ti.arc.nasa.gov\/opensource\/nosa\/", "http:\/\/www.opensource.org\/licenses\/NASA-1.3"],
            "reference": ".\/NASA-1.3.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Naumen",
            "isOsiApproved": true,
            "name": "Naumen Public License",
            "referenceNumber": "202",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Naumen.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/Naumen"],
            "reference": ".\/Naumen.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "NBPL-1.0",
            "isOsiApproved": false,
            "name": "Net Boolean Public License v1",
            "referenceNumber": "203",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/NBPL-1.0.json",
            "seeAlso": ["http:\/\/www.openldap.org\/devel\/gitweb.cgi?p=openldap.git;a=blob;f=LICENSE;hb=37b4b3f6cc4bf34e1d3dec61e69914b9819d8894"],
            "reference": ".\/NBPL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "NetCDF",
            "isOsiApproved": false,
            "name": "NetCDF license",
            "referenceNumber": "204",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/NetCDF.json",
            "seeAlso": ["http:\/\/www.unidata.ucar.edu\/software\/netcdf\/copyright.html"],
            "reference": ".\/NetCDF.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "NGPL",
            "isOsiApproved": true,
            "name": "Nethack General Public License",
            "referenceNumber": "205",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/NGPL.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/NGPL"],
            "reference": ".\/NGPL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "NOSL",
            "isOsiApproved": false,
            "name": "Netizen Open Source License",
            "referenceNumber": "206",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/NOSL.json",
            "seeAlso": ["http:\/\/bits.netizen.com.au\/licenses\/NOSL\/nosl.txt"],
            "reference": ".\/NOSL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "NPL-1.0",
            "isOsiApproved": false,
            "name": "Netscape Public License v1.0",
            "referenceNumber": "207",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/NPL-1.0.json",
            "seeAlso": ["http:\/\/www.mozilla.org\/MPL\/NPL\/1.0\/"],
            "reference": ".\/NPL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "NPL-1.1",
            "isOsiApproved": false,
            "name": "Netscape Public License v1.1",
            "referenceNumber": "208",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/NPL-1.1.json",
            "seeAlso": ["http:\/\/www.mozilla.org\/MPL\/NPL\/1.1\/"],
            "reference": ".\/NPL-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Newsletr",
            "isOsiApproved": false,
            "name": "Newsletr License",
            "referenceNumber": "209",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Newsletr.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Newsletr"],
            "reference": ".\/Newsletr.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "NLPL",
            "isOsiApproved": false,
            "name": "No Limit Public License",
            "referenceNumber": "210",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/NLPL.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/NLPL"],
            "reference": ".\/NLPL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Nokia",
            "isOsiApproved": true,
            "name": "Nokia Open Source License",
            "referenceNumber": "211",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Nokia.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/nokia"],
            "reference": ".\/Nokia.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "NPOSL-3.0",
            "isOsiApproved": true,
            "name": "Non-Profit Open Software License 3.0",
            "referenceNumber": "212",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/NPOSL-3.0.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/NOSL3.0"],
            "reference": ".\/NPOSL-3.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "NLOD-1.0",
            "isOsiApproved": false,
            "name": "Norwegian Licence for Open Government Data",
            "referenceNumber": "213",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/NLOD-1.0.json",
            "seeAlso": ["http:\/\/data.norge.no\/nlod\/en\/1.0"],
            "reference": ".\/NLOD-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Noweb",
            "isOsiApproved": false,
            "name": "Noweb License",
            "referenceNumber": "214",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Noweb.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Noweb"],
            "reference": ".\/Noweb.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "NRL",
            "isOsiApproved": false,
            "name": "NRL License",
            "referenceNumber": "215",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/NRL.json",
            "seeAlso": ["http:\/\/web.mit.edu\/network\/isakmp\/nrllicense.html"],
            "reference": ".\/NRL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "NTP",
            "isOsiApproved": true,
            "name": "NTP License",
            "referenceNumber": "216",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/NTP.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/NTP"],
            "reference": ".\/NTP.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Nunit",
            "isOsiApproved": false,
            "name": "Nunit License",
            "referenceNumber": "217",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Nunit.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Nunit"],
            "reference": ".\/Nunit.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OCLC-2.0",
            "isOsiApproved": true,
            "name": "OCLC Research Public License 2.0",
            "referenceNumber": "218",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OCLC-2.0.json",
            "seeAlso": ["http:\/\/www.oclc.org\/research\/activities\/software\/license\/v2final.htm", "http:\/\/www.opensource.org\/licenses\/OCLC-2.0"],
            "reference": ".\/OCLC-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "ODbL-1.0",
            "isOsiApproved": false,
            "name": "ODC Open Database License v1.0",
            "referenceNumber": "219",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/ODbL-1.0.json",
            "seeAlso": ["http:\/\/www.opendatacommons.org\/licenses\/odbl\/1.0\/"],
            "reference": ".\/ODbL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "PDDL-1.0",
            "isOsiApproved": false,
            "name": "ODC Public Domain Dedication & License 1.0",
            "referenceNumber": "220",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/PDDL-1.0.json",
            "seeAlso": ["http:\/\/opendatacommons.org\/licenses\/pddl\/1.0\/"],
            "reference": ".\/PDDL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OCCT-PL",
            "isOsiApproved": false,
            "name": "Open CASCADE Technology Public License",
            "referenceNumber": "221",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OCCT-PL.json",
            "seeAlso": ["http:\/\/www.opencascade.com\/content\/occt-public-license"],
            "reference": ".\/OCCT-PL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OGTSL",
            "isOsiApproved": true,
            "name": "Open Group Test Suite License",
            "referenceNumber": "222",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OGTSL.json",
            "seeAlso": ["http:\/\/www.opengroup.org\/testing\/downloads\/The_Open_Group_TSL.txt", "http:\/\/www.opensource.org\/licenses\/OGTSL"],
            "reference": ".\/OGTSL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OLDAP-2.2.2",
            "isOsiApproved": false,
            "name": "Open LDAP Public License  2.2.2",
            "referenceNumber": "223",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OLDAP-2.2.2.json",
            "seeAlso": ["http:\/\/www.openldap.org\/devel\/gitweb.cgi?p=openldap.git;a=blob;f=LICENSE;hb=df2cc1e21eb7c160695f5b7cffd6296c151ba188"],
            "reference": ".\/OLDAP-2.2.2.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OLDAP-1.1",
            "isOsiApproved": false,
            "name": "Open LDAP Public License v1.1",
            "referenceNumber": "224",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OLDAP-1.1.json",
            "seeAlso": ["http:\/\/www.openldap.org\/devel\/gitweb.cgi?p=openldap.git;a=blob;f=LICENSE;hb=806557a5ad59804ef3a44d5abfbe91d706b0791f"],
            "reference": ".\/OLDAP-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OLDAP-1.2",
            "isOsiApproved": false,
            "name": "Open LDAP Public License v1.2",
            "referenceNumber": "225",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OLDAP-1.2.json",
            "seeAlso": ["http:\/\/www.openldap.org\/devel\/gitweb.cgi?p=openldap.git;a=blob;f=LICENSE;hb=42b0383c50c299977b5893ee695cf4e486fb0dc7"],
            "reference": ".\/OLDAP-1.2.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OLDAP-1.3",
            "isOsiApproved": false,
            "name": "Open LDAP Public License v1.3",
            "referenceNumber": "226",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OLDAP-1.3.json",
            "seeAlso": ["http:\/\/www.openldap.org\/devel\/gitweb.cgi?p=openldap.git;a=blob;f=LICENSE;hb=e5f8117f0ce088d0bd7a8e18ddf37eaa40eb09b1"],
            "reference": ".\/OLDAP-1.3.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OLDAP-1.4",
            "isOsiApproved": false,
            "name": "Open LDAP Public License v1.4",
            "referenceNumber": "227",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OLDAP-1.4.json",
            "seeAlso": ["http:\/\/www.openldap.org\/devel\/gitweb.cgi?p=openldap.git;a=blob;f=LICENSE;hb=c9f95c2f3f2ffb5e0ae55fe7388af75547660941"],
            "reference": ".\/OLDAP-1.4.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OLDAP-2.0",
            "isOsiApproved": false,
            "name": "Open LDAP Public License v2.0 (or possibly 2.0A and 2.0B)",
            "referenceNumber": "228",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OLDAP-2.0.json",
            "seeAlso": ["http:\/\/www.openldap.org\/devel\/gitweb.cgi?p=openldap.git;a=blob;f=LICENSE;hb=cbf50f4e1185a21abd4c0a54d3f4341fe28f36ea"],
            "reference": ".\/OLDAP-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OLDAP-2.0.1",
            "isOsiApproved": false,
            "name": "Open LDAP Public License v2.0.1",
            "referenceNumber": "229",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OLDAP-2.0.1.json",
            "seeAlso": ["http:\/\/www.openldap.org\/devel\/gitweb.cgi?p=openldap.git;a=blob;f=LICENSE;hb=b6d68acd14e51ca3aab4428bf26522aa74873f0e"],
            "reference": ".\/OLDAP-2.0.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OLDAP-2.1",
            "isOsiApproved": false,
            "name": "Open LDAP Public License v2.1",
            "referenceNumber": "230",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OLDAP-2.1.json",
            "seeAlso": ["http:\/\/www.openldap.org\/devel\/gitweb.cgi?p=openldap.git;a=blob;f=LICENSE;hb=b0d176738e96a0d3b9f85cb51e140a86f21be715"],
            "reference": ".\/OLDAP-2.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OLDAP-2.2",
            "isOsiApproved": false,
            "name": "Open LDAP Public License v2.2",
            "referenceNumber": "231",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OLDAP-2.2.json",
            "seeAlso": ["http:\/\/www.openldap.org\/devel\/gitweb.cgi?p=openldap.git;a=blob;f=LICENSE;hb=470b0c18ec67621c85881b2733057fecf4a1acc3"],
            "reference": ".\/OLDAP-2.2.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OLDAP-2.2.1",
            "isOsiApproved": false,
            "name": "Open LDAP Public License v2.2.1",
            "referenceNumber": "232",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OLDAP-2.2.1.json",
            "seeAlso": ["http:\/\/www.openldap.org\/devel\/gitweb.cgi?p=openldap.git;a=blob;f=LICENSE;hb=4bc786f34b50aa301be6f5600f58a980070f481e"],
            "reference": ".\/OLDAP-2.2.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OLDAP-2.3",
            "isOsiApproved": false,
            "name": "Open LDAP Public License v2.3",
            "referenceNumber": "233",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OLDAP-2.3.json",
            "seeAlso": ["http:\/\/www.openldap.org\/devel\/gitweb.cgi?p=openldap.git;a=blob;f=LICENSE;hb=d32cf54a32d581ab475d23c810b0a7fbaf8d63c3"],
            "reference": ".\/OLDAP-2.3.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OLDAP-2.4",
            "isOsiApproved": false,
            "name": "Open LDAP Public License v2.4",
            "referenceNumber": "234",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OLDAP-2.4.json",
            "seeAlso": ["http:\/\/www.openldap.org\/devel\/gitweb.cgi?p=openldap.git;a=blob;f=LICENSE;hb=cd1284c4a91a8a380d904eee68d1583f989ed386"],
            "reference": ".\/OLDAP-2.4.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OLDAP-2.5",
            "isOsiApproved": false,
            "name": "Open LDAP Public License v2.5",
            "referenceNumber": "235",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OLDAP-2.5.json",
            "seeAlso": ["http:\/\/www.openldap.org\/devel\/gitweb.cgi?p=openldap.git;a=blob;f=LICENSE;hb=6852b9d90022e8593c98205413380536b1b5a7cf"],
            "reference": ".\/OLDAP-2.5.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OLDAP-2.6",
            "isOsiApproved": false,
            "name": "Open LDAP Public License v2.6",
            "referenceNumber": "236",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OLDAP-2.6.json",
            "seeAlso": ["http:\/\/www.openldap.org\/devel\/gitweb.cgi?p=openldap.git;a=blob;f=LICENSE;hb=1cae062821881f41b73012ba816434897abf4205"],
            "reference": ".\/OLDAP-2.6.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OLDAP-2.7",
            "isOsiApproved": false,
            "name": "Open LDAP Public License v2.7",
            "referenceNumber": "237",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OLDAP-2.7.json",
            "seeAlso": ["http:\/\/www.openldap.org\/devel\/gitweb.cgi?p=openldap.git;a=blob;f=LICENSE;hb=47c2415c1df81556eeb39be6cad458ef87c534a2"],
            "reference": ".\/OLDAP-2.7.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OLDAP-2.8",
            "isOsiApproved": false,
            "name": "Open LDAP Public License v2.8",
            "referenceNumber": "238",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OLDAP-2.8.json",
            "seeAlso": ["http:\/\/www.openldap.org\/software\/release\/license.html"],
            "reference": ".\/OLDAP-2.8.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OML",
            "isOsiApproved": false,
            "name": "Open Market License",
            "referenceNumber": "239",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OML.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Open_Market_License"],
            "reference": ".\/OML.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OPL-1.0",
            "isOsiApproved": false,
            "name": "Open Public License v1.0",
            "referenceNumber": "240",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OPL-1.0.json",
            "seeAlso": ["http:\/\/old.koalateam.com\/jackaroo\/OPL_1_0.TXT", "https:\/\/fedoraproject.org\/wiki\/Licensing\/Open_Public_License"],
            "reference": ".\/OPL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OSL-1.0",
            "isOsiApproved": true,
            "name": "Open Software License 1.0",
            "referenceNumber": "241",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OSL-1.0.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/OSL-1.0"],
            "reference": ".\/OSL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OSL-1.1",
            "isOsiApproved": false,
            "name": "Open Software License 1.1",
            "referenceNumber": "242",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OSL-1.1.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/OSL1.1"],
            "reference": ".\/OSL-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OSL-2.0",
            "isOsiApproved": true,
            "name": "Open Software License 2.0",
            "referenceNumber": "243",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OSL-2.0.json",
            "seeAlso": ["http:\/\/web.archive.org\/web\/20041020171434\/http:\/\/www.rosenlaw.com\/osl2.0.html"],
            "reference": ".\/OSL-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OSL-2.1",
            "isOsiApproved": true,
            "name": "Open Software License 2.1",
            "referenceNumber": "244",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OSL-2.1.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/OSL-2.1", "http:\/\/web.archive.org\/web\/20050212003940\/http:\/\/www.rosenlaw.com\/osl21.htm"],
            "reference": ".\/OSL-2.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OSL-3.0",
            "isOsiApproved": true,
            "name": "Open Software License 3.0",
            "referenceNumber": "245",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OSL-3.0.json",
            "seeAlso": ["http:\/\/www.rosenlaw.com\/OSL3.0.htm", "http:\/\/www.opensource.org\/licenses\/OSL-3.0"],
            "reference": ".\/OSL-3.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OpenSSL",
            "isOsiApproved": false,
            "name": "OpenSSL License",
            "referenceNumber": "246",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OpenSSL.json",
            "seeAlso": ["http:\/\/www.openssl.org\/source\/license.html"],
            "reference": ".\/OpenSSL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OSET-PL-2.1",
            "isOsiApproved": true,
            "name": "OSET Public License version 2.1",
            "referenceNumber": "247",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OSET-PL-2.1.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/OPL-2.1", "http:\/\/www.osetfoundation.org\/public-license\/#"],
            "reference": ".\/OSET-PL-2.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "PHP-3.0",
            "isOsiApproved": true,
            "name": "PHP License v3.0",
            "referenceNumber": "248",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/PHP-3.0.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/PHP-3.0", "http:\/\/www.php.net\/license\/3_0.txt"],
            "reference": ".\/PHP-3.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "PHP-3.01",
            "isOsiApproved": false,
            "name": "PHP License v3.01",
            "referenceNumber": "249",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/PHP-3.01.json",
            "seeAlso": ["http:\/\/www.php.net\/license\/3_01.txt"],
            "reference": ".\/PHP-3.01.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Plexus",
            "isOsiApproved": false,
            "name": "Plexus Classworlds License",
            "referenceNumber": "250",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Plexus.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Plexus_Classworlds_License"],
            "reference": ".\/Plexus.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "PostgreSQL",
            "isOsiApproved": true,
            "name": "PostgreSQL License",
            "referenceNumber": "251",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/PostgreSQL.json",
            "seeAlso": ["http:\/\/www.postgresql.org\/about\/licence", "http:\/\/www.opensource.org\/licenses\/PostgreSQL"],
            "reference": ".\/PostgreSQL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "psfrag",
            "isOsiApproved": false,
            "name": "psfrag License",
            "referenceNumber": "252",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/psfrag.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/psfrag"],
            "reference": ".\/psfrag.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "psutils",
            "isOsiApproved": false,
            "name": "psutils License",
            "referenceNumber": "253",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/psutils.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/psutils"],
            "reference": ".\/psutils.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Python-2.0",
            "isOsiApproved": true,
            "name": "Python License 2.0",
            "referenceNumber": "254",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Python-2.0.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/Python-2.0"],
            "reference": ".\/Python-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "QPL-1.0",
            "isOsiApproved": true,
            "name": "Q Public License 1.0",
            "referenceNumber": "255",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/QPL-1.0.json",
            "seeAlso": ["http:\/\/doc.qt.nokia.com\/3.3\/license.html", "http:\/\/www.opensource.org\/licenses\/QPL-1.0"],
            "reference": ".\/QPL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Qhull",
            "isOsiApproved": false,
            "name": "Qhull License",
            "referenceNumber": "256",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Qhull.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Qhull"],
            "reference": ".\/Qhull.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Rdisc",
            "isOsiApproved": false,
            "name": "Rdisc License",
            "referenceNumber": "257",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Rdisc.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Rdisc_License"],
            "reference": ".\/Rdisc.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "RPSL-1.0",
            "isOsiApproved": true,
            "name": "RealNetworks Public Source License v1.0",
            "referenceNumber": "258",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/RPSL-1.0.json",
            "seeAlso": ["https:\/\/helixcommunity.org\/content\/rpsl", "http:\/\/www.opensource.org\/licenses\/RPSL-1.0"],
            "reference": ".\/RPSL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "RPL-1.1",
            "isOsiApproved": true,
            "name": "Reciprocal Public License 1.1",
            "referenceNumber": "259",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/RPL-1.1.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/RPL-1.1"],
            "reference": ".\/RPL-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "RPL-1.5",
            "isOsiApproved": true,
            "name": "Reciprocal Public License 1.5",
            "referenceNumber": "260",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/RPL-1.5.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/RPL-1.5"],
            "reference": ".\/RPL-1.5.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "RHeCos-1.1",
            "isOsiApproved": false,
            "name": "Red Hat eCos Public License v1.1",
            "referenceNumber": "261",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/RHeCos-1.1.json",
            "seeAlso": ["http:\/\/ecos.sourceware.org\/old-license.html"],
            "reference": ".\/RHeCos-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "RSCPL",
            "isOsiApproved": true,
            "name": "Ricoh Source Code Public License",
            "referenceNumber": "262",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/RSCPL.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/RSCPL"],
            "reference": ".\/RSCPL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "RSA-MD",
            "isOsiApproved": false,
            "name": "RSA Message-Digest License ",
            "referenceNumber": "263",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/RSA-MD.json",
            "seeAlso": ["http:\/\/www.faqs.org\/rfcs\/rfc1321.html"],
            "reference": ".\/RSA-MD.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Ruby",
            "isOsiApproved": false,
            "name": "Ruby License",
            "referenceNumber": "264",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Ruby.json",
            "seeAlso": ["http:\/\/www.ruby-lang.org\/en\/LICENSE.txt"],
            "reference": ".\/Ruby.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "SAX-PD",
            "isOsiApproved": false,
            "name": "Sax Public Domain Notice",
            "referenceNumber": "265",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/SAX-PD.json",
            "seeAlso": ["http:\/\/www.saxproject.org\/copying.html"],
            "reference": ".\/SAX-PD.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Saxpath",
            "isOsiApproved": false,
            "name": "Saxpath License",
            "referenceNumber": "266",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Saxpath.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Saxpath_License"],
            "reference": ".\/Saxpath.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "SCEA",
            "isOsiApproved": false,
            "name": "SCEA Shared Source License",
            "referenceNumber": "267",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/SCEA.json",
            "seeAlso": ["http:\/\/research.scea.com\/scea_shared_source_license.html"],
            "reference": ".\/SCEA.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "SWL",
            "isOsiApproved": false,
            "name": "Scheme Widget Library (SWL) Software License Agreement",
            "referenceNumber": "268",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/SWL.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/SWL"],
            "reference": ".\/SWL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "SMPPL",
            "isOsiApproved": false,
            "name": "Secure Messaging Protocol Public License",
            "referenceNumber": "269",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/SMPPL.json",
            "seeAlso": ["https:\/\/github.com\/dcblake\/SMP\/blob\/master\/Documentation\/License.txt"],
            "reference": ".\/SMPPL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Sendmail",
            "isOsiApproved": false,
            "name": "Sendmail License",
            "referenceNumber": "270",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Sendmail.json",
            "seeAlso": ["http:\/\/www.sendmail.com\/pdfs\/open_source\/sendmail_license.pdf"],
            "reference": ".\/Sendmail.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "SGI-B-1.0",
            "isOsiApproved": false,
            "name": "SGI Free Software License B v1.0",
            "referenceNumber": "271",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/SGI-B-1.0.json",
            "seeAlso": ["http:\/\/oss.sgi.com\/projects\/FreeB\/SGIFreeSWLicB.1.0.html"],
            "reference": ".\/SGI-B-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "SGI-B-1.1",
            "isOsiApproved": false,
            "name": "SGI Free Software License B v1.1",
            "referenceNumber": "272",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/SGI-B-1.1.json",
            "seeAlso": ["http:\/\/oss.sgi.com\/projects\/FreeB\/"],
            "reference": ".\/SGI-B-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "SGI-B-2.0",
            "isOsiApproved": false,
            "name": "SGI Free Software License B v2.0",
            "referenceNumber": "273",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/SGI-B-2.0.json",
            "seeAlso": ["http:\/\/oss.sgi.com\/projects\/FreeB\/SGIFreeSWLicB.2.0.pdf"],
            "reference": ".\/SGI-B-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OFL-1.0",
            "isOsiApproved": false,
            "name": "SIL Open Font License 1.0",
            "referenceNumber": "274",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OFL-1.0.json",
            "seeAlso": ["http:\/\/scripts.sil.org\/cms\/scripts\/page.php?item_id=OFL10_web"],
            "reference": ".\/OFL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "OFL-1.1",
            "isOsiApproved": true,
            "name": "SIL Open Font License 1.1",
            "referenceNumber": "275",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/OFL-1.1.json",
            "seeAlso": ["http:\/\/scripts.sil.org\/cms\/scripts\/page.php?item_id=OFL_web", "http:\/\/www.opensource.org\/licenses\/OFL-1.1"],
            "reference": ".\/OFL-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "SimPL-2.0",
            "isOsiApproved": true,
            "name": "Simple Public License 2.0",
            "referenceNumber": "276",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/SimPL-2.0.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/SimPL-2.0"],
            "reference": ".\/SimPL-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Sleepycat",
            "isOsiApproved": true,
            "name": "Sleepycat License",
            "referenceNumber": "277",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Sleepycat.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/Sleepycat"],
            "reference": ".\/Sleepycat.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "SNIA",
            "isOsiApproved": false,
            "name": "SNIA Public License 1.1",
            "referenceNumber": "278",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/SNIA.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/SNIA_Public_License"],
            "reference": ".\/SNIA.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Spencer-86",
            "isOsiApproved": false,
            "name": "Spencer License 86",
            "referenceNumber": "279",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Spencer-86.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Henry_Spencer_Reg-Ex_Library_License"],
            "reference": ".\/Spencer-86.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Spencer-94",
            "isOsiApproved": false,
            "name": "Spencer License 94",
            "referenceNumber": "280",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Spencer-94.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Henry_Spencer_Reg-Ex_Library_License"],
            "reference": ".\/Spencer-94.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Spencer-99",
            "isOsiApproved": false,
            "name": "Spencer License 99",
            "referenceNumber": "281",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Spencer-99.json",
            "seeAlso": ["http:\/\/www.opensource.apple.com\/source\/tcl\/tcl-5\/tcl\/generic\/regfronts.c"],
            "reference": ".\/Spencer-99.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "SMLNJ",
            "isOsiApproved": false,
            "name": "Standard ML of New Jersey License",
            "referenceNumber": "282",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/SMLNJ.json",
            "seeAlso": ["http:\/\/www.smlnj.org\/\/license.html"],
            "reference": ".\/SMLNJ.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "SugarCRM-1.1.3",
            "isOsiApproved": false,
            "name": "SugarCRM Public License v1.1.3",
            "referenceNumber": "283",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/SugarCRM-1.1.3.json",
            "seeAlso": ["http:\/\/www.sugarcrm.com\/crm\/SPL"],
            "reference": ".\/SugarCRM-1.1.3.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "SISSL",
            "isOsiApproved": true,
            "name": "Sun Industry Standards Source License v1.1",
            "referenceNumber": "284",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/SISSL.json",
            "seeAlso": ["http:\/\/www.openoffice.org\/licenses\/sissl_license.html", "http:\/\/opensource.org\/licenses\/SISSL"],
            "reference": ".\/SISSL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "SISSL-1.2",
            "isOsiApproved": false,
            "name": "Sun Industry Standards Source License v1.2",
            "referenceNumber": "285",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/SISSL-1.2.json",
            "seeAlso": ["http:\/\/gridscheduler.sourceforge.net\/Gridengine_SISSL_license.html"],
            "reference": ".\/SISSL-1.2.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "SPL-1.0",
            "isOsiApproved": true,
            "name": "Sun Public License v1.0",
            "referenceNumber": "286",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/SPL-1.0.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/SPL-1.0"],
            "reference": ".\/SPL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Watcom-1.0",
            "isOsiApproved": true,
            "name": "Sybase Open Watcom Public License 1.0",
            "referenceNumber": "287",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Watcom-1.0.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/Watcom-1.0"],
            "reference": ".\/Watcom-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "TCL",
            "isOsiApproved": false,
            "name": "TCL\/TK License",
            "referenceNumber": "288",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/TCL.json",
            "seeAlso": ["http:\/\/www.tcl.tk\/software\/tcltk\/license.html", "https:\/\/fedoraproject.org\/wiki\/Licensing\/TCL"],
            "reference": ".\/TCL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Unlicense",
            "isOsiApproved": false,
            "name": "The Unlicense",
            "referenceNumber": "289",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Unlicense.json",
            "seeAlso": ["http:\/\/unlicense.org\/"],
            "reference": ".\/Unlicense.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "TMate",
            "isOsiApproved": false,
            "name": "TMate Open Source License",
            "referenceNumber": "290",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/TMate.json",
            "seeAlso": ["http:\/\/svnkit.com\/license.html"],
            "reference": ".\/TMate.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "TORQUE-1.1",
            "isOsiApproved": false,
            "name": "TORQUE v2.5+ Software License v1.1",
            "referenceNumber": "291",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/TORQUE-1.1.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/TORQUEv1.1"],
            "reference": ".\/TORQUE-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "TOSL",
            "isOsiApproved": false,
            "name": "Trusster Open Source License",
            "referenceNumber": "292",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/TOSL.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/TOSL"],
            "reference": ".\/TOSL.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Unicode-TOU",
            "isOsiApproved": false,
            "name": "Unicode Terms of Use",
            "referenceNumber": "293",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Unicode-TOU.json",
            "seeAlso": ["http:\/\/www.unicode.org\/copyright.html"],
            "reference": ".\/Unicode-TOU.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "UPL-1.0",
            "isOsiApproved": true,
            "name": "Universal Permissive License v1.0",
            "referenceNumber": "294",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/UPL-1.0.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/UPL"],
            "reference": ".\/UPL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "NCSA",
            "isOsiApproved": true,
            "name": "University of Illinois\/NCSA Open Source License",
            "referenceNumber": "295",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/NCSA.json",
            "seeAlso": ["http:\/\/otm.illinois.edu\/uiuc_openSource", "http:\/\/www.opensource.org\/licenses\/NCSA"],
            "reference": ".\/NCSA.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Vim",
            "isOsiApproved": false,
            "name": "Vim License",
            "referenceNumber": "296",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Vim.json",
            "seeAlso": ["http:\/\/vimdoc.sourceforge.net\/htmldoc\/uganda.html"],
            "reference": ".\/Vim.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "VOSTROM",
            "isOsiApproved": false,
            "name": "VOSTROM Public License for Open Source",
            "referenceNumber": "297",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/VOSTROM.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/VOSTROM"],
            "reference": ".\/VOSTROM.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "VSL-1.0",
            "isOsiApproved": true,
            "name": "Vovida Software License v1.0",
            "referenceNumber": "298",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/VSL-1.0.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/VSL-1.0"],
            "reference": ".\/VSL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "W3C-19980720",
            "isOsiApproved": false,
            "name": "W3C Software Notice and License (1998-07-20)",
            "referenceNumber": "299",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/W3C-19980720.json",
            "seeAlso": ["http:\/\/www.w3.org\/Consortium\/Legal\/copyright-software-19980720.html"],
            "reference": ".\/W3C-19980720.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "W3C",
            "isOsiApproved": true,
            "name": "W3C Software Notice and License (2002-12-31)",
            "referenceNumber": "300",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/W3C.json",
            "seeAlso": ["http:\/\/www.w3.org\/Consortium\/Legal\/2002\/copyright-software-20021231.html", "http:\/\/www.opensource.org\/licenses\/W3C"],
            "reference": ".\/W3C.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Wsuipa",
            "isOsiApproved": false,
            "name": "Wsuipa License",
            "referenceNumber": "301",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Wsuipa.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Wsuipa"],
            "reference": ".\/Wsuipa.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Xnet",
            "isOsiApproved": true,
            "name": "X.Net License",
            "referenceNumber": "302",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Xnet.json",
            "seeAlso": ["http:\/\/opensource.org\/licenses\/Xnet"],
            "reference": ".\/Xnet.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "X11",
            "isOsiApproved": false,
            "name": "X11 License",
            "referenceNumber": "303",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/X11.json",
            "seeAlso": ["http:\/\/www.xfree86.org\/3.3.6\/COPYRIGHT2.html#3"],
            "reference": ".\/X11.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Xerox",
            "isOsiApproved": false,
            "name": "Xerox License",
            "referenceNumber": "304",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Xerox.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Xerox"],
            "reference": ".\/Xerox.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "XFree86-1.1",
            "isOsiApproved": false,
            "name": "XFree86 License 1.1",
            "referenceNumber": "305",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/XFree86-1.1.json",
            "seeAlso": ["http:\/\/www.xfree86.org\/current\/LICENSE4.html"],
            "reference": ".\/XFree86-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "xinetd",
            "isOsiApproved": false,
            "name": "xinetd License",
            "referenceNumber": "306",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/xinetd.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Xinetd_License"],
            "reference": ".\/xinetd.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "xpp",
            "isOsiApproved": false,
            "name": "XPP License",
            "referenceNumber": "307",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/xpp.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/xpp"],
            "reference": ".\/xpp.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "XSkat",
            "isOsiApproved": false,
            "name": "XSkat License",
            "referenceNumber": "308",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/XSkat.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/XSkat_License"],
            "reference": ".\/XSkat.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "YPL-1.0",
            "isOsiApproved": false,
            "name": "Yahoo! Public License v1.0",
            "referenceNumber": "309",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/YPL-1.0.json",
            "seeAlso": ["http:\/\/www.zimbra.com\/license\/yahoo_public_license_1.0.html"],
            "reference": ".\/YPL-1.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "YPL-1.1",
            "isOsiApproved": false,
            "name": "Yahoo! Public License v1.1",
            "referenceNumber": "310",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/YPL-1.1.json",
            "seeAlso": ["http:\/\/www.zimbra.com\/license\/yahoo_public_license_1.1.html"],
            "reference": ".\/YPL-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Zed",
            "isOsiApproved": false,
            "name": "Zed License",
            "referenceNumber": "311",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Zed.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/Zed"],
            "reference": ".\/Zed.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Zend-2.0",
            "isOsiApproved": false,
            "name": "Zend License v2.0",
            "referenceNumber": "312",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Zend-2.0.json",
            "seeAlso": ["https:\/\/web.archive.org\/web\/20130517195954\/http:\/\/www.zend.com\/license\/2_00.txt"],
            "reference": ".\/Zend-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Zimbra-1.3",
            "isOsiApproved": false,
            "name": "Zimbra Public License v1.3",
            "referenceNumber": "313",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Zimbra-1.3.json",
            "seeAlso": [""],
            "reference": ".\/Zimbra-1.3.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Zimbra-1.4",
            "isOsiApproved": false,
            "name": "Zimbra Public License v1.4",
            "referenceNumber": "314",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Zimbra-1.4.json",
            "seeAlso": ["http:\/\/www.zimbra.com\/legal\/zimbra-public-license-1-4"],
            "reference": ".\/Zimbra-1.4.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "Zlib",
            "isOsiApproved": true,
            "name": "zlib License",
            "referenceNumber": "315",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/Zlib.json",
            "seeAlso": ["http:\/\/www.zlib.net\/zlib_license.html", "http:\/\/www.opensource.org\/licenses\/Zlib"],
            "reference": ".\/Zlib.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "zlib-acknowledgement",
            "isOsiApproved": false,
            "name": "zlib\/libpng License with Acknowledgement",
            "referenceNumber": "316",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/zlib-acknowledgement.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing\/ZlibWithAcknowledgement"],
            "reference": ".\/zlib-acknowledgement.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "ZPL-1.1",
            "isOsiApproved": false,
            "name": "Zope Public License 1.1",
            "referenceNumber": "317",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/ZPL-1.1.json",
            "seeAlso": ["http:\/\/old.zope.org\/Resources\/License\/ZPL-1.1"],
            "reference": ".\/ZPL-1.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "ZPL-2.0",
            "isOsiApproved": true,
            "name": "Zope Public License 2.0",
            "referenceNumber": "318",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/ZPL-2.0.json",
            "seeAlso": ["http:\/\/old.zope.org\/Resources\/License\/ZPL-2.0", "http:\/\/opensource.org\/licenses\/ZPL-2.0"],
            "reference": ".\/ZPL-2.0.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "ZPL-2.1",
            "isOsiApproved": false,
            "name": "Zope Public License 2.1",
            "referenceNumber": "319",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/ZPL-2.1.json",
            "seeAlso": ["http:\/\/old.zope.org\/Resources\/ZPL\/"],
            "reference": ".\/ZPL-2.1.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "BSD-3-Clause-No-Nuclear-License",
            "isOsiApproved": false,
            "name": "BSD 3-Clause No Nuclear License",
            "referenceNumber": "320",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/BSD-3-Clause-No-Nuclear-License.json",
            "seeAlso": ["http:\/\/download.oracle.com\/otn-pub\/java\/licenses\/bsd.txt?AuthParam=1467140197_43d516ce1776bd08a58235a7785be1cc"],
            "reference": ".\/BSD-3-Clause-No-Nuclear-License.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "BSD-3-Clause-No-Nuclear-Warranty",
            "isOsiApproved": false,
            "name": "BSD 3-Clause No Nuclear Warranty",
            "referenceNumber": "321",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/BSD-3-Clause-No-Nuclear-Warranty.json",
            "seeAlso": ["https:\/\/jogamp.org\/git\/?p=gluegen.git;a=blob_plain;f=LICENSE.txt"],
            "reference": ".\/BSD-3-Clause-No-Nuclear-Warranty.html"
        }, {
            "isDeprecatedLicenseId": false,
            "licenseId": "BSD-3-Clause-No-Nuclear-License-2014",
            "isOsiApproved": false,
            "name": "BSD 3-Clause No Nuclear License 2014",
            "referenceNumber": "322",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/BSD-3-Clause-No-Nuclear-License-2014.json",
            "seeAlso": ["https:\/\/java.net\/projects\/javaeetutorial\/pages\/BerkeleyLicense"],
            "reference": ".\/BSD-3-Clause-No-Nuclear-License-2014.html"
        }, {
            "isDeprecatedLicenseId": true,
            "licenseId": "eCos-2.0",
            "isOsiApproved": false,
            "name": "eCos license version 2.0",
            "referenceNumber": "323",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/eCos-2.0.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/ecos-license.html"],
            "reference": ".\/eCos-2.0.html"
        }, {
            "isDeprecatedLicenseId": true,
            "licenseId": "GPL-1.0+",
            "isOsiApproved": false,
            "name": "GNU General Public License v1.0 or later",
            "referenceNumber": "324",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/GPL-1.0+.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/old-licenses\/gpl-1.0-standalone.html"],
            "reference": ".\/GPL-1.0+.html"
        }, {
            "isDeprecatedLicenseId": true,
            "licenseId": "GPL-2.0+",
            "isOsiApproved": true,
            "name": "GNU General Public License v2.0 or later",
            "referenceNumber": "325",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/GPL-2.0+.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/old-licenses\/gpl-2.0-standalone.html", "http:\/\/www.opensource.org\/licenses\/GPL-2.0"],
            "reference": ".\/GPL-2.0+.html"
        }, {
            "isDeprecatedLicenseId": true,
            "licenseId": "GPL-2.0-with-autoconf-exception",
            "isOsiApproved": true,
            "name": "GNU General Public License v2.0 w\/Autoconf exception",
            "referenceNumber": "326",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/GPL-2.0-with-autoconf-exception.json",
            "seeAlso": ["http:\/\/ac-archive.sourceforge.net\/doc\/copyright.html"],
            "reference": ".\/GPL-2.0-with-autoconf-exception.html"
        }, {
            "isDeprecatedLicenseId": true,
            "licenseId": "GPL-2.0-with-bison-exception",
            "isOsiApproved": true,
            "name": "GNU General Public License v2.0 w\/Bison exception",
            "referenceNumber": "327",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/GPL-2.0-with-bison-exception.json",
            "seeAlso": ["none", "found"],
            "reference": ".\/GPL-2.0-with-bison-exception.html"
        }, {
            "isDeprecatedLicenseId": true,
            "licenseId": "GPL-2.0-with-classpath-exception",
            "isOsiApproved": true,
            "name": "GNU General Public License v2.0 w\/Classpath exception",
            "referenceNumber": "328",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/GPL-2.0-with-classpath-exception.json",
            "seeAlso": ["http:\/\/www.gnu.org\/software\/classpath\/license.html"],
            "reference": ".\/GPL-2.0-with-classpath-exception.html"
        }, {
            "isDeprecatedLicenseId": true,
            "licenseId": "GPL-2.0-with-font-exception",
            "isOsiApproved": true,
            "name": "GNU General Public License v2.0 w\/Font exception",
            "referenceNumber": "329",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/GPL-2.0-with-font-exception.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/gpl-faq.html#FontException"],
            "reference": ".\/GPL-2.0-with-font-exception.html"
        }, {
            "isDeprecatedLicenseId": true,
            "licenseId": "GPL-2.0-with-GCC-exception",
            "isOsiApproved": true,
            "name": "GNU General Public License v2.0 w\/GCC Runtime Library exception",
            "referenceNumber": "330",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/GPL-2.0-with-GCC-exception.json",
            "seeAlso": ["none", "found"],
            "reference": ".\/GPL-2.0-with-GCC-exception.html"
        }, {
            "isDeprecatedLicenseId": true,
            "licenseId": "GPL-3.0+",
            "isOsiApproved": true,
            "name": "GNU General Public License v3.0 or later",
            "referenceNumber": "331",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/GPL-3.0+.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/gpl-3.0-standalone.html", "http:\/\/www.opensource.org\/licenses\/GPL-3.0"],
            "reference": ".\/GPL-3.0+.html"
        }, {
            "isDeprecatedLicenseId": true,
            "licenseId": "GPL-3.0-with-autoconf-exception",
            "isOsiApproved": true,
            "name": "GNU General Public License v3.0 w\/Autoconf exception",
            "referenceNumber": "332",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/GPL-3.0-with-autoconf-exception.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/autoconf-exception-3.0.html"],
            "reference": ".\/GPL-3.0-with-autoconf-exception.html"
        }, {
            "isDeprecatedLicenseId": true,
            "licenseId": "GPL-3.0-with-GCC-exception",
            "isOsiApproved": true,
            "name": "GNU General Public License v3.0 w\/GCC Runtime Library exception",
            "referenceNumber": "333",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/GPL-3.0-with-GCC-exception.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/gcc-exception-3.1.html"],
            "reference": ".\/GPL-3.0-with-GCC-exception.html"
        }, {
            "isDeprecatedLicenseId": true,
            "licenseId": "LGPL-2.1+",
            "isOsiApproved": true,
            "name": "GNU Lesser General Public License v2.1 or later",
            "referenceNumber": "334",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LGPL-2.1+.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/old-licenses\/lgpl-2.1-standalone.html", "http:\/\/www.opensource.org\/licenses\/LGPL-2.1"],
            "reference": ".\/LGPL-2.1+.html"
        }, {
            "isDeprecatedLicenseId": true,
            "licenseId": "LGPL-3.0+",
            "isOsiApproved": true,
            "name": "GNU Lesser General Public License v3.0 or later",
            "referenceNumber": "335",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LGPL-3.0+.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/lgpl-3.0-standalone.html", "http:\/\/www.opensource.org\/licenses\/LGPL-3.0"],
            "reference": ".\/LGPL-3.0+.html"
        }, {
            "isDeprecatedLicenseId": true,
            "licenseId": "LGPL-2.0+",
            "isOsiApproved": true,
            "name": "GNU Library General Public License v2 or later",
            "referenceNumber": "336",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/LGPL-2.0+.json",
            "seeAlso": ["http:\/\/www.gnu.org\/licenses\/old-licenses\/lgpl-2.0-standalone.html"],
            "reference": ".\/LGPL-2.0+.html"
        }, {
            "isDeprecatedLicenseId": true,
            "licenseId": "StandardML-NJ",
            "isOsiApproved": false,
            "name": "Standard ML of New Jersey License",
            "referenceNumber": "337",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/StandardML-NJ.json",
            "seeAlso": ["https:\/\/fedoraproject.org\/wiki\/Licensing:MIT?rd=Licensing\/MIT#Standard_ML_of_New_Jersey_Variant"],
            "reference": ".\/StandardML-NJ.html"
        }, {
            "isDeprecatedLicenseId": true,
            "licenseId": "WXwindows",
            "isOsiApproved": true,
            "name": "wxWindows Library License",
            "referenceNumber": "338",
            "detailsUrl": "http:\/\/spdx.org\/licenses\/WXwindows.json",
            "seeAlso": ["http:\/\/www.opensource.org\/licenses\/WXwindows"],
            "reference": ".\/WXwindows.html"
        }]
    };
	//remove escaped slashes
    spdxData = JSON.parse(JSON.stringify(spdxData).replace('\\/', '/'));

    /*
    var tmpKeys = [];
    licenseData.licenses.forEach(function(el){
      tmpKeys.push(el.licenseId);
    });

    var spdxKeys = [];
    spdxData.licenses.forEach(function(el){
      spdxKeys.push(el.licenseId);
    });

    notFoundLicenses = spdxKeys.filter(function(x) { return tmpKeys.indexOf(x) < 0 })
    foundLicenses = spdxKeys.filter(function(x) { return tmpKeys.indexOf(x) >= 0 })
    */

    //console.save(licenseData, 'licenseData.json');
    //console.save(spdxData, 'spdxData.json');

	//enrich spdxData with licenseData
    var output = [];
    for (var i1 = 0; i1 < spdxData.licenses.length; i1++) {
        for (var i2 = 0; i2 < licenseData.licenses.length; i2++) {
            if (spdxData.licenses[i1].licenseId === licenseData.licenses[i2].licenseId || spdxData.licenses[i1].name === licenseData.licenses[i2].name) {
                output.push($.extend(true, {}, licenseData.licenses[i2], spdxData.licenses[i1]));
            }
        }
    }
    spdxData.licenses = output;

    //console.save(spdxData, 'jointData.json');
	console.save({licenseSlags:licenseSlags, spdxLicenseData:spdxData},'spdxLicenseData.json');
	
})();