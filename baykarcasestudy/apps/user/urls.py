from django.urls import path

from baykarcasestudy.apps.user.rest.views.login import LoginView
from baykarcasestudy.apps.user.rest.views.register import RegisterView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Get new access token with rest_framework_simplejwt library
]
