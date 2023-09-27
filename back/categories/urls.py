from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import CategoryModelViewSet


router = DefaultRouter()
router.register("categories", CategoryModelViewSet, basename="category")

app_name = "categories"

urlpatterns = [path("", include(router.urls))]
