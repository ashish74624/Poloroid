from django.contrib import admin
from .models import Post, PostLike

class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "user_email", "short_caption", "likes_count", "interactions", "created_at")
    search_fields = ("user__email", "caption")
    list_filter = ("created_at",)
    ordering = ("-created_at",)

    # custom column: show user email
    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = "User Email"

    # custom column: short version of caption
    def short_caption(self, obj):
        return (obj.caption[:30] + "...") if obj.caption and len(obj.caption) > 30 else obj.caption
    short_caption.short_description = "Caption"

    # custom column: interactions
    def interactions(self, obj):
        num_friends = obj.user.friends.count()  # assumes User model has related_name="friends"
        if num_friends > 0:
            return (num_friends * obj.likes_count) + num_friends
        return 0
    interactions.short_description = "Interactions"

admin.site.register(Post, PostAdmin)

admin.site.register(PostLike)