'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var path = require('path');

var PLUGIN_NAME = 'gulp-tsc-optimize-imports';

module.exports = function (options) {
    var defaultOption = {
        unusedImports: true,
        importNames: true,
        semicolons: true
    }
    var options = options || defaultOption;

    function optimizeImports(file, enc, cb) {

        var fileContentString = file.contents.toString('utf8');
        var fileName = path.basename(file.path);

        var arrayOfLines = fileContentString.split("\n");
        arrayOfLines.forEach(function (line, i) {
            var lineNumber = i + 1;
            var importMatcher = /^\s*import\b\s*([a-z|A-Z|\d]*\b)\s*=.*?([a-z|A-Z|\d|]*?)\s*?(;{0,1})\s*?$/;
            if (importMatcher.test(line)) {
                var importMatch = line.match(importMatcher);
                //get Import Name
                var importName = importMatch[1];

                //get Class Name
                var className = importMatch[2];

                //has Semicolon
                var hasSemicolon = importMatch[3];
                if (hasSemicolon === "" && options.semicolons === true) {
                    gutil.log(gutil.colors.magenta('[no Semicolon]'), fileName + ':' + lineNumber);
                }

                //check if className and importName are equal
                if (importName === className) {
                    //check if the import is used in the file -> that means more than 2 times
                    var amountOfUsingImport = (fileContentString.match(new RegExp(importName + '\\b', 'g')) || []).length;
                    if (amountOfUsingImport === 2 && options.unusedImports === true) {
                        gutil.log(gutil.colors.red('[unused import >>> ' + importName + ']'), fileName + ':' + lineNumber);
                    }
                } else {
                    if (options.importNames === true) {
                        gutil.log(gutil.colors.yellow('[import name difference >>> ' + importName + ' <-> ' + className + ']'), fileName + ':' + lineNumber);
                    }
                }
            }
        });

        cb(null, file);
    }

    return through.obj(optimizeImports);
};