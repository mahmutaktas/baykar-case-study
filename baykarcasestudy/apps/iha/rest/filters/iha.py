# -*- coding: utf-8 -*-
""" Created by Safa Arıman on 11.10.2022 """
from django_filters import rest_framework as filters

__author__ = 'safaariman'

from baykarcasestudy.apps.iha.models import IHA


class IHAFilter(filters.FilterSet):
    class Meta:
        model = IHA
        fields = {
            'brand': ['exact', 'iexact', 'contains', 'icontains'],
            'model': ['exact', 'iexact', 'contains', 'icontains'],
            'category': ['exact'],
            'weight_unit': ['exact'],
        }
