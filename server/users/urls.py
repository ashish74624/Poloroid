from django.urls import path, include
from . import views

urlpatterns = [
    path('',views.hello),
    path('register/',views.register,name='register'),
    path('login/',views.login,name='login'),
    path('data/<str:email>/',views.get_user_data,name='get_user_data'),
    path('getFriendSuggestions/<str:email>/',views.get_friends_suggestion,name='get_friends_suggestion'),
    path('addFriend/<str:email>/',views.add_friend,name='add_friend'),
    path('removeSuggestion/<int:id>/',views.remove_suggestion,name='remove_suggestion'),
    path('rejectRequest/<int:id>/',views.reject_request,name='reject_request'),
    path('friends/<str:email>/',views.get_friends,name='get_friends')
]
