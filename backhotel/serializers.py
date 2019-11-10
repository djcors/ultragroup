# coding: utf-8
from rest_framework import serializers
from backhotel.models import *

class AgencyModelSerializer(serializers.ModelSerializer):
	token = serializers.CharField(source='auth_token.key', read_only=True)
	class Meta:
		model = AgencyModel
		fields = ('username', 'token')


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
