const storage = require('../build/storage').default;
const fs = require('fs');
const { homedir } = require('os');
const path = require('path');

var args = process.argv.slice(2);

function usage(err) {
    if (err) {
        console.log(err);
    }
    console.log('Usage: ./addTail.js [options] or ./addTail.js <title> <image> <audio>\n\n' +
                '  --title <value>        Title of the tail\n' +
                '  --image <value>        Name of the image. ' + 
                'If it does not exist in images it tries to copy it from Downloads into images\n' +
                '  --audio <value>        Name of the audio file.\n' +
                '  --description <value>  Description of the tail');
    process.exit();
}

let title = args.find(a => a == '--title') ? args[args.indexOf('--title') + 1] : undefined;
let image = args.find(a => a == '--image') ? args[args.indexOf('--image') + 1] : undefined;
let audio = args.find(a => a == '--audio') ? args[args.indexOf('--audio') + 1] : undefined;

if (!title && !image && !audio) {
    if (args.length >= 1) {
        title = args[0];
    }
    if (args.length >= 2) {
        image = args[1];
    }
    if (args.length == 3) {
        audio = args[2];
    }
}

if (args.includes('--help') || args.includes('-h')) {
    usage();
}

if (!title) usage();

/**
 * Copies a given file from Downloads (or src if provided) into dest.
 * If the file is already in destination it does nothing.
 * 
 * @param {string} file file to be coppied from Downloads into destination
 * @param {string} dest destination of the file
 * @param {string} src optional source of the the file to copy from, defaults to Downloads
 */
function copyFromDownloads(file, dest, src) {
    // if a source is provided, use it, else copy from Downloads
    const Downloads = src || path.join(homedir(), 'Downloads');
    // if the file does not exist in destination (dest)
    if (image && !fs.existsSync(dest + '/' + file)) {
        // if the file exists in downloads, copy it and paste into destination
        if (fs.existsSync(Downloads + '/' + file)) {
            console.log(`copying '${file}'\nfrom ${Downloads}\ninto ${dest}. `)
            fs.copyFile(Downloads + '/' + file, dest + '/' + file, 
                (err) => { if (err) console.log(err) }
            );
        } else {
            console.log(`${file}' does not exist in ${dest} or ${Downloads}`);
        }
    }
}

storage.init()
    .then(async() => {
        const images = path.join(__dirname, '../public/images');
        const audios = path.join(__dirname, '../public/audios');
        copyFromDownloads(image, images);
        copyFromDownloads(audio, audios);
        await storage.tails.add({title, image, audio});
    })
    .catch(console.error)
    .finally(() => {
        console.log(`inserted "${title}" into tails\nimage: ${image}\naudio: ${audio}`);
        storage.stop();
    });