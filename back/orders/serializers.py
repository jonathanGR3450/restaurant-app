from rest_framework import serializers

from orders.models import Order
from tables.serlializers import TableSerializer
from products.serializers import ProductSerializer


class OrderSerializer(serializers.ModelSerializer):
    table_data = TableSerializer(source="table", read_only=True)
    product_data = ProductSerializer(source="product", read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "status",
            "close",
            "table",
            "product",
            "created_at",
            "table_data",
            "product_data",
        ]
        read_only_field = ["id", "created_at"]
