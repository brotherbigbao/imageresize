var fs = require('fs');
var gm = require('gm');

var root = '/home/liuyibao/images';

fs.readdir(root, function (err, dirs){
    
    /* for loop */
    for(var i=0; i<dirs.length; i++){
        var month_dir = root+'/'+dirs[i];
        
        /* check dir */
        (function(month_dir){
            fs.stat(month_dir, function(err, stat){
                if(stat.isDirectory()){
                    console.log(month_dir+' is directory, start read images:');
                    fs.readdir(month_dir, function (err, images){
                        for(var i=0; i<images.length; i++){
                            var image_path = month_dir+'/'+images[i];
                            
                            /* check image */
                            (function(image_path){
                                fs.stat(image_path, function(err, stat){
                                    if(stat.isFile()){
                                        //resize
                                        console.log("START: " + image_path);
                                        resize(image_path);
                                    }
                                });
                            })(image_path);
                            /* check image */
                        }
                    });
                }
            });
        })(month_dir);
        /* check dir end */
        
    }
    /* for loop end */
    
});

function resize(path){
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
          if (!err) console.log('done');
        });
        gm(path)
        .options({imageMagick: true})
        .resize(270)
        .noProfile()
        .write(name + '_s2' + '.' + ext, function (err) {
          if (!err) console.log('done');
        });
        gm(path)
        .options({imageMagick: true})
        .resize(450)
        .noProfile()
        .write(name + '_s3' + '.' + ext, function (err) {
          if (!err) console.log('done');
        });
    }
}
