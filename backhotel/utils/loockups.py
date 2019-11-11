# coding: utf-8
from rest_framework import filters, status, generics, permissions, viewsets

class CustomLoockup(filters.SearchFilter):
    lookup_prefixes = {
        '^': 'istartswith',
        '=': 'iexact',
        '@': 'search',
        '$': 'iregex',
        '#': 'unaccent__icontains',
        '<': 'lte',
        '>': 'gte'
    }