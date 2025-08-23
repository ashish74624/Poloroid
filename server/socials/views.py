import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from users.models import User
from .models import Social

# -------------------- SOCIALS -------------------- #
@csrf_exempt
def add_social(request, email):

    try:
        payload = json.loads(request.body)
        instagram = payload.get("instagram", "")
        linkedin = payload.get("linkedin", "")
        github = payload.get("github", "")

        user = get_object_or_404(User, email=email)

        # Get or create Social entry
        social, created = Social.objects.get_or_create(user=user)
        social.instagram = instagram
        social.linkedin = linkedin
        social.github = github
        social.save()

        return JsonResponse({"done": True, "created": created})
    except Exception as e:
        return JsonResponse({"done": False, "error": str(e)}, status=500)

@csrf_exempt
def get_social(request, email):
    try:
        user = get_object_or_404(User, email=email)
        social = getattr(user, "socials", None)

        if social:
            data = {
                "instagram": social.instagram,
                "linkedin": social.linkedin,
                "github": social.github,
            }
            return JsonResponse({"social": data, "msg": "User found"})
        else:
            return JsonResponse({"msg": "User Not Available"}, status=404)
    except Exception as e:
        return JsonResponse({"done": False, "error": str(e)}, status=400)
