from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def generate(request):
    return HttpResponse("Generate")


def buy(request):
    return HttpResponse("Buy")


def output(request):
    return HttpResponse("Output")


def num_credits(request):
    return HttpResponse("Num credits")
