from django.contrib import admin
from django.contrib.auth.models import User
from backhotel.models import *

#admin.site.unregister(User)
admin.site.register(AgencyModel)
admin.site.register(HotelModel)
admin.site.register(RoomModel)

admin.site.register(BookingModel)
admin.site.register(PaxModel)

