# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client
import ai

def send_message(send_to, message_content):
  """Takes string send_to(phone# including country code without dash or space),
     Sends a string message_content to the send_to phone number.
  """
  account_sid = "AC2c36b5faff05c5ffabb426484a4292b8" #Insert your account_sid here
  auth_token = "ed4f736eee44e3f32b7dd31d825f6048" #Insert your auth_token here
  
  client = Client(account_sid, auth_token)
  
  message = client.messages.create(
    body=str(message_content),
    from_='+13603678930', #Virtual Phone number
    to=f'+{send_to}',
    media_url='https://images-ext-2.discordapp.net/external/J_xm2UEUcn8F0SSzUiahkm4B7LjD599ii1M-lzOZkyA/%3Fst%3D2022-11-13T05%253A59%253A41Z%26se%3D2022-11-13T07%253A59%253A41Z%26sp%3Dr%26sv%3D2021-08-06%26sr%3Db%26rscd%3Dinline%26rsct%3Dimage%2Fpng%26skoid%3D6aaadede-4fb3-4698-a8f6-684d7786b067%26sktid%3Da48cca56-e6da-484e-a814-9c849652bcb3%26skt%3D2022-11-12T23%253A00%253A38Z%26ske%3D2022-11-13T23%253A00%253A38Z%26sks%3Db%26skv%3D2021-08-06%26sig%3Dw6BAOamCNPoz%2FKyCv9bFJpPWviNHc3IORvGdhRbdnmk%253D/https/oaidalleapiprodscus.blob.core.windows.net/private/org-SpT2GOekzV1YPG6ddWksFYIJ/user-NYOMRnU3HlchTtqssuF1jeYL/img-S4VOEejhxfSdvPmTb6JzEdAa.png?width=656&height=656',
  )
  
  pass

slogan = ai.generate_slogan('An AI-based image-generation app that saves you time', 'UX designers')
send_message(16179813615, slogan)