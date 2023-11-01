from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import TableModelViewSet

app_name = "tables"

router = DefaultRouter()
router.register("tables", TableModelViewSet, basename="tables")

urlpatterns = [path("", include(router.urls))]
