# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client


def send_message(send_to, message_content):
  """Takes string send_to(phone# including country code without dash or space),
     Sends a string message_content to the send_to phone number.
  """
  account_sid = "" #Insert your account_sid here
  auth_token = "" #Insert your auth_token here
  
  client = Client(account_sid, auth_token)
  
  message = client.messages.create(
    body=str(message_content),
    from_='+13603678930', #Virtual Phone number
    to=f'+{send_to}'
  )
  
  pass
