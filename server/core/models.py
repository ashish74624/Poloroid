from django.db import models
from django.contrib.auth.models import AbstractUser


class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    profile_image = models.URLField(blank=True, null=True)
    place = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}".strip()


class Social(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="socials")
    instagram = models.URLField(blank=True, default='')
    linkedin = models.URLField(blank=True, default='')
    github = models.URLField(blank=True, default='')

    def __str__(self):
        return f"Socials of {self.user.email}"


class UserFriend(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="friends")
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name="friend_of")

    class Meta:
        unique_together = ('user', 'friend')

    def __str__(self):
        return f"{self.user} ↔ {self.friend}"


class FriendRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_requests")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_requests")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender} → {self.receiver} ({self.status})"


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_notifications")
    type = models.CharField(max_length=50)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.user} from {self.sender}"


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    caption = models.TextField(blank=True, null=True)
    image = models.URLField(blank=True, null=True)
    likes_count = models.PositiveIntegerField(default=0)  # optional
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post by {self.user.email} ({self.caption[:20]})"


class PostLike(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="likes")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="liked_posts")

    class Meta:
        unique_together = ('post', 'user')

    def __str__(self):
        return f"{self.user} liked {self.post}"
