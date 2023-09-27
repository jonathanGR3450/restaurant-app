from rest_framework import serializers

from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=True)

    class Meta:
        model = Category
        fields = ("id", "title", "image")
        read_only_fields = ("id",)

    def create(self, validated_data):
        image = validated_data.pop("image")
        instance = super().create(validated_data)
        instance.image.save(image.name, image)
        return instance
