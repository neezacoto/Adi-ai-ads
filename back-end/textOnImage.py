
import numpy as np
import matplotlib.pyplot as plt
from PIL import ImageFont, ImageDraw, Image, ImageEnhance
from randimage import get_random_image, show_array
import cv2
import textwrap
from string import ascii_letters

# Variables
image_size = (512,512)

global Fonts,Fonts_counter,Fonts_max_size

loc = 'Fonts/'

Fonts = {1:loc + 'Roboto.ttf', 2:loc + 'Helvetica.ttf', 3:loc + 'Bodoni.ttf'} 

fonts_counter = 1
fonts_max_size = len(Fonts) + 1

## This method is used for development purposes
# def generate_image():

#     ''' Generates random image for development purposes'''

#     global ranimg
#     ranimg = get_random_image(image_size)  #returns numpy array
#     #show_array(ranimg) #shows the image

#     return ranimg


def generate_text(slogan, file_path_unprocessed,style):

    ''' Function generates text for image'''
   

    try:
        img = Image.open(file_path_unprocessed)
    except:
        print("file not found! Please try again")
    else:
        print("Success! Image loaded.")
        img = img.copy()
        if style == "Photo":
            widthImg, heightImg = img.size
            bright = ImageEnhance.Brightness(img)
          
        img = bright.enhance(.5)

        widthPos = 30
        heightPos = 20

        text_color = contrasting_text_color(checkColor(file_path_unprocessed))

        newsize = (512, 512)
        img = img.resize(newsize)

        words = slogan.split()
        length = len(slogan)
        lines = []
        start = 0

        Text = ImageDraw.Draw(img)

        
        Font = fonts_loop()
        font = ImageFont.truetype(Font, 35)

        

        avg_char_width = sum(font.getsize(char)[0] for char in ascii_letters) / len(ascii_letters)
        max_char_count = int( (img.size[0] * .95) / avg_char_width )

        parsed_sentence = textwrap.fill(text=slogan,width = max_char_count)

        if len(words) < 5:
            parsed_sentence = sentence_parser(parsed_sentence, words)
            font = ImageFont.truetype(Font, 55)
        
        ## Left alligns the image
        for i in range(length):
            line = ' '.join(slogan[start:i+1])
            w, h = font.getsize(line)
            if (w > widthImg):
                lines.append(' '.join(words[start:i]))
                start = i
            elif i == length-1:
                lines.append(line)
        
     

        print('font used: '  + Font)

        if style == "Photo":
     
            Text.text((widthPos, heightPos), parsed_sentence, font=font, fill= (255,255,255))

          
        elif style == "Hand Drawing":
            Text.text((widthPos, heightPos), parsed_sentence, font=font, fill= (0,0,0))
        
        else:

            if text_color == 'ffffff':    
            
                Text.text((widthPos, heightPos), parsed_sentence, font=font, fill= (255,255,255))
            if text_color == '000000':

                Text.text((widthPos, heightPos), parsed_sentence, font=font, fill= (0,0,0))
        
 
        img.show()

        img.save("image_with_text.png")

        return "image_with_text.png"



def fonts_loop():

    ''' Helper method which returns a new font each time generate_text method is called'''

    global fonts_counter

    if fonts_counter == fonts_max_size:
        fonts_counter = 1

    new_font = Fonts[fonts_counter]
    fonts_counter += 1
    return new_font
  

def sentence_parser(sentence,array_words):

    ''' For sentences less than 5 words, adds spaces inbetween each word'''


    new_sentence = ""
    counter = 0
    for i in range(len(array_words)):
        for char in array_words[i]:
            new_sentence += char
            counter +=1;
        counter = 0
        new_sentence += '\n'

        
    return new_sentence    

    

def checkColor(file_loc):
  # Colorpicks from image and returns hexacode

  im = Image.open(file_loc) # Insert filename here
  
  width, height = im.size #get image size
  
  left = (width - 30)/2
  top = (height - 20)/2
  right = (width + 360)/2
  bottom = (height + 370)/2
  
  im.crop((left, top, right, bottom)) #crop the center of the image
  
  rgb = im.convert('RGB') # get three R G B values
  r, g, b = rgb.getpixel((1, 1))
  
  return '%02x%02x%02x' % (r,g,b)


def contrasting_text_color(hex_str):
  '''
  Input a string of RGB hex digits to compute
  complementary contrasting color such as for fonts
  '''
  (r, g, b) = (hex_str[:2], hex_str[2:4], hex_str[4:])
  return '000000' if 1 - (int(r, 16) * 0.299 + int(g, 16) * 0.587 + int(b, 16) * 0.114) / 255 < 0.5 else 'ffffff'

    
if __name__ == "__main__":
    generate_text('If you are sick and tired of being sick, try our delivery app.','Photos/RainforestImg.jpg', 'Photo')








 
