import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import base64
from django.contrib.auth import authenticate
from .models import Profile

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def generate(request):
    return HttpResponse("Generate")


# The user gets a certain number of credits
@csrf_exempt
def buy(request):
    recieved_json_data = json.loads(request.body.decode("utf-8"))
    
    auth_header = request.META['HTTP_AUTHORIZATION']
    encoded_credentials = auth_header.split(' ')[1]  # Removes "Basic " to isolate credentials
    decoded_credentials = base64.b64decode(encoded_credentials).decode("utf-8").split(':')
    username = decoded_credentials[0]
    password = decoded_credentials[1]
    feed_bot = authenticate(username=username, password=password)
    # if the credentials are correct, then the feed_bot is not None, but is a User object.
    
    p = Profile.objects.get(user=feed_bot)
    p.credits_remaining += int(recieved_json_data['num_credits'])
    p.save()
 
    return HttpResponse(p.credits_remaining)


def output(request):
    return HttpResponse("Output")


def num_credits(request):
    auth_header = request.META['HTTP_AUTHORIZATION']
    encoded_credentials = auth_header.split(' ')[1]  # Removes "Basic " to isolate credentials
    decoded_credentials = base64.b64decode(encoded_credentials).decode("utf-8").split(':')
    username = decoded_credentials[0]
    password = decoded_credentials[1]
    feed_bot = authenticate(username=username, password=password)
    
    p = Profile.objects.get(user=feed_bot)
    return HttpResponse(p.credits_remaining)