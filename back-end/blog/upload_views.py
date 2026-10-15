from pathlib import Path
from uuid import uuid4

from django.core.files.storage import default_storage
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView


class BlogImageUploadView(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        uploaded_file = request.FILES.get("image")

        if not uploaded_file:
            return Response(
                {"image": "An image file is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        allowed_types = {
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
        }

        if uploaded_file.content_type not in allowed_types:
            return Response(
                {"image": "Only JPEG, PNG, WebP, and GIF images are allowed."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if uploaded_file.size > 5 * 1024 * 1024:
            return Response(
                {"image": "The image must be 5 MB or smaller."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        extension = Path(uploaded_file.name).suffix.lower()
        filename = f"blog/inline/{uuid4().hex}{extension}"
        saved_path = default_storage.save(filename, uploaded_file)

        image_url = request.build_absolute_uri(
            default_storage.url(saved_path)
        )

        return Response(
            {"url": image_url},
            status=status.HTTP_201_CREATED,
        )
