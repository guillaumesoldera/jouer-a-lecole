const gamesRaw = require('./src/data/games_raw.json')
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'public/images');
const directoryManuelsPath = path.join(__dirname, 'public/manuels');

const slugify = (value, separator = "-") => {
    return value
        .toString()
        .replace('&', ' ')
        .normalize('NFD')                   // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, separator);
};

const images = {}
const manuals = {}
const allIds = []
let currentId = 1;
function nextAvailableId() {
    console.log("call nextAvailableId")
    while (allIds.includes(currentId)) {
        currentId++;
    }
    return currentId;
}

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
        if (images[slug]) {
            images[slug][ext] = file
        } else {
            images[slug] = {
                [ext]: file
            }
        }
        
    });
    fs.readdir(directoryManuelsPath, function (err, manuels) {

        manuels.forEach(manuel => {
            const [slug, ext] = manuel.split('\.')
            manuals[slug] = manuel
        })

        gamesRaw.forEach(game => {
            if (game.id) {
                if (allIds.includes(game.id)) {
                    console.error(`ID ${game.id} en doublon !`);
                    return;
                } else {
                    allIds.push(game.id);
                }
            }
        })
        const games = gamesRaw.map((game, idx) => {
            let id = game.id;
            if (id === undefined) {
                id = nextAvailableId();
                allIds.push(id);
            }
            const slug = game.slug || slugify(game.title);
            const imagesForSlug = images[slug] || {png: `${slug}.png`}
            const image = imagesForSlug.webp || imagesForSlug.png || imagesForSlug.jpg || imagesForSlug.jpeg
            const manual = manuals[slug]
            const description = game.description || ''
            return {
                ...game,
                slug,
                id,
                image: `/images/${image}`,
                thumbnail: `/images/${slug}-thumb.webp`,
                description,
                manual : manual ? `/manuels/${manual}` : undefined,
            }
        })
        
        fs.writeFileSync('./src/data/games-generated.json', JSON.stringify(games))
    });
});



