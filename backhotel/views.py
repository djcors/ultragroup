# coding: utf-8
from backhotel.serializers import *
from backhotel.models import *
from rest_framework import viewsets
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly


class HotelModelViewSet(viewsets.ModelViewSet):
	queryset = HotelModel.objects.filter(active=True)
	serializer_class = HotelModelSerializer
	permission_classes=[DjangoModelPermissionsOrAnonReadOnly,]


class RoomModelViewSet(viewsets.ModelViewSet):
	queryset = RoomModel.objects.filter(active=True)
	serializer_class = RoomModelSerializer
	permission_classes=[DjangoModelPermissionsOrAnonReadOnly,]