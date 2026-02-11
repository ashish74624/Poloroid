import json
from .models import User, UserFriend, FriendRequest
from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from notifications.models import Notification
import bcrypt
from rest_framework_simplejwt.tokens import RefreshToken
import logging
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from posts.models import Post

Logger = logging.getLogger(__name__)


@csrf_exempt
def hello(request):
    return HttpResponse("Hello")


@csrf_exempt
@permission_classes([AllowAny])
def register(request):
    try:
        payload = json.loads(request.body)
        email = payload.get("email")
        password = payload.get("password")
        place = payload.get("place")
        first_name = payload.get("firstName")
        last_name = payload.get("lastName")
        new_password = bcrypt.hashpw(
            password.encode("utf-8"), bcrypt.gensalt(10)
        ).decode("utf-8")
        profile_image = (
            payload.get("profileImage")
            or "https://res.cloudinary.com/dcgjy3xv7/image/upload/v1689941239/i07kehkwnznydwl17iil.webp"
        )

        if User.objects.filter(email=email).exists():
            Logger.info("Email already exists")
            return JsonResponse(
                {"status": "error", "msg": "Email already registered"}, status=400
            )

        User.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=new_password,
            profile_image=profile_image,
            place=place,
        )

        Logger.info("User created !")

        return JsonResponse(
            {"status": "ok", "msg": "User registered successfully"}, status=201
        )

    except Exception as e:
        return JsonResponse(
            {"status": "error", "msg": "Internal Server Error", "error": str(e)},
            status=500,
        )


@csrf_exempt
@permission_classes([AllowAny])
def login(request):
    try:
        payload = json.loads(request.body)
        email = payload.get("email")
        password = payload.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            Logger.info("User not found")
            return JsonResponse({"status": "error", "msg": "Invalid email or password"},status=401)

        Logger.info("User found !")
        # user.password is stored hashed (bcrypt hash)
        is_password_valid = bcrypt.checkpw(
            password.encode("utf-8"), user.password.encode("utf-8")
        )

        if is_password_valid:
            refresh = RefreshToken.for_user(user)
            refresh["email"] = user.email
            access_token = str(refresh.access_token)
            user_without_password = {
                "email": user.email,
                "firstName": user.first_name,
                "lastName": user.last_name,
                "profileImage": user.profile_image,
            }
            Logger.info("User Sent")
            return JsonResponse(
                {"status": "ok", "user": user_without_password, "access": access_token}
            )
        else:
            Logger.info("Invalid password")
            return JsonResponse({"status": "error", "msg": "Invalid email or password"})

    except Exception as e:
        Logger.error("Something broke in login, error = ", e)
        return JsonResponse(
            {"status": "error", "msg": "Internal Server Error", "error": str(e)},
            status=500,
        )


@csrf_exempt
def get_user_data(request, email):
    try:
        user = get_object_or_404(User, email=email)
        user_friends = UserFriend.objects.filter(user=user)
        user_posts = Post.objects.filter(user=user)

        total_likes = 0

        for post in user_posts:
            total_likes+=post.likes_count

        return JsonResponse(
            {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "place": user.place,
                "profile_image": user.profile_image,
                "location": user.location,
                "bio": user.bio,
                "friends":len(user_friends),
                "posts":len(user_posts),
                "total_likes":total_likes
            }
        )
    except Exception as e:
        Logger.info("Could not fetch user data, error = ", e)
        return JsonResponse({"error": "Couldn't fetch user data"}, status=500)


@csrf_exempt
def get_friends_suggestion(request, email):
    try:
        # 1. Get current user
        user = get_object_or_404(User, email=email)

        # 2. Get all users but me
        suggestions = User.objects.exclude(email=email)

        # 3. Exclude all users who are already friends
        friends = UserFriend.objects.filter(user=user).values_list(
            "friend_id", flat=True
        )
        suggestions = suggestions.exclude(id__in=friends)

        # 4. Exclude all users the current user already sent a request
        already_requested = FriendRequest.objects.filter(sender=user).values_list(
            "receiver_id", flat=True
        )
        suggestions = suggestions.exclude(id__in=already_requested)

        # 5. Exclude people who already sent requests to current user
        received_requests = FriendRequest.objects.filter(receiver=user).values_list(
            "sender_id", flat=True
        )
        suggestions = suggestions.exclude(id__in=received_requests)

        # 6. Exclude people who rejected the current user
        rejected = FriendRequest.objects.filter(
            sender=user, status="rejected"
        ).values_list("receiver_id", flat=True)
        suggestions = suggestions.exclude(id__in=rejected)

        # 7. Exclude people current user rejected
        rejected_by_me = FriendRequest.objects.filter(
            receiver=user, status="rejected"
        ).values_list("sender_id", flat=True)
        suggestions = suggestions.exclude(id__in=rejected_by_me)

        # Prepare results
        result = [
            {
                "id": u.id,
                "first_name": u.first_name,
                "last_name": u.last_name,
                "email": u.email,
                "place": u.place,
                "profile_image": u.profile_image or "",  # failsafe if null
                "location": u.location,
                "bio": u.bio,
            }
            for u in suggestions
        ]

        if not result:
            Logger.info("No users to suggest")
            return JsonResponse({"msg": "No friend suggestions available"}, status=200)

        Logger.info("Users suggested")
        return JsonResponse({"suggestions": result}, safe=False, status=200)

    except Exception as e:
        Logger.info("Error suggesting friends:", e)
        return JsonResponse({"error": "Error suggesting friends"}, status=500)


@csrf_exempt
def add_friend(request, email):
    user = get_object_or_404(User, email=email)

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            friend_id = data.get("friendId")
            friend = get_object_or_404(User, id=friend_id)

            UserFriend.objects.create(user=user, friend=friend)
            UserFriend.objects.create(user=friend, friend=user)

            try:
                friend_request = FriendRequest.objects.filter(
                    sender=friend, receiver=user
                ).first()
                friend_request.status = "accepted"
                friend_request.save()
                notification = Notification.objects.filter(
                    user=user, sender=friend
                ).first()
                notification.delete()
            except FriendRequest.DoesNotExist:
                Logger.info("Friend request not found")
                return JsonResponse({"error": "Friend request not found"}, status=404)

            return JsonResponse({"status": "ok", "msg": "Friend Added"}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=405)


@csrf_exempt
def get_friends(request, email):
    try:
        current_user = get_object_or_404(User, email=email)

        friend_ids = UserFriend.objects.filter(user=current_user).values_list(
            "friend_id", flat=True
        )

        friends = User.objects.filter(id__in=friend_ids)

        if friends.exists():
            friendsDetails = [
                {
                    "id": u.id,
                    "first_name": u.first_name,
                    "last_name": u.last_name,
                    "email": u.email,
                    "place": u.place,
                    "profile_image": u.profile_image,
                }
                for u in friends
            ]
            Logger.info("Friends found")
            return JsonResponse(
                {"msg": "friends Found", "friends": friendsDetails}, status=200
            )
        else:
            return JsonResponse({"msg": "No friends", "friends": []}, status=200)

    except Exception as e:
        Logger.error(str(e))
        return JsonResponse({"error": "Error finding friends"}, status=500)


@csrf_exempt
def reject_request(request, sender_id):

    try:
        payload = json.loads(request.body or "{}")
        email = payload.get("email")
        if not email:
            Logger.debug("Provide email in request body")
            return JsonResponse({"error": "email is required"}, status=400)

        # receiver = the current user (who is rejecting)
        receiver = get_object_or_404(User, email=email)
        # sender = the user who sent the request
        sender = get_object_or_404(User, id=sender_id)

        # 1) Remove any related notification(s) shown to the receiver from this sender
        Notification.objects.filter(user=receiver, sender=sender).delete()

        # 2) Mark the friend request as rejected (or delete it if you prefer)
        fr = (
            FriendRequest.objects.filter(sender=sender, receiver=receiver)
            .order_by("-created_at")
            .first()
        )
        if fr:
            fr.status = "rejected"
            fr.save()
        Logger.debug("Request Rejected")
        return JsonResponse({"msg": "Request Rejected"}, status=200)

    except Exception as e:
        Logger.error("Unable to reject request")
        return JsonResponse({"error": "Unable to reject request"}, status=500)


@csrf_exempt
def remove_suggestion(request, id):
    try:
        payload = json.loads(request.body or "{}")
        email = payload.get("email")
        current_user = get_object_or_404(User, email=email)
        suggested_user = get_object_or_404(User, id=id)

        request, created = FriendRequest.objects.get_or_create(
            sender=suggested_user,
            receiver=current_user,
            defaults={"status": "rejected"},
        )
        if not created:
            request.status = "rejected"
            request.save()
        Logger.info("Removed suggestion")
        return JsonResponse({"msg": "Removed suggestion"}, status=200)
    except Exception as e:
        Logger.error("Unable to remove suggestion")
        return JsonResponse({"msg": "Unable to remove suggestion"}, status=500)


@csrf_exempt
def get_friend_requests(request, email):
    try:
        current_user = get_object_or_404(User, email=email)
        friend_requests = FriendRequest.objects.filter(
            receiver=current_user, status="pending"
        )

        if friend_requests.exists():
            sender_ids = []
            for requests in friend_requests:
                sender_ids.append(requests.sender.id)

            friend_request_user = []

            for u in sender_ids:
                user = get_object_or_404(User, id=u)

                friend_request_user.append(
                    {
                        "id": user.id,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "email": user.email,
                        "profile_image": user.profile_image,
                    }
                )

            return JsonResponse(
                {
                    "message": "Friend request found",
                    "friend_request_users": friend_request_user,
                },
                status=200,
            )
        else:
            return JsonResponse(
                {"message": "Friend request not found", "friend_request_users": []},
                status=200,
            )

    except Exception as e:
        Logger.error("Unable to find friend request")
        return JsonResponse({"message": "Unable to find friend request"}, status=500)


@csrf_exempt
def update(request, email):
    if request.method != "PUT":
        return JsonResponse({"message": "Invalid request method"}, status=405)

    try:
        user = get_object_or_404(User, email=email)
        payload = json.loads(request.body or "{}")

        user.first_name = payload.get("first_name", user.first_name)
        user.last_name = payload.get("last_name", user.last_name)
        user.email = payload.get("email", user.email)
        user.location = payload.get("location", user.location)
        user.profile_image = payload.get("profile_image", user.profile_image)
        user.bio = payload.get("bio", user.bio)

        user.save()
        return JsonResponse({"message": "User updated successfully"}, status=200)

    except Exception as e:
        Logger.error(f"Unable to update user: {e}")
        return JsonResponse({"message": "Error updating user"}, status=500)
