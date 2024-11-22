import { AutoTokenizer, AutoModelForCausalLM, PreTrainedModel, PreTrainedTokenizer } from '@huggingface/transformers';
import { exec } from 'child_process';
import path from 'path';

function generate(): Promise<string> {
    return new Promise((resolve, reject) => {
        exec('python ' + path.join(__dirname, '../LLMs/model.py'), (error: Error | null, stdout: string,
            stderr: string) => {
                if (error) {
                    console.error(`Error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    // console.warn(`stderr: ${stderr}`);
                }
                resolve(stdout.trim());
            }
        )
    });
}

async function main() {
    console.log(await generate())
}

main();