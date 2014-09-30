var fs = require('fs');
var gm = require('gm');
var async = require('async');

var root = '/home/liuyibao/product/';
var month_dir = [];
fs.readdir(root, function (err, dirs){
    dirs.forEach(function(v){
        month_dir.push(root+v);
    });
    async.eachSeries(month_dir, function(item, callback){
        console.log(item);
        fs.stat(item, function(err, stat){
            if(stat.isDirectory()){
                fs.readdir(item, function(err, images){
                    var image_dir = [];
                    images.forEach(function(v){
                        image_dir.push(item+'/'+v);
                    });
                    async.eachSeries(image_dir, function(image, callback){
                        console.log(image);
                        resize(image, callback);
                    });
                });
            }
        });
        callback();
    }, function(err){
        console.log('Scan month dir error or is end!');
    });
});

function resize(path, callback){
    var point = path.lastIndexOf(".");
    var is_s1 = path.lastIndexOf("_s1");
    var is_s2 = path.lastIndexOf("_s2");
    var is_s3 = path.lastIndexOf("_s3");
    if(point > -1 && is_s1 == -1 && is_s2 == -1 && is_s3 == -1){
        var name = path.slice(0, point);
        var ext = path.slice(point+1);
        gm(path)
        .options({imageMagick: true})
        .resize(70)
        .noProfile()
        .write(name + '_s1' + '.' + ext, function (err) {
                gm(path)
                .options({imageMagick: true})
                .resize(270)
                .noProfile()
                .write(name + '_s2' + '.' + ext, function (err) {
                        gm(path)
                        .options({imageMagick: true})
                        .resize(450)
                        .noProfile()
                        .write(name + '_s3' + '.' + ext, function (err) {
                              console.log('Done '+path);
                              callback();
                        });
                });
        });
    }else{
        callback();
    }
}
