from rest_framework import viewsets

from .models import Service
from .serializers import ServiceSerializer
from projects.permissions import IsAdminOrReadOnly


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all().order_by("-created_at")
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminOrReadOnly]
