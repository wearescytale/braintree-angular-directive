var gulp = require("gulp");
var gutil = require("gulp-util");

var paths = {
    js: "./src/**/*.js",
    watch: {
        js: [
            "./src/**/*.js",
            "./test/**/*.js"
        ]
    }
};

gulp.task("default", [ "js", "jshint"]);

gulp.task("js", function() {
    var concat = require("gulp-concat");
    var uglify = require('gulp-uglify');

    return gulp.src(paths.js)
        .pipe(uglify().on('error', gutil.log))
        .pipe(concat("braintree-angular-directive.js"))
        .pipe(gulp.dest("dist"));
});

gulp.task("jshint", function () {
    var jshint = require("gulp-jshint");

    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(jshint.reporter("fail"));
});

gulp.task("test-bare", function (done) {
    var karma = require("karma");
    var Server = karma.Server;

    new Server({
        configFile: __dirname + "/test/karma.conf.js",
        action: "run",
        singleRun: true
    }, done).start();
});

gulp.task("test", ["jshint", "js", "test-bare"], function (done) {
    done();
});

gulp.task("watch", function () {
    var watch = require("gulp-watch");

    gulp.start("test");

    watch(paths.watch.js, function () {
        gulp.start("test");
    });
});
