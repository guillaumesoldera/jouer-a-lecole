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
        if (file !== '.DS_Store') {
            const [slug, ext] = file.split('\.')
            if (!slug.endsWith('-thumb')) {
                if (ext !== 'webp') {
                    if (fs.existsSync(`${directoryPath}/${slug}.webp`) && fs.existsSync(`${directoryPath}/${slug}-thumb.webp`)) {
                        console.log('preview already generated for ' + file);
                    } else {
                        console.log('generate preview for ' + file);
                        im.convert([`public/images/${file}`, '-geometry', 'x300', '-quality', 50, '-define', 'webp:lossless=true', `public/images/${slug}.webp`], function(err, stdout, stderr){
                            if (err) throw err;
                        })
                        im.convert([`public/images/${file}`, '-geometry', 'x170', '-quality', 50, '-define', 'webp:lossless=true', `public/images/${slug}-thumb.webp`], function(err, stdout, stderr){
                            if (err) throw err;
                        })
                    }
                } else {
                    if (fs.existsSync(`${directoryPath}/${slug}-thumb.webp`)) {
                        console.log('preview already generated for ' + file);
                    } else {
                        console.log('generate preview for ' + file);
                        im.convert([`public/images/${file}`, '-geometry', 'x300', `public/images/${slug}.webp`], function(err, stdout, stderr){
                            if (err) throw err;
                        })
                        im.convert([`public/images/${file}`, '-geometry', 'x170', `public/images/${slug}-thumb.webp`], function(err, stdout, stderr){
                            if (err) throw err;
                        })
                    }
                }
            }
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

