from rest_framework import viewsets
from rest_framework.permissions import BasePermission

from .models import ContactMessage
from .serializers import ContactMessageSerializer


class ContactMessagePermission(BasePermission):
    def has_permission(self, request, view):
        user = request.user

        if request.method == "POST":
            return True

        return bool(
            user
            and user.is_authenticated
            and user.is_staff
        )


class ContactMessageViewSet(viewsets.ModelViewSet):
    serializer_class = ContactMessageSerializer
    permission_classes = [ContactMessagePermission]

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated and user.is_staff:
            return ContactMessage.objects.all().order_by("-created_at")

        return ContactMessage.objects.none()
