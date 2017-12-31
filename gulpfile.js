var gulp = require('gulp');
var electron_connect = require('electron-connect');

gulp.task('start', function () {
    process.env.DESIGNER_TARGET = 'electron';

    var server = electron_connect.server.create({
        path: './node_modules/gravit-designer',
        verbose: true
    });

    server.start();

    gulp.watch('src/**/*.{js,html,css}', server.reload());
});
