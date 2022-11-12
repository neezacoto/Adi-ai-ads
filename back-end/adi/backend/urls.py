from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('generate/', views.generate, name='generate'),
    path('buy/', views.buy, name='buy'),
    path('output/', views.output, name='output'),
    path('num-credits/', views.num_credits, name='num-credits',)
]
