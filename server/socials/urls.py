from django.urls import path
from . import views

urlpatterns = [
    path('addSocial/<str:email>/',views.add_social,name='add_social'),
    path('getSocial/<str:email>/',views.get_social,name='get_social')
]
