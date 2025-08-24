from django.urls import path
from . import views


urlpatterns = [
    path('allPost/<str:email>/',views.all_posts,name='all_posts'),
    path('personalPosts/<str:email>/',views.personal_posts,name='personal_posts'),
    path('like/<int:post_id>/',views.like_post,name='like_post'),
    path('post/',views.create_post,name='post'),
    path('upload/',views.create_post,name='upload'),
    path('getImages/<str:email>/',views.all_posts,name='get_images'),
    path('getLikedUsers/<int:id>/',views.liked_by,name='liked_by')
]
