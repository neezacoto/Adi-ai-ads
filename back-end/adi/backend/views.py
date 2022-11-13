import base64
import json
import os

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import FileResponse, HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from . import ai
from . import textOnImage
from .models import Advertisement, Profile
from .textOnImage import *

# pylint: disable=unused-argument
def index(request):
    """
    A dummy page that ensures the API works.
    """
    return HttpResponse("API is active.")


@csrf_exempt
def generate_image(request):
    """
    Takes {product desc, target_audience, style, image_description}
    and generates an appropriate image. Returns the link to the image.
    """

    # Authenticate the username and password in the meta-request
    auth_header = request.META['HTTP_AUTHORIZATION']
    encoded_credentials = auth_header.split(' ')[1]
    decoded_credentials = base64.b64decode(
        encoded_credentials).decode("utf-8").split(':')
    username = decoded_credentials[0]
    password = decoded_credentials[1]
    feed_bot = authenticate(username=username, password=password)

    # pylint: disable=no-member
    user_profile = Profile.objects.get(user=feed_bot)

    if user_profile.credits_remaining >= 1:
        # Parse the JSON
        recieved_json_data = json.loads(request.body.decode("utf-8"))

        user_profile.credits_remaining -= 1
        user_profile.save()

        desc = recieved_json_data['product_desc']
        audience = recieved_json_data['target_audience']
        slogan = ai.generate_slogan(desc, audience)

        style = recieved_json_data['style']
        img_desc = recieved_json_data['image_description']
        
        dalle_response = ai.generate_image(style, img_desc)
        raw_file_name = dalle_response[0]
        dalle_link = dalle_response[1]

        processed_file_name = generate_text(slogan, r'C:\Users\Sai Nayunipati\Desktop\bostonhacks-2022\back-end\adi\raw' + f'\{raw_file_name}', style)

        ad = Advertisement(owner=user_profile, raw_image_file_name=raw_file_name, 
                           processed_image_file_name=processed_file_name, style=style, 
                           image_description=img_desc, product_description=desc, 
                           target_audience=audience, slogan=slogan, dalle_link=dalle_link)

        ad.save()

        return JsonResponse({"hadSufficientCredits": True, "resource_link": f"http://127.0.0.1:8000/output/{processed_file_name}"})

    return JsonResponse({"hadSufficientCredits": False})


# The user gets a certain number of credits
@csrf_exempt
def buy_credits(request):
    """
    Deposit some credits into the user's account.
    """
    auth_header = request.META['HTTP_AUTHORIZATION']
    encoded_credentials = auth_header.split(' ')[1]
    decoded_credentials = base64.b64decode(
        encoded_credentials).decode("utf-8").split(':')
    username = decoded_credentials[0]
    password = decoded_credentials[1]
    feed_bot = authenticate(username=username, password=password)

    # Deposit the credits (pylint: disable=no-member)
    recieved_json_data = json.loads(request.body.decode("utf-8"))
    user_profile = Profile.objects.get(user=feed_bot)
    user_profile.credits_remaining += int(recieved_json_data['num_credits'])
    user_profile.save()

    return HttpResponse(user_profile.credits_remaining)


def get_resource(request, resource_path):
    """
    Returns the generated image resource with a specified file name
    """
    return FileResponse(open(f'processed/{resource_path}', 'rb'))


def get_number_credits(request):
    """
    Gets the number of credits in a user's accounts
    """
    auth_header = request.META['HTTP_AUTHORIZATION']
    encoded_credentials = auth_header.split(' ')[1]
    decoded_credentials = base64.b64decode(
        encoded_credentials).decode("utf-8").split(':')
    username = decoded_credentials[0]
    password = decoded_credentials[1]
    feed_bot = authenticate(username=username, password=password)

    # pylint: disable=no-member
    user_profile = Profile.objects.get(user=feed_bot)
    return HttpResponse(user_profile.credits_remaining)


def register(request, username, password):
    """
    Registers a new user
    """
    user = User.objects.create_user(username=username, password=password)
    user.save()

    profile = Profile(user=user, credits_remaining=3)
    profile.save()
    return HttpResponse("Congratulations! You have a new account with " + str(profile.credits_remaining) + " credits!")


def get_all_owned_images(request):
    """
    Get all the images associated with a user
    """
    auth_header = request.META['HTTP_AUTHORIZATION']
    encoded_credentials = auth_header.split(' ')[1]
    decoded_credentials = base64.b64decode(
        encoded_credentials).decode("utf-8").split(':')
    username = decoded_credentials[0]
    password = decoded_credentials[1]
    feed_bot = authenticate(username=username, password=password)

    # Django querying (pylint: disable=no-member)
    query_set = Profile.objects.get(user=feed_bot).advertisement_set.all()
    result = [advertisement.final_image_path for advertisement in query_set]
    return JsonResponse({"owned images": result})


def delete_advertisement(request, resource_path):
    """
    The user can delete a given advertisement.
    """
    auth_header = request.META['HTTP_AUTHORIZATION']
    encoded_credentials = auth_header.split(' ')[1]
    decoded_credentials = base64.b64decode(
        encoded_credentials).decode("utf-8").split(':')
    username = decoded_credentials[0]
    password = decoded_credentials[1]
    feed_bot = authenticate(username=username, password=password)

    # pylint: disable=no-member, pylint: disable=invalid-name
    ad = Advertisement.objects.get(processed_image_file_name=resource_path)

    # pylint: disable=no-member
    if ad is not None and ad.owner == Profile.objects.get(user=feed_bot):
        os.remove(f"raw/{ad.original_image_path}")
        os.remove(f"processed/{ad.final_image_path}")
        ad.delete()

        return HttpResponse("Successfully deleted!")

    return HttpResponse("Failure.")


@csrf_exempt
def update_advertisement_text(request, resource_path):
    """
    Generates a new slogan for an image given new
    text inputs. Deletes the old image and modifies
    the Advertisement model.
    """
    auth_header = request.META['HTTP_AUTHORIZATION']
    encoded_credentials = auth_header.split(' ')[1]
    decoded_credentials = base64.b64decode(
        encoded_credentials).decode("utf-8").split(':')
    username = decoded_credentials[0]
    password = decoded_credentials[1]
    feed_bot = authenticate(username=username, password=password)

    recieved_json_data = json.loads(request.body.decode("utf-8"))

    # pylint: disable=no-member; pylint: disable=invalid-name
    ad = Advertisement.objects.get(processed_image_file_name=resource_path)

    if 'product_description' in recieved_json_data:
        new_product_description = recieved_json_data['product_description']
        ad.product_description = new_product_description

    if 'target_audience' in recieved_json_data:
        new_target_audience = recieved_json_data['target_audience']
        ad.target_audience = new_target_audience

    # Regenerate the image
    # Delete the old image
    # Update the model

    ad.save()

    return HttpResponse("Success!")

def get_dalle_url(request):
    pass