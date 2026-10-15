from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.core.validators import RegexValidator
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError


User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
    max_length=150,
        validators=[
            RegexValidator(
                regex=r'^[\w.@+\-\u200c ]+$',
                message=(
                    "نام کاربری می‌تواند شامل حروف فارسی و انگلیسی، "
                    "اعداد، فاصله و علائم مجاز می باشد."
                ),
            ),
            UniqueValidator(
                queryset=User.objects.all(),
                message="این نام کاربری قبلاً ثبت شده است.",
            ),
        ],
    )

    password = serializers.CharField(
        write_only=True,
        validators=[validate_password],
        style={"input_type": "password"},
    )

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        read_only_fields = ["id"]

    def validate_email(self, value):
        value = value.strip().lower()

        if not value:
            raise serializers.ValidationError(
                "Email is required."
            )

        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                "An account with this email already exists."
            )

        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)



class ProfileUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        max_length=150,
        validators=[
            RegexValidator(
                regex=r"^[\w.@+\-\u200c ]+$",
                message="نام کاربری شامل کاراکترهای غیرمجاز است.",
            )
        ],
    )

    class Meta:
        model = User
        fields = ["username", "email"]

    def validate_username(self, value):
        current_user = self.instance

        if User.objects.filter(username__iexact=value).exclude(
            pk=current_user.pk
        ).exists():
            raise serializers.ValidationError(
                "این نام کاربری قبلاً استفاده شده است."
            )

        return value

    def validate_email(self, value):
        current_user = self.instance

        value = value.strip().lower()

        if User.objects.filter(email__iexact=value).exclude(
            pk=current_user.pk
        ).exists():
            raise serializers.ValidationError(
                "این ایمیل قبلاً ثبت شده است."
            )

        return value


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )
    new_password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    def validate_new_password(self, value):
        user = self.context["request"].user

        try:
            validate_password(value, user=user)
        except DjangoValidationError as error:
            raise serializers.ValidationError(error.messages)

        return value