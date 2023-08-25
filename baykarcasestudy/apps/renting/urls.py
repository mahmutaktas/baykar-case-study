from rest_framework.routers import DefaultRouter

from baykarcasestudy.apps.renting.rest.views.renting import RentedIHAView

router = DefaultRouter()
router.register('iha', RentedIHAView, 'rented-iha')

urlpatterns = router.urls
