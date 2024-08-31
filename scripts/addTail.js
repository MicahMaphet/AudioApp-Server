const storage = require('../build/storage').default;

var args = process.argv.slice(2);

function usage(err) {
    if (err) {
        console.log(err);
    }
    console.log('Usage: ./addTail.js [options]\n\n' +
                '  --title <value>        Title of the tail\n' +
                '  --image <value>        Name of the image\n' +
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
        await storage.tails.add({title, image});
    })
    .catch(console.error)
    .finally(() => {
        console.log(`Inserted "${title}" into tails\nimage: ${image}`);
        storage.stop();
    });