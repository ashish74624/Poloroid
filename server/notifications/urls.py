from django.urls import path
from . import views

urlpatterns = [
    path('sendNotification/<int:id>/',views.send_notification,name='send_notification'),
    path('notifications/<str:email>/',views.notifications,name='notifications'),
]
