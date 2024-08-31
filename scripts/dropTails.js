const storage = require('../build/storage').default;

var args = process.argv.slice(2);

function usage(err) {
    if (err) {
        console.log(err);
    }
    console.log('Usage: drops tails collection');
    process.exit();
}

if (args.includes('--help') || args.includes('-h')) {
    usage();
}

storage.init()
    .then(async() => {
        await storage.tails.drop();
    })
    .catch(console.error)
    .finally(() => {
        console.log('Dropped collection tails');
        storage.stop();
    });