/**
 * Created by andranik on 7/13/16.
 */

var Imagemin = require('imagemin');
var cliargs = require('cliargs');
var fs = require('fs');
var path = require('path');
var gm = require('gm');

var argsObj = cliargs.parse();

if(!argsObj.f || !argsObj.p || !argsObj.r || !argsObj.t){
    console.log(-1);
    return -1;
}

if(argsObj.p === 'jpg' || argsObj.p === 'jpeg'){
    gm(argsObj.f)
        .write(argsObj.r + argsObj.t, function (err) {
            if (err){
                throw err;
                return;
            }
            console.log(1);
        });
    return;
}

var imagemin = new Imagemin()
    .src(argsObj.f)
    .dest(argsObj.r);


switch(argsObj.p){
    case 'png':
        imagemin.use(Imagemin.optipng({ optimizationLevel: 3 }));
        break;
    case 'gif':
        imagemin.use(Imagemin.gifsicle({ interlaced: true }));
        break;
    case 'svg':
        imagemin.use(Imagemin.svgo());
}

imagemin.run(function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(1);
});