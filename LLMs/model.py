from transformers import AutoTokenizer, AutoModelForCausalLM
import sys

model = AutoModelForCausalLM.from_pretrained("roneneldan/TinyStories-1M")
tokenizer = AutoTokenizer.from_pretrained("EleutherAI/gpt-neo-125M")


prompt = sys.argv[1]
input_ids = tokenizer.encode(prompt, return_tensors="pt")

output = model.generate(input_ids, max_length=1000, top_k=30, do_sample=True, num_beams=1)
output_text = tokenizer.decode(output[0], skip_special_tokens=True)

print(output_text)