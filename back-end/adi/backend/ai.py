import re
import openai
import requests
import os


def generate_slogan(product_desc, target_audience):
    """
    Takes product description and target audience as string, returns string slogan
    """
    openai.api_key = "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"  # ADD API KEY HERE
    response = openai.Completion.create(
        model="text-davinci-002", prompt=f"Write a one-line creative ad for the following product to run on Instagram aimed at {target_audience.lower()}:\n\nProduct: {product_desc}.", temperature=0.5, max_tokens=60)
    return response['choices'][0]['text'].strip()


def generate_image(style, image_description):
    """
    Takes in style and image description as strings, returns string file path of image
    style must be one of following:
    'random', 'photo', '3d-render', 'cartoon', 'painting', 'hand-drawn'.
    """
    openai.api_key = "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"  # ADD API KEY HERE
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

    url_path = openai.Image.create(
        prompt=image_style + image_description.lower(), n=1, size="512x512")['data'][0]['url']

    response = requests.get(url_path)

    if response.status_code:
        # Use iteration and a regex to get the next available file number
        images_in_raw = [entry for entry in os.listdir(
            r"C:\Users\Sai Nayunipati\Desktop\bostonhacks-2022\back-end\adi\raw")]

        p = re.compile('^image_(\d+)\.png$')
        next_available = 1
        for file in images_in_raw:
            m = p.match(file)
            next_available = max(next_available, int(m.group(1)) + 1)

        # Write to the file
        file_name = f"image_{next_available}.png"
        fp = open(
            r"C:\Users\Sai Nayunipati\Desktop\bostonhacks-2022\back-end\adi\raw" + f"\{file_name}", 'wb')
        fp.write(response.content)
        fp.close()

    return (file_name, url_path)
