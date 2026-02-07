import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from users.models import User
from .models import Social
import logging

Logger = logging.getLogger(__name__)


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

        Logger.info("Social links added")
        return JsonResponse({"done": True, "created": created})
    except Exception as e:
        Logger.info("Social links could not be added")
        return JsonResponse({"done": False, "error": str(e)}, status=500)


@csrf_exempt
def get_social(request, email):
    try:
        user = get_object_or_404(User, email=email)
        social = get_object_or_404(Social, user=user)

        if social:
            data = {
                "instagram": social.instagram,
                "linkedin": social.linkedin,
                "github": social.github,
            }
            Logger.info("Social data found")
            return JsonResponse({"social": data, "msg": "User found"})
        else:
            Logger.info("User not found -- Social")
            return JsonResponse({"msg": "User Not Available"}, status=404)
    except Exception as e:
        Logger.error(str(e))
        return JsonResponse({"done": False, "error": str(e)}, status=400)
