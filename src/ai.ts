import { exec } from 'child_process';
import path from 'path';

/**
 * Typescript interface for the language models run in python
 */
class AIService {
    textGeneratorDirectory: string = path.join(__dirname, '../AI/text_gen.py');
    /** Load the language model and download if needed. */
    load() {
        exec('python ' + this.textGeneratorDirectory);
    }
    
    /**
     * Returns the output of the model.
     * Model is run in python, this calls the python script with prompt and returns output.
     * 
     * @param prompt starting text
     * @returns prompt + model output
     */
    generateText(prompt: string): Promise<string> {
        return new Promise((resolve, reject) => {
            exec('python ' + this.textGeneratorDirectory + ` '${prompt}'`, (error: Error | null, stdout: string) => {
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

export default new AIService();