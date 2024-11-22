from transformers import AutoTokenizer, AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained("roneneldan/TinyStories-1M")
tokenizer = AutoTokenizer.from_pretrained("EleutherAI/gpt-neo-125M")


prompt = "In the times of old"
input_ids = tokenizer.encode(prompt, return_tensors="pt")

output = model.generate(input_ids, max_length=1000, num_beams=1, top_k=30, do_sample=True)
output_text = tokenizer.decode(output[0], skip_special_tokens=True)

open('story.txt', 'w').write(output_text)
print(output_text)