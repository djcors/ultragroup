# coding: utf-8
import datetime
from rest_framework import serializers
from backhotel.models import *

class AgencyModelSerializer(serializers.ModelSerializer):
    token = serializers.CharField(source='auth_token.key', read_only=True)
    date_joined = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S",
        required=False, read_only=True)
    class Meta:
        model = AgencyModel
        fields = ('id','username', 'first_name', 'last_name', 'date_joined',
            'email','token')


class HotelModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelModel
        fields = '__all__'


class RoomModelSerializer(serializers.ModelSerializer):
    hotel_display = serializers.CharField(source='hotel.name',
       label='hotel', read_only=True)
    class Meta:
        model = RoomModel
        fields = '__all__'


class BookingModelSerializer(serializers.ModelSerializer):
    room_display = serializers.CharField(source='room.name', read_only=True)
    nights = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = BookingModel
        fields = '__all__'

    def get_nights(self, obj):
        return (obj.deperture - obj.arrival).days


class PaxModelSerializer(serializers.ModelSerializer):
    genre_display = serializers.CharField(source='get_genre_display', read_only=True)
    doc_type_display = serializers.CharField(source='get_doc_type_display', read_only=True)
    class Meta:
        model = PaxModel
        fields = '__all__'
