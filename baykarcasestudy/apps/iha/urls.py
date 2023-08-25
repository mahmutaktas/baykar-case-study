from django.urls import path
from rest_framework.routers import DefaultRouter

from baykarcasestudy.apps.iha.rest.views.iha import IHAView

router = DefaultRouter()
router.register('iha', IHAView, 'iha')

urlpatterns = router.urls
