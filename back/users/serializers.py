from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "is_active",
            "is_staff",
        ]
        extra_kwargs = {"password": {"write_only": True, "min_length": 5}}
