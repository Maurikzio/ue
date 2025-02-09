from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser
from django.contrib.auth.models import Group
from .serializers import CustomUserSerializer


class RegisterPatientAPIView(APIView):
    # Los usuarios sin grupo seran tratados como pacientes
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterDoctorAPIView(APIView):
    # solo administradores pueden registrar doctore, es mi idea de negocio
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            doctors_group = Group.objects.get(name="Doctores")
            user.groups.add(doctors_group)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
