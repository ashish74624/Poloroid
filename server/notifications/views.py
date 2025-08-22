import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from users.models import User
from .models import Notification


@csrf_exempt
def notifications(request, email):
    try:
        user = get_object_or_404(User, email=email)
        notif_qs = user.notifications.all().order_by("-created_at")

        notifications_list = [
            {
                "id": n.id,
                "sender": n.sender.email,
                "type": n.type,
                "is_read": n.is_read,
                "created_at": n.created_at,
            }
            for n in notif_qs
        ]

        return JsonResponse({"status": "ok", "msg": notifications_list})
    except Exception as e:
        return JsonResponse({"status": "not ok", "msg": str(e)})


@csrf_exempt
def send_notification(request, id):  # id = friend user_id
    if request.method != "POST":
        return JsonResponse({"status": "error", "msg": "Invalid request"}, status=405)

    try:
        payload = json.loads(request.body)
        email_of_user = payload.get("emailOfUser")
        email_of_user = email_of_user.replace("%40", "@") if email_of_user else None

        sender = get_object_or_404(User, email=email_of_user)
        receiver = get_object_or_404(User, id=id)

        # Create notification
        Notification.objects.create(
            user=receiver,
            sender=sender,
            type="friend_request"
        )

        # Create a FriendRequest as well (to match your mongo `request` push)
        from users.models import FriendRequest
        FriendRequest.objects.create(sender=sender, receiver=receiver)

        return JsonResponse({"status": "ok", "msg": "Notification sent successfully"})
    except Exception as e:
        return JsonResponse({"status": "error", "msg": str(e)}, status=500)