# -*- coding: utf-8 -*-
""" Created by Safa Arıman on 11.10.2022 """
from django_filters import rest_framework as filters

__author__ = 'safaariman'

from baykarcasestudy.apps.renting.models import RentedIHA


class RentedIHAFilter(filters.FilterSet):
    iha_brand = filters.UUIDFilter(field_name='iha__brand', lookup_expr='icontains')
    iha_model = filters.UUIDFilter(field_name='iha__model', lookup_expr='icontains')

    class Meta:
        model = RentedIHA
        fields = {
            'renting_start_date': ['lt', 'lte', 'gt', 'gte', 'range'],
            'renting_end_date': ['lt', 'lte', 'gt', 'gte', 'range'],
        }
