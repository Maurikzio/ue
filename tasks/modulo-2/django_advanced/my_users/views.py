from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from django.contrib.auth.models import Group
from .serializers import CustomUserSerializer, DoctorSerializer
from rest_framework.generics import ListAPIView, CreateAPIView
from .models import CustomUser


# class RegisterPatientAPIView(APIView):
#     # Los usuarios sin grupo seran tratados como pacientes
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = CustomUserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterPatientAPIView(CreateAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]


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


class RegisterAdminAPIView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            admin_group = Group.objects.get(name="Administradores")
            user.groups.add(admin_group)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class ListDoctorsAPIView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         doctors_group = Group.objects.get(name="Doctores")
#         doctors = doctors_group.user_set.all()
#         data = [
#             {
#                 "id": doctor.id,
#                 "full_name": f"{doctor.first_name} {doctor.last_name}",
#                 "email": doctor.email,
#                 "phone": doctor.phone
#             }
#             for doctor in doctors
#         ]
#         return Response(data)

class ListDoctorsAPIView(ListAPIView):
    serializer_class = DoctorSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return CustomUser.objects.filter(groups__name='Doctores')
