from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ProductsModelViewSet

app_name = "products"

router = DefaultRouter()
router.register("products", ProductsModelViewSet, basename="products")

urlpatterns = [path("", include(router.urls))]
