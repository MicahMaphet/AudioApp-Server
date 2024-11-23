import { exec } from 'child_process';
import path from 'path';

/**
 * Typescript interface for the language models run in python
 */
class ModelService {
    /** Load the language model and download if needed. */
    load() {
        exec('python ' + path.join(__dirname, '../LLMs/model.py'));
    }
    
    /**
     * Returns the output of the model.
     * Model is run in python, this calls the python script with prompt and returns output.
     * 
     * @param prompt starting text
     * @returns prompt + model output
     */
    generate(prompt: string): Promise<string> {
        return new Promise((resolve, reject) => {
            exec('python ' + path.join(__dirname, '../LLMs/model.py') + ` '${prompt}'`, (error: Error | null, stdout: string) => {
                    if (error) {
                        console.error(`Error: ${error.message}`);
                        return;
                    }
                    resolve(stdout.trim());
                }
            )
        });
    }
}

export default new ModelService();