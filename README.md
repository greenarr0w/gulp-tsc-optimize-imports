# gulp-tsc-optimize-imports

This Gulp Plugin logs you (detailed explanation below):
* all the imports, which are not used in your typescript files
* all the imports, which have not the same name
* all the semicolons, which are missing

## Usage
1. Step: Install your plugin as a development dependency:
```shell
npm install --save-dev gulp-tsc-optimize-imports
```

2. Step: Use it in your gulpfile.js:
```shell
var optimizeImports = require('gulp-tsc-optimize-imports');

var typescriptFiles = 'web/**/*.ts';

gulp.task('optimizeImportsTask ', function () {
    return gulp.src(paths.typescriptFiles).pipe(optimizeImports());
});
```

## Usage

### optimizeImports(options)

#### options.unusedImports
Type: `boolean`
Default: `true`

flag, if you want to log all the unused imports.
For Example:
```shell
import MyClass = my.namespace.to.the.class.MyClass;
```

Explanation:
The import of `MyClass` is never used in this File.



#### options.importNames
Type: `boolean`
Default: `true`

flag, if you want to log your import name differencies.
For Example:
```shell
import MyClass = my.namespace.to.the.class.YourClass;
```

Explanation:
`MyClass` and `YourClass` are different names.



#### options.semicolons
Type: `boolean`
Default: `true`

flag, if you want to log your missing semicolons in the imports statements
For Example:
```shell
import MyClass = my.namespace.to.the.class.MyClass
```

Explanation:
There is no semicolon at the end of the line.


