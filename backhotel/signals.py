# coding: utf-8
from django.dispatch import receiver
from django.db.models.signals import (post_save,
	post_delete, pre_save)
from rest_framework.authtoken.models import Token
from backhotel.models import *
from django.contrib.auth.models import User, Permission, Group


@receiver(post_save, sender=AgencyModel)
def post_save_agency(sender, instance, created=None, **kwargs):
	if created:
		token, _ = Token.objects.get_or_create(user=instance)
		group = Group.objects.get(name='agency')
		instance.groups.add(group)