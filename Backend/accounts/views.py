from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView

from rest_framework_simplejwt.serializers import (
    TokenRefreshSerializer,
)

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    RegisterSerializer,
    LoginSerializer,
)


REFRESH_COOKIE_NAME = "library_refresh_token"


def set_refresh_cookie(response, refresh_token):

    response.set_cookie(
        key=REFRESH_COOKIE_NAME,
        value=refresh_token,
        max_age=7 * 24 * 60 * 60,

        httponly=True,

        secure=False,

        samesite="Lax",

        path="/api/auth/",
    )


def delete_refresh_cookie(response):

    response.delete_cookie(
        key=REFRESH_COOKIE_NAME,
        path="/api/auth/",
    )


def user_data(user):

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
    }


class RegisterView(CreateAPIView):

    permission_classes = [
        AllowAny
    ]

    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        access = refresh.access_token

        response = Response(
            {
                "message": "Account created successfully.",
                "user": user_data(user),
                "access": str(access),
            },
            status=status.HTTP_201_CREATED,
        )

        set_refresh_cookie(
            response,
            str(refresh)
        )

        return response


class LoginView(APIView):

    permission_classes = [
        AllowAny
    ]

    def post(self, request):

        serializer = LoginSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        access = refresh.access_token

        response = Response(
            {
                "message": "Login successful.",
                "user": user_data(user),
                "access": str(access),
            },
            status=status.HTTP_200_OK,
        )

        set_refresh_cookie(
            response,
            str(refresh)
        )

        return response


class RefreshView(APIView):

    permission_classes = [
        AllowAny
    ]

    def post(self, request):

        refresh_token = request.COOKIES.get(
            REFRESH_COOKIE_NAME
        )

        if not refresh_token:

            return Response(
                {
                    "detail": "Refresh token not found."
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        serializer = TokenRefreshSerializer(
            data={
                "refresh": refresh_token
            }
        )

        try:

            serializer.is_valid(
                raise_exception=True
            )

        except Exception:

            response = Response(
                {
                    "detail": "Refresh token is invalid or expired."
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

            delete_refresh_cookie(response)

            return response

        access = serializer.validated_data["access"]

        new_refresh = serializer.validated_data.get(
            "refresh"
        )

        response = Response(
            {
                "access": access
            },
            status=status.HTTP_200_OK,
        )

        if new_refresh:

            set_refresh_cookie(
                response,
                new_refresh
            )

        return response


class LogoutView(APIView):

    permission_classes = [
        AllowAny
    ]

    def post(self, request):

        refresh_token = request.COOKIES.get(
            REFRESH_COOKIE_NAME
        )

        if refresh_token:

            try:

                token = RefreshToken(
                    refresh_token
                )

                token.blacklist()

            except Exception:

                pass

        response = Response(
            {
                "message": "Logout successful."
            },
            status=status.HTTP_200_OK,
        )

        delete_refresh_cookie(response)

        return response


class MeView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        return Response(
            {
                "user": user_data(
                    request.user
                )
            }
        )