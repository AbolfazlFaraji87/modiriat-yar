from django.db.models import Q
from django.utils import timezone

from rest_framework import viewsets
from rest_framework.permissions import BasePermission, SAFE_METHODS

from .models import BlogPost
from .serializers import BlogPostSerializer


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.is_staff
        )


class BlogPostViewSet(viewsets.ModelViewSet):
    serializer_class = BlogPostSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        now = timezone.now()

        BlogPost.objects.filter(
            status=BlogPost.Status.SCHEDULED,
            scheduled_for__isnull=False,
            scheduled_for__lte=now,
        ).update(
            status=BlogPost.Status.PUBLISHED,
            published_at=now,
        )

        queryset = BlogPost.objects.all().order_by("-published_at")

        if self.request.user and self.request.user.is_staff:
            return queryset

        return queryset.filter(
            status=BlogPost.Status.PUBLISHED
        )
