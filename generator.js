const gamesRaw = require('./src/data/games_raw.json')
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'public/images');

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
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file)
        const [slug, ext] = file.split('\.')
        console.log(slug, ext)
        if (images[slug]) {
            images[slug][ext] = file
        } else {
            images[slug] = {
                [ext]: file
            }
        }
        
        const games = gamesRaw.map((game, id) => {
            const slug = slugify(game.title);
            const imagesForSlug = images[slug] || {png: `${slug}.png`}
            const image = imagesForSlug.webp || imagesForSlug.png || imagesForSlug.jpg || imagesForSlug.jpeg
            return {
                ...game,
                slug,
                id: id+1,
                image: `/images/${image}`,
                description: "",
                manual: "",
            }
        })
        
        fs.writeFileSync('./src/data/games-generated.json', JSON.stringify(games))
    });
});



