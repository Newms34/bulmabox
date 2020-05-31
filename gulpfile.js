// First, we'll just include gulp itself.
const gulp = require('gulp');

// Include Our Plugins
const jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    terser = require('gulp-terser'),
    babel = require('gulp-babel');
const reporterFn = function (results, data, opts = {}) {
    const errLen = results.filter(q => q.error.code[0] == 'E').length,
        warnLen = results.filter(q => q.error.code[0] == 'W').length;
    let str = '',
        prevfile;

    // opts = opts || {};

    results.forEach(function (result) {
        var file = result.file;
        var error = result.error;

        if (prevfile && prevfile !== file) {
            str += "\n";
        }
        prevfile = file;
        if (error.code[0] == 'E') {
            str += 'ERR: ';
        } else if (error.code[0] == 'W' && error.reason != 'Missing semicolon.') {
            str += 'WARN: ';
        } else if (error.code[0] == 'W' && error.reason == 'Missing semicolon.') {
            str += 'Semicolon: ';
        }
        // str += error.code[0]=='E'?chalk.red('ERR:'):chalk.yellow("WARN:")
        str += `${file}: line ${error.line}, col ${error.character} - ${error.reason}`;
        // str += file + ': line ' + error.line + ', col ' + error.character + ', ' + error.reason + 'FULL ERR:' + JSON.stringify(error);

        if (opts.verbose) {
            str += ' (' + error.code + ')';
        }

        str += '\n';
    });

    if (str) {
        console.log(`${str}\n ${errLen} ${"error" + (errLen === 1 ? '' : 's')},  ${warnLen} ${"warning" + (warnLen === 1 ? '' : 's')}`)
        // console.log(str + "\n" + len + ' error' + ((len === 1) ? '' : 's'));
    }
    // console.log('NOT SURE WHERE THIS GOES!')
}
// Lint Task
gulp.task('lint', function () {
    let alreadyRan = false,
        semisDone = false;
    return gulp.src(['bulmabox.js'])
        // .pipe(th2.obj((file, enc, cb) => {
        //     if (!alreadyRan) {
        //         drawTitle('Front-End Linting');
        //         alreadyRan = true;
        //     }
        //     // jsStart = file._contents.toString('utf8').length;
        //     return cb(null, file);
        // }))
        .pipe(jshint({
            esversion: 8
        }))
        .pipe(jshint.reporter(reporterFn));
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src(['bulmabox.js'])
        // .pipe(concat('allCust.js'))
        // .pipe(iife())
        // .pipe(gulp.dest('public/js'))
        .pipe(babel({
            presets: [
                [
                    "@babel/preset-env",
                    {
                        useBuiltIns: "entry",
                        corejs: 3,
                        targets: {
                            firefox: "64", // or whatever target to choose .    
                        },
                      }
                ]
            ]
        }))
        .pipe(terser())
        // .pipe(concat('bulm.js'))
        .pipe(rename('bulmabox.min.js'))
        .pipe(gulp.dest('.'));
});
//start mongod -dbpath "d:\\data\\mongo\\db
// Watch Files For Changes
gulp.task('watch', function () {
    // let alreadyRan = false;
    // drawTitle('Watching Front-End scripts, Back-End Scripts, and CSS', true)
    gulp.watch(['bulmabox.js'], gulp.series('lint', 'scripts'));
});

//task to simply create everything without actually watching or starting the DB
gulp.task('render', gulp.series('lint', 'scripts'))

// Default Task
gulp.task('default', gulp.series('lint', 'scripts', 'watch'));