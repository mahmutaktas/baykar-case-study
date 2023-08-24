from django.urls import include, path
from baykarcasestudy.iha.rest.views.iha import IHACreate, IHAList, IHADetail, IHADelete, IHAUpdate

urlpatterns = [
    path('create/', IHACreate.as_view(), name='create-iha'),
    path('', IHAList.as_view()),
    path('<int:pk>/', IHADetail.as_view(), name='retrieve-iha'),
    path('update/<int:pk>/', IHADelete.as_view(), name='update-iha'),
    path('delete/<int:pk>/', IHAUpdate.as_view(), name='delete-iha')
]
