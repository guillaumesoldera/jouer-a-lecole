const { exec } = require("child_process");

const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'input-manuels');
const games = require('./src/data/games.json')

const gamesById = {}
games.forEach(game => {
    gamesById[game.id] = game.slug;
})

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

            const id = file.split(' ')[0];
            const outputFileName = gamesById[id];
            if (outputFileName === undefined) {
                console.err('No slug found for ' + file);
            } else {
                const inputfileName = `input-manuels/${file.replace("&", "\\&").replace("'", "\\'").replace(/ /g, "\\ ")}`;
                const commandLine = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=public/manuels/${outputFileName}.pdf ${inputfileName}`
                exec(commandLine, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    console.log(`pdf generated for ${outputFileName}`);
                });
            }
        }
        
    });
});

