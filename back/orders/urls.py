from django.urls import path, include
from rest_framework.routers import DefaultRouter

from orders.views import OrderModelViewSet

app_name = "orders"

router = DefaultRouter()
router.register(prefix="orders", viewset=OrderModelViewSet, basename="orders")

urlpatterns = [path("", include(router.urls))]
