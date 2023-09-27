from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Category
from .serializers import CategorySerializer


# Create your views here.
class CategoryModelViewSet(ModelViewSet):
    queryset = Category.objects.all()
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = CategorySerializer

    def get_permissions(self):
        print(self.action)
        if (
            self.action == "create"
            or self.action == "update"
            or self.action == "destroy"
        ):
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    def get_authenticators(self):
        print(self.request.method)
        if (
            self.request.method == "POST"
            or self.request.method == "PUT"
            or self.request.method == "DELETE"
        ):
            self.authentication_classes = [JWTAuthentication]
        return [auth() for auth in self.authentication_classes]
