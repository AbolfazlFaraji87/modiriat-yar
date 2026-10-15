from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Project
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)

        if instance.image:
            request = self.context.get("request")
            image_url = instance.image.url

            if request:
                image_url = request.build_absolute_uri(image_url)

            data["image"] = image_url
        else:
            data["image"] = None

        return data
