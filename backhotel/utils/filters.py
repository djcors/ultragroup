# coding: utf-8
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .loockups import CustomLoockup

class FilterAndSearchModelViewSet(viewsets.ModelViewSet):
	filter_backends = (DjangoFilterBackend,CustomLoockup, filters.OrderingFilter)
	search_fields = ('#nombre',)
