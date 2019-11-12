# coding: utf-8
from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import ugettext_lazy as _


class AgencyModel(User):

    class Meta:
        verbose_name = "AgencyModel"
        verbose_name_plural = "AgencyModels"

    def __str__(self):
        return self.username


class BaseModel(models.Model):
    name = models.CharField(_(u'name'), max_length=100, db_index=True)
    active = models.BooleanField(default=True)
    code = models.CharField(_(u'code'), max_length=30)

    class Meta:
        verbose_name = "BaseModel"
        verbose_name_plural = "BaseModels"
        abstract = True

    def __str__(self):
        return self.name
    


class HotelModel(BaseModel):

    u"""
        Hotel model class
    """
    agency = models.ForeignKey(AgencyModel, related_name='agency_hoteles',
        on_delete=models.CASCADE)
    category = models.PositiveSmallIntegerField(_(u'category'), default=3)

    class Meta:
        verbose_name = "HotelModel"
        verbose_name_plural = "HotelModels"
        ordering = ('id',)

    def __str__(self):
        return "{} - {}".format(self.name, str(self.category))


class RoomModel(BaseModel):
    hotel = models.ForeignKey(HotelModel, related_name='hotel_rooms',
        on_delete=models.CASCADE)
    room_type = models.CharField(_(u'type'), max_length=50)
    base_price = models.PositiveIntegerField(_(u'price'))
    tax = models.PositiveIntegerField(_(u'% tax'))
    location = models.CharField(_(u'location'), max_length=250)

    class Meta:
        verbose_name = "RoomModel"
        verbose_name_plural = "RoomModels"
        ordering = ('id',)

    def __str__(self):
        return self.name  


class BookingModel(models.Model):

    room = models.ForeignKey(RoomModel, related_name='booking_rooms', on_delete=models.CASCADE)
    emergency_name = models.CharField(max_length=200, blank=True, null=True)
    emergency_phone = models.CharField(max_length=200, blank=True, null=True)
    tax = models.PositiveIntegerField(blank=True, null=True)
    base_price = models.PositiveIntegerField(blank=True, null=True)
    total_imported = models.PositiveIntegerField(blank=True, null=True)
    confirmed = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)
    total_pax = models.PositiveIntegerField(blank=True, null=True)
    arrival = models.DateField(blank=True, null=True)
    deperture = models.DateField(blank=True, null=True)

    class Meta:
        verbose_name = "BookingModel"
        verbose_name_plural = "BookingModels"

    def __str__(self):
        return self.room.name


class PaxModel(models.Model):

    NONE, MALE, FEMALE, OTHER = range(0,4)
    GENRE = (
        (NONE, 'No spec'),
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (OTHER, 'Other')
    )

    NID, PASSPORT = range(1,3)
    DOCUMENT_TYPES = (
        (NID, "NID"),
        (PASSPORT, "Passport"),
    )

    booking = models.ForeignKey(BookingModel, related_name='booking_pax', on_delete=models.CASCADE)
    full_name = models.CharField(max_length=250)
    born_date = models.DateField()
    genre = models.PositiveIntegerField(choices=GENRE, default=NONE)
    doc_type = models.PositiveIntegerField(choices=DOCUMENT_TYPES, default=PASSPORT)
    doc_number = models.BigIntegerField()
    email = models.CharField(max_length=250)
    telephone = models.CharField(max_length=250)

    class Meta:
        verbose_name = "PaxModel"
        verbose_name_plural = "PaxModels"

    def __str__(self):
        return self.full_name
    



from .signals import *
    
    