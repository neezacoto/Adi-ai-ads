from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('generate/', views.generate_image, name='generate'),
    path('buy/', views.buy_credits, name='buy'),
    path('output/<str:resource_path>', views.get_resource, name='output'),
    path('delete/<str:resource_path>', views.delete_advertisement, name='delete'),
    path('num-credits/', views.get_number_credits, name='num-credits',),
    path('register/<str:username>/<str:password>',
         views.register, name='register'),
    path('get-all/', views.get_all_owned_images, name='get-all'),
    path('update-advertisement-text/<str:resource_path>', views.update_advertisement_text, name='update-advertisement_text')
]
