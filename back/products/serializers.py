from rest_framework import serializers
from .models import Product
from categories.serializers import CategorySerializer


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    category_data = CategorySerializer(source="category", read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "title",
            "image",
            "price",
            "active",
            "category",
            "category_data",
        )
        read_only_field = ("id",)

    def create(self, validated_data):
        image = validated_data.pop("image")
        instance = super().create(validated_data)
        instance.image.save(image.name, image)
        return instance
