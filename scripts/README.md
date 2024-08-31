# Server Scripts
Directory with scripts for manipulating database.
## Instructions
Move into scripts directory
```
cd scripts
```
### Inserting item into tails
Run addTail.js with parameters title, image, and audio.
```
node addTail.js "[Title of Audio]" "[Name of Image]" "[Name of Audio File]"
```
For example:
```
node addTail.js "Book Title" "book.png" "SUBWAY SURFERS (Main Theme).mp3"
```
If the image or audio file is not in public, it looks for it in Downloads and if it is there it coppies it into the corresponding folder. It specifically looks for `homedirectory/Downloads`.

You can also pass flags like `--title` `--image` `--audio`.
For more detail:
```
node addTail.js --help
```
### Drop Collection
```
node dropTails.js
```