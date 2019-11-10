# coding: utf-8
from backhotel.serializers import *
from backhotel.models import *
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework import (filters , generics,
	permissions, viewsets, parsers, renderers, status)
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
        	user_serializer = AgencyModelSerializer(user.agencymodel)
        	return Response(
        		{'data':user_serializer},
        		status=status.HTTP_200_OK
        	)
        return Response(
        	{'succes':False, 'result':'Invalid username or password'},
        	status=status.HTTP_401_UNAUTHORIZED
        )


class AgencyViewSet(viewsets.ModelViewSet):
    queryset = AgencyModel.objects.all()


class HotelModelViewSet(viewsets.ModelViewSet):
	queryset = HotelModel.objects.filter(active=True)
	serializer_class = HotelModelSerializer
	permission_classes=[DjangoModelPermissionsOrAnonReadOnly,]


class RoomModelViewSet(viewsets.ModelViewSet):
	queryset = RoomModel.objects.filter(active=True)
	serializer_class = RoomModelSerializer
	permission_classes=[DjangoModelPermissionsOrAnonReadOnly,]