from django_filters import rest_framework as filters

from baykarcasestudy.apps.renting.models import RentedIHA


class RentedIHAFilter(filters.FilterSet):
    iha_brand = filters.CharFilter(field_name='iha__brand',
                                   lookup_expr='icontains')  # Custom filter to filter rented ihas by their iha brand
    iha_model = filters.CharFilter(field_name='iha__model',
                                   lookup_expr='icontains')  # Custom filter to filter rented ihas by their iha model

    class Meta:
        model = RentedIHA
        fields = {
            'renting_start_date': ['lt', 'lte', 'gt', 'gte', 'range'],
            'renting_end_date': ['lt', 'lte', 'gt', 'gte', 'range'],
        }
