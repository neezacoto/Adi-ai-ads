from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('generate/', views.generate, name='generate'),
    path('buy/', views.buy, name='buy'),
    path('output/<str:resource_path>', views.output, name='output'),
    path('num-credits/', views.num_credits, name='num-credits',),
    path('register/<str:username>/<str:password>', views.register, name='register')
]
