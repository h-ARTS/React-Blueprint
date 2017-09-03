var express = require('express'),
    browserify = require('browserify-middleware'),
    babelify = require('babelify'),
    browserSync = require('browser-sync');

var app = express(),
    port = process.env.PORT || 8080;

browserify.settings({
    transform: [babelify.configure({})],
    presets: ["es2015", "react"],
    extensions: [".js", ".jsx"],
    grep: /\.jsx?$/
});

// serve client-code via browserify
app.get('/bundle.js', browserify(__dirname + '/source/app.jsx'));

// resources
app.get(['*.png', '*.jpg', '*.css', '*.map'], function(req, res) {
    res.sendFile(__dirname + "/public/" + req.path);
});

// all ther requests will be routed to index.html
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Run the server
app.listen(port, function() {
    browserSync({
        proxy: 'localhost:' + port,
        files: ['sources/**/*.{jsx}','public/**/*.{css}'],
        options: {
            ignored: 'node_modules'
        }
    });
});