"""prueba_angular URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.urls import path
from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.views.generic.base import TemplateView
from backhotel.router import *
from backhotel.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/auth/', AuthToken.as_view()),
    url(r'^api/destinations/', DestinationsApiView.as_view()),
    url(r'^api/dashboard/', DashboardApiView.as_view()),
    url(r'^api/agency/', include(agency_urlpattenrs)),
    url(r'^api/hotel/', include(hotel_urlpatterns)),
    url(r'^api/room/', include(room_urlpattenrs)),
    url(r'^api/booking/', include(booking_urlpattenrs)),
    url(r'^api/pax/', include(pax_urlpattenrs)),
    url(r'^.*', TemplateView.as_view(template_name="index.html"), name="home")
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
