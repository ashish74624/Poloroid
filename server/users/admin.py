from django.contrib import admin
from .models import User, UserFriend, FriendRequest


admin.site.register(User)
admin.site.register(UserFriend)
admin.site.register(FriendRequest)
