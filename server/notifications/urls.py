from django.urls import path
from . import views

urlpatterns = [
    path(
        "sendFriendRequestNotification/<int:id>/",
        views.send_friend_request_notification,
        name="send_notification",
    ),
    path(
        "get_notifications/<str:email>/", views.notifications, name="get_notifications"
    ),
]
