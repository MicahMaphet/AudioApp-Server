const { exec } = require('child_process');

async function promptAI(prompt) {
    return new Promise((resolve, reject) => {
      exec(`python ../LLMs/model.py '${prompt}'`, (error, stdout, stderr) => {
        if (error) {
        }
        if (stderr) {
        }
        resolve(stdout.trim());
      });
    });
  }

async function main() {
    console.log(await promptAI('A wizard'));
}

main();