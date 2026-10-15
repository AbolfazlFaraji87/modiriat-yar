from rest_framework import serializers

from .models import BlogPost


class BlogPostSerializer(serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")

    def get_cover_image_url(self, obj):
        if not obj.cover_image:
            return None

        request = self.context.get("request")
        url = obj.cover_image.url

        return request.build_absolute_uri(url) if request else url
