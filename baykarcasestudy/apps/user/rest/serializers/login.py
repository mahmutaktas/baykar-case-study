from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class LoginSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        """
        Get token and append user email to it
        """
        token = super(LoginSerializer, cls).get_token(user)

        # Add custom claims
        token['email'] = user.email
        return token
