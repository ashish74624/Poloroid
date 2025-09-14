from django.shortcuts import get_object_or_404
from users.models import User, UserFriend
from django.http import JsonResponse
from .models import Post, PostLike
from django.views.decorators.csrf import csrf_exempt
from django.db.models import F
import json
import logging

Logger = logging.getLogger(__name__) 

@csrf_exempt
def all_posts(request, email):
    try:
        # 1. Get current user
        user = get_object_or_404(User, email=email)

        # 2. Get all friends of this user
        all_friends = UserFriend.objects.filter(user=user).values_list('friend_id', flat=True)

        # 3. Collect ids (friends + self)
        ids_to_fetch = list(all_friends) +[user.id]

        # 4. Fetch posts
        all_posts = Post.objects.filter(user_id__in=ids_to_fetch).order_by("-created_at")
        # 5. If no posts, fallback to default user -- todo: change implementation 
        # default_user = get_object_or_404(User, email="ashishkumar74624@gmail.com")
        # default_post = Post.objects.filter(user=default_user).order_by("-created_at")

        # if default_post.exists() :
        #     posts_json = serialize("json", default_post)
        #     return JsonResponse(json.loads(posts_json), safe=False)

        if all_posts.exists():
            # 👇 return only "fields" directly
            posts_data = list(
                all_posts.annotate(
                    email=F("user__email"),          # alias
                    first_name=F("user__first_name"),
                    last_name=F("user__last_name"),
                    profile_image=F("user__profile_image"),
                ).values(
                    "id",
                    "user_id",
                    "email",    
                    "first_name",
                    "last_name",
                    "profile_image",
                    "caption",
                    "image",
                    "likes_count",
                    "created_at"
                )
            )
            Logger.info("Post data found")
            return JsonResponse(posts_data, safe=False)

        Logger.info("No post found")
        return JsonResponse({"msg": "No posts available"}, status=200)

    except Exception as e:
        Logger.error("Error in all_posts:", str(e))
        return JsonResponse({"msg": "Could not get posts", "error": str(e)}, status=500)    

@csrf_exempt    
def like_post(request,post_id):
    try:
        payload = json.loads(request.body)
        email = payload.get('emailOfUser')
        current_post = get_object_or_404(Post,id=post_id)
        user = get_object_or_404(User,email=email)
        
        is_liked = PostLike.objects.filter(post=current_post,user=user).first()

        curr_like_count = current_post.likes_count


        if is_liked:
            current_post.likes_count =  max(0, current_post.likes_count - 1)
            current_post.save()
            is_liked.delete()
            return JsonResponse({
                'msg': 'disliked',
                'post': {
                    'id': current_post.id,
                    'caption': current_post.caption,
                    'likes_count': current_post.likes_count,
                    'image': current_post.image
                }
            })

        else:
            current_post.likes_count = curr_like_count + 1
            current_post.save()
            PostLike.objects.create(
                post=current_post,
                user = user
            )
            return JsonResponse({
                'msg': 'liked',
                'post': {
                    'id': current_post.id,
                    'caption': current_post.caption,
                    'likes_count': current_post.likes_count,
                    'image': current_post.image,
                }
            })

    except Exception as e:
        return JsonResponse({"msg": "Could not like post", "error": str(e)}, status=500)        

@csrf_exempt
def personal_posts(request, email):
    try:
        current_user = get_object_or_404(User, email=email)
        all_posts = Post.objects.filter(user=current_user)

        posts_data = [
            {
                'id': post.id,
                'caption': post.caption,
                'likes_count': post.likes_count,
                'image': post.image,
                'created_at': post.created_at,
            }
            for post in all_posts
        ]

        if posts_data:
            Logger.info("Personal Post data sent")
            return JsonResponse(posts_data, safe=False)
        else:
            Logger.info("Personal Post data not found")
            return JsonResponse({'msg': 'Posts not found'}, status=404)

    except Exception as e:
        Logger.info("Personal post")
        return JsonResponse(
            {"msg": "Could not return posts", "error": str(e)},
            status=500
        )

@csrf_exempt
def create_post(request):
    if request.method != "POST":
        return JsonResponse({"msg": "Only POST allowed"}, status=405)

    try:
        payload = json.loads(request.body.decode("utf-8"))
        email = payload.get("email")
        caption = payload.get("caption", "")
        image = payload.get("image")

        if not email or not image:
            return JsonResponse({"msg": "Email and image are required"}, status=400)

        current_user = get_object_or_404(User, email=email)

        Post.objects.create(
            user=current_user,
            caption=caption,
            image=image  
        )

        Logger.info("Post created")
        return JsonResponse({"msg": "Post created"}, status=201)
    except Exception as e:
        Logger.error("Could not upload post")
        return JsonResponse(
            {"msg": "Could not upload post", "error": str(e)},
            status=500
        )
    
@csrf_exempt
def liked_by(request, id):
    try:
        post = get_object_or_404(Post, id=id)

        # get all User objects who liked this post
        liked_users = User.objects.filter(liked_posts__post=post).values(
            "id", "first_name", "last_name", "email", "profile_image", "place"
        )

        return JsonResponse(list(liked_users), safe=False)

    except Exception as e:
        return JsonResponse(
            {"msg": "Could not generate list of users who liked this post", "error": str(e)},
            status=500
        )