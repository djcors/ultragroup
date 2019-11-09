# coding: utf-8
from django.db import models
from django.contrib.auth.models import User


class AgencyModel(User):

    class Meta:
        verbose_name = "AgencyModel"
        verbose_name_plural = "AgencyModels"

    def __str__(self):
        return self.username


class BaseModel(models.Model):
	name = models.CharField(u('name'), max_length=100, db_index=True)
	active = models.BooleanField(default=True)
	code = models.CharField(u('code'), max_length=30)

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
	category = models.PositiveSmallIntegerField(u('category'), default=3)

    class Meta:
        verbose_name = "HotelModel"
        verbose_name_plural = "HotelModels"

    def __str__(self):
        return "{} - {}".format(self.name, str(self.category))


class RoomModel(BaseModel):
	hotel = models.ForeignKey(hotel, related_name='hotel_rooms')
	price = models.PositiveIntegerField(u('price'))

    class Meta:
        verbose_name = "RoomModel"
        verbose_name_plural = "RoomModels"

    def __str__(self):
        pass
    
    