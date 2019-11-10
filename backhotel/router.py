# coding: utf-8
from rest_framework import routers
from backhotel.views import *

router_agency = routers.SimpleRouter()
router_agency.register(r'', AgencyViewSet, base_name='contacto')
agency_urlpattenrs = router_agency.urls

router_hotel = routers.SimpleRouter()
router_hotel.register(r'', HotelModelViewSet, base_name='hotel')
hotel_urlpatterns = router_hotel.urls


router_room = routers.SimpleRouter()
router_room.register(r'', RoomModelViewSet, base_name='contacto')
room_urlpattenrs = router_room.urls