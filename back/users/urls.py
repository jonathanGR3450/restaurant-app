from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
)
from users.views import UserApiViewSet, UserMeApiViewSet

router_user = DefaultRouter()

router_user.register(prefix="users", basename="users", viewset=UserApiViewSet)

urlpatterns = [
    path("", include(router_user.urls)),
    path("auth/login", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("logout/", TokenBlacklistView.as_view(), name="token_blacklist"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/me/", UserMeApiViewSet.as_view()),
]
