from django.urls import path
from baykarcasestudy.apps.renting.rest.views.renting import RentedIHACreate, RentedIHAList, RentedIHAUpdate, \
    RentedIHADelete

urlpatterns = [
    path('create/', RentedIHACreate.as_view(), name='create-rented-iha'),
    path('', RentedIHAList.as_view()),
    path('update/<int:pk>/', RentedIHAUpdate.as_view(), name='update-rented-iha'),
    path('delete/<int:pk>/', RentedIHADelete.as_view(), name='delete-rented-iha')
]
