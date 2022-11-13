import openai
import requests

def generate_slogan(product_desc, target_audience):
  # Takes product description and target audience as string, returns string slogan
  openai.api_key = "" #ADD API KEY HERE
  response = openai.Completion.create(model="text-davinci-002", prompt=f"Write a one-line creative ad for the following product to run on Instagram aimed at {target_audience}:\n\nProduct: {product_desc}.", temperature=0.5, max_tokens=60)
  return response['choices'][0]['text'].strip()
  

def generate_image(style, image_description):
  """Takes in style and image description as strings, returns string file path of image
     style must be one of following: 'random', 'photo', '3d-render', 'cartoon', 'painting', 'hand-drawn'.
  """
  openai.api_key = "" #ADD API KEY HERE
  if style == "random":
    image_style = ""
  elif style == "photo":
    image_style = "High quality photo of "
  elif style == "3d-render":
    image_style = "3D render of "
  elif style == "cartoon":
    image_style = "A cartoon of "
  elif style == "painting":
    image_style = "A painting of "
  elif style == "hand-drawn":
    image_style = "A hand drawn sketch of "
  else:
    image_style = ""
    
  url_path = openai.Image.create(prompt=image_style + image_description.lower(), n=1, size="1024x1024")['data'][0]['url']
  
  response = requests.get(url_path)
  
  if response.status_code:
    fp = open('test.png', 'wb')
    fp.write(response.content)
    fp.close()

