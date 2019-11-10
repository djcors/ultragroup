# coding: utf-8
from backhotel.serializers import *
from backhotel.models import *
from rest_framework import (filters , generics,
    permissions, viewsets, parsers, renderers, status)
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from rest_framework.views import APIView


class AuthToken(APIView):
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = AuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=False)
        if valid:
            user = serializer.validated_data['user']
            print (user, user.agencymodel)
            user_serializer = AgencyModelSerializer(user.agencymodel)
            return Response(
                {'data':user_serializer.data},
                status=status.HTTP_200_OK
            )
        return Response(
            {'succes':False, 'results':'Invalid username or password'},
            status=status.HTTP_401_UNAUTHORIZED
        )


class AgencyViewSet(viewsets.ModelViewSet):
    queryset = AgencyModel.objects.all()
    serializer_class = AgencyModelSerializer
    permission_classes = [permissions.AllowAny]

    def user_exists(self, username=None, email=None):
        usuario, correo = False, False

        if username and AgencyModel.objects.filter(username=username).exists():
            usuario =  True
        if email and AgencyModel.objects.filter(email=email).exists():
            correo = True

        return usuario,correo


    def create(self, request, *args, **kwargs):
        valida_usuarios, valida_email = self.user_exists(
            request.data['username'], request.data['email'])

        if valida_email or valida_usuarios:
            return Response({'results':'Username or email already exists '}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=False)
        obj = self.perform_create(serializer)
        obj.set_password(request.data['password'])
        obj.active = True
        obj.save()
        headers = self.get_success_headers(serializer.data)
        serializer = self.serializer_class(obj)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()



class HotelModelViewSet(viewsets.ModelViewSet):
    queryset = HotelModel.objects.filter(active=True)
    serializer_class = HotelModelSerializer
    permission_classes=[DjangoModelPermissionsOrAnonReadOnly,]


class RoomModelViewSet(viewsets.ModelViewSet):
    queryset = RoomModel.objects.filter(active=True)
    serializer_class = RoomModelSerializer
    permission_classes=[DjangoModelPermissionsOrAnonReadOnly,]