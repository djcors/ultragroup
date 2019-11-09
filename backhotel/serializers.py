# coding: utf-8
from rest_framework import serializers
from backhotel.models import *


class HotelModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelModel
        fields = '__all__'


class RoomModelSerializer(serializers.ModelSerializer):
	#hotel_display = serializers.CharField(source='hotel.name',
	#	label='hotel', read_only=True)
    class Meta:
        model = RoomModel
        fields = '__all__'
