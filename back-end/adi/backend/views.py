import json
from django.http import HttpResponse, FileResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import base64
from django.contrib.auth import authenticate
from .models import Profile
from django.contrib.auth.models import User
from . import ai


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


@csrf_exempt
def generate(request):
    recieved_json_data = json.loads(request.body.decode("utf-8"))

    auth_header = request.META['HTTP_AUTHORIZATION']
    # Removes "Basic " to isolate credentials
    encoded_credentials = auth_header.split(' ')[1]
    decoded_credentials = base64.b64decode(
        encoded_credentials).decode("utf-8").split(':')
    username = decoded_credentials[0]
    password = decoded_credentials[1]
    feed_bot = authenticate(username=username, password=password)
    # if the credentials are correct, then the feed_bot is not None, but is a User object.

    p = Profile.objects.get(user=feed_bot)

    if p.credits_remaining >= 1:
        p.credits_remaining -= 1
        p.save()

        # desc = recieved_json_data['product_desc']
        # audience = recieved_json_data['target_audience']
        # slogan = ai.generate_slogan(desc, audience)
        # return HttpResponse(slogan)

        # style = recieved_json_data['style']
        # img_desc = recieved_json_data['image_description']
        # ai.generate_image(style, img_desc)

        return JsonResponse({"wasSuccessful": True, "resource_link": "example.org/1"})

    return JsonResponse({"wasSuccessful": False})


# The user gets a certain number of credits
@csrf_exempt
def buy(request):
    recieved_json_data = json.loads(request.body.decode("utf-8"))

    auth_header = request.META['HTTP_AUTHORIZATION']
    # Removes "Basic " to isolate credentials
    encoded_credentials = auth_header.split(' ')[1]
    decoded_credentials = base64.b64decode(
        encoded_credentials).decode("utf-8").split(':')
    username = decoded_credentials[0]
    password = decoded_credentials[1]
    feed_bot = authenticate(username=username, password=password)
    # if the credentials are correct, then the feed_bot is not None, but is a User object.

    p = Profile.objects.get(user=feed_bot)
    p.credits_remaining += int(recieved_json_data['num_credits'])
    p.save()

    return HttpResponse(p.credits_remaining)


def output(request, resource_path):
    return FileResponse(open(f'processed/{resource_path}', 'rb'))


def num_credits(request):
    auth_header = request.META['HTTP_AUTHORIZATION']
    # Removes "Basic " to isolate credentials
    encoded_credentials = auth_header.split(' ')[1]
    decoded_credentials = base64.b64decode(
        encoded_credentials).decode("utf-8").split(':')
    username = decoded_credentials[0]
    password = decoded_credentials[1]
    feed_bot = authenticate(username=username, password=password)

    p = Profile.objects.get(user=feed_bot)
    return HttpResponse(p.credits_remaining)


def register(request, username, password):
    user = User.objects.create_user(username=username, password=password)
    user.save()

    profile = Profile(user=user, credits_remaining=3)
    profile.save()
    return HttpResponse("Congratulations! You have a new account with " + str(profile.credits_remaining) + " credits!")
