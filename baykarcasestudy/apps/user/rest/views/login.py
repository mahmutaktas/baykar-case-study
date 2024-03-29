from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

from baykarcasestudy.apps.user.rest.serializers.login import LoginSerializer


class LoginView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer
