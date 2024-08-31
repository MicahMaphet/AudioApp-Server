const storage = require('../build/storage').default;
const fs = require('fs');
const { homedir } = require('os');
const path = require('path');

var args = process.argv.slice(2);

function usage(err) {
    if (err) {
        console.log(err);
    }
    console.log('Usage: ./addTail.js [options] or ./addTail.js title image\n\n' +
                '  --title <value>        Title of the tail\n' +
                '  --image <value>        Name of the image. ' + 
                'If it does not exist in images it tries to copy it from Downloads into images\n' +
                '  --description <value>  Description of the tail');
    process.exit();
}

let title = args.find(a => a == '--title') ? args[args.indexOf('--title') + 1] : undefined;
let image = args.find(a => a == '--image') ? args[args.indexOf('--image') + 1] : undefined;

if (!title && !image) {
    if (args.length >= 1) {
        title = args[0];
    }
    if (args.length == 2) {
        image = args[1];
    }
}

if (args.includes('--help') || args.includes('-h')) {
    usage();
}

if (!title) usage();

storage.init()
    .then(async() => {
        const images = path.join(__dirname, '../public/images');
        if (image && !fs.existsSync(images + '/' + image)) {
            const Downloads = path.join(homedir(), 'Downloads');
            if (fs.existsSync(Downloads + '/' + image)) {
                console.log(`copying '${image}'\nfrom ${Downloads}\ninto ${images}. `)
                fs.copyFile(Downloads + '/' + image, images + '/' + image, 
                    (err) => { if (err) console.log(err) }
                );
            } else {
                console.log(`image '${image}' does not exist in ${images} or ${Downloads}`);
            }
        }
        await storage.tails.add({title, image});
    })
    .catch(console.error)
    .finally(() => {
        console.log(`inserted "${title}" into tails\nimage: ${image}`);
        storage.stop();
    });