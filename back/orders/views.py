from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from orders.models import Order
from orders.serializers import OrderSerializer


# Create your views here.
class OrderModelViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ["table", "status", "close"]
    ordering_fields = "__all__"
