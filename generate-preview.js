var im = require('imagemagick');

const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'public/images');


//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        const [slug, ext] = file.split('\.')
        if (ext !== 'webp') {
            im.convert([`public/images/${file}`, '-geometry', 'x300', '-quality', 50, '-define', 'webp:lossless=true', `public/images/${slug}.webp`], function(err, stdout, stderr){
                if (err) throw err;
            })
            im.convert([`public/images/${file}`, '-geometry', 'x170', '-quality', 50, '-define', 'webp:lossless=true', `public/images/${slug}-thumb.webp`], function(err, stdout, stderr){
                if (err) throw err;
            })
        } else {
            im.convert([`public/images/${file}`, '-geometry', 'x300', `public/images/${slug}.webp`], function(err, stdout, stderr){
                if (err) throw err;
            })
            im.convert([`public/images/${file}`, '-geometry', 'x170', `public/images/${slug}-thumb.webp`], function(err, stdout, stderr){
                if (err) throw err;
            })
        }
        
        //im.resize({
        //    srcPath: file,
        //    dstPath: `small-${file}`,
        //    height:   180
        //  }, function(err, stdout, stderr){
        //    if (err) throw err;
        //    console.log('resized kittens.jpg to fit within 256x256px');
        //  });
    });
});

