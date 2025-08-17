import json
from .models import User, UserFriend, FriendRequest
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from notifications.models import Notification


@csrf_exempt
def get_user_data(request,email):
    try:
        user = get_object_or_404(User,email=email)
        return JsonResponse({
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "place": user.place,
            "profile_image": user.profile_image 
        })
    except Exception as e:
        print('Could not fetch user data')   
        return JsonResponse({"error":"Couldn't fetch user data"},status=500) 

@csrf_exempt
def get_friends_suggestion(request,email):
    try:
        # 1. get current user
        user = get_object_or_404(User,email=email)

        # 2. get all users but me
        suggestion = User.objects.exclude(email=email)

        # 3. exclude all users whole are already friends
        friends = UserFriend.objects.filter(user=user).values_list('friend_id',flat=True)
        suggestion = suggestion.exclude(id_in= friends)

        # 4. exclude all who the current user already sent a request
        already_requested = FriendRequest.objects.filter(sender=user).values_list('receiver',flat=True)
        suggestion = suggestion.exclude(id_in= already_requested)

        # 5. exclude people who already sent requests to current user
        received_requests = FriendRequest.objects.filter(receiver=user).values_list('sender_id', flat=True)
        suggestions = suggestions.exclude(id__in=received_requests)

        # 6. exclude people who rejected the current user
        rejected = FriendRequest.objects.filter(sender=user, status='rejected').values_list('receiver_id', flat=True)
        suggestions = suggestions.exclude(id__in=rejected)

        # 7. exclude people current user rejected
        rejected_by_me = FriendRequest.objects.filter(receiver=user, status='rejected').values_list('sender_id', flat=True)
        suggestions = suggestions.exclude(id__in=rejected_by_me)

        result = [
            {
                "id": u.id,
                "first_name": u.first_name,
                "last_name": u.last_name,
                "email": u.email,
                "place": u.place,
                "profile_image": u.profile_image
            }
            for u in suggestions
        ]

        return JsonResponse(result, safe=False)


    except Exception as e:
        print("Error suggesting friends:", e)
        return JsonResponse({"error": "Error suggesting friends"}, status=500)    
    

@csrf_exempt
def add_friend(request, email):
    user = get_object_or_404(User, email=email)

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            friend_id = data.get('friendID')
            friend = get_object_or_404(User, id=friend_id)

            UserFriend.objects.create(user=user, friend=friend)

            try:
                friend_request = FriendRequest.objects.get(sender=user, receiver=friend)
                friend_request.status = 'accepted'
                friend_request.save()
            except FriendRequest.DoesNotExist:
                return JsonResponse({"error": "Friend request not found"}, status=404)

            return JsonResponse({'status': 'ok', 'msg': 'Friend Added'})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=405)


@csrf_exempt
def get_friends(request,email):
    try:
        current_user = get_object_or_404(User,email=email)

        friend_ids = UserFriend.objects.filter(user=current_user).values_list('friend_id',flat=True)

        friends = User.filter(id_in=friend_ids)

        if friends.exists():
            friendsDetails = [
                {
                    "id": u.id,
                    "first_name": u.first_name,
                    "last_name": u.last_name,
                    "email": u.email,
                    "place": u.place,
                    "profile_image": u.profile_image
                }
                for u in friends
            ]

            return JsonResponse({'msg':'friends Found','friends':friendsDetails})
        else:
            return JsonResponse({"msg": "No friends"}, status=200)

    except Exception as e:
         return JsonResponse({"error": "Error finding friends"}, status=500)         
    

@csrf_exempt
def reject_request(request, sender_id):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request"}, status=405)

    try:
        payload = json.loads(request.body or "{}")
        email = payload.get("email") 
        if not email:
            return JsonResponse({"error": "email is required"}, status=400)

        # receiver = the current user (who is rejecting)
        receiver = get_object_or_404(User, email=email)
        # sender = the user who sent the request
        sender = get_object_or_404(User, id=sender_id)

        # 1) Remove any related notification(s) shown to the receiver from this sender
        Notification.objects.filter(user=receiver, sender=sender).delete()

        # 2) Mark the friend request as rejected (or delete it if you prefer)
        fr = FriendRequest.objects.filter(sender=sender, receiver=receiver).order_by('-created_at').first()
        if fr:
            fr.status = "rejected"
            fr.save()

        return JsonResponse({"msg": "Request Rejected"}, status=200)

    except Exception as e:
        return JsonResponse({"error": "Unable to reject request"}, status=500)    
    

@csrf_exempt
def remove_suggestion(request,id):
    try:
        payload = json.loads(request.body or '{}')  
        email = payload.get("email") 
        current_user = get_object_or_404(User,email=email)
        suggested_user = get_object_or_404(User,id=id)
        
        request,created = FriendRequest.objects.get_or_create(
            sender = suggested_user,
            receiver = current_user,
            defaults={"status": "rejected"}
        )
        if not created:
            request.status = "rejected"
            request.save()

        return JsonResponse({'msg': 'Removed suggestion'}, status=200)
    except Exception as e:
        return JsonResponse({'msg':'Unable to remove suggestion'},status=500)    
