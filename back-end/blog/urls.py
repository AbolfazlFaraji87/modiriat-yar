from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import BlogPostViewSet
from .upload_views import BlogImageUploadView

router = DefaultRouter()
router.register("blog", BlogPostViewSet, basename="blog-post")

urlpatterns = [
    path("blog/upload-image/", BlogImageUploadView.as_view(), name="blog-image-upload"),
    path("", include(router.urls)),
]
