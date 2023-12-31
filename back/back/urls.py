"""back URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf.urls.static import static
from django.conf import settings
import users.urls as user_url
import categories.urls as categories_url
import products.urls as products_url
import tables.urls as tables_url
import orders.urls as orders_urls

schema_view = get_schema_view(
    openapi.Info(
        title="iCard - ApiDoc",
        default_version="v1",
        description="api icard documentation",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="jonatangarzon95@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    #    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "docs/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redocs/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path(
        "swagger<format>/", schema_view.without_ui(cache_timeout=0), name="schema-json"
    ),
    path("api/users/", include(user_url)),
    path("api/categories/", include(categories_url)),
    path("api/products/", include(products_url)),
    path("api/tables/", include(tables_url)),
    path("api/orders/", include(orders_urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
