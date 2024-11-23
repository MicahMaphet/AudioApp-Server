from transformers import AutoTokenizer, AutoModelForCausalLM
import sys

# the first (and only) argument should be string of the prompt
prompt = sys.argv[1]

# load the model and the tokenizer, at first these need to be downloaded
model = AutoModelForCausalLM.from_pretrained("roneneldan/TinyStories-1M")
tokenizer = AutoTokenizer.from_pretrained("EleutherAI/gpt-neo-125M")

# if no prompt is given exit the program
if len(prompt) == 0: 
    exit()

# tokenize the prompt so the model can understand it
prompt_ids = tokenizer.encode(prompt, return_tensors="pt")
# feed the tokenized prompt into the model and save the output (in tokens)
output = model.generate(prompt_ids, max_length=1000, top_k=30, do_sample=True, num_beams=1)
# decode the output tokens of the model into text
output_text = tokenizer.decode(output[0], skip_special_tokens=True)
# print the results, this is necessary for the node server to get the output
print(output_text)