from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ServiceSerializer, AppointmentSerializer, UpdateAppointmentStatusSerializer
from .models import Service, Appointment
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import UpdateAPIView


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]


class AppointmentAPIView(APIView):
    # DjangoModelPermissions necesita el queryset inclusive si no es un viewset
    queryset = Appointment.objects.all()
    permission_classes = [IsAuthenticated]

    def get(self, request):
        #  Si es Admin, ve todas las citas
        if request.user.groups.filter(name="Administradores").exists():
            appointments = Appointment.objects.all()
        # si es doctor, ve solo sus citas
        elif request.user.groups.filter(name='Doctores').exists():
            appointments = Appointment.objects.filter(doctor=request.user)
        # Y si es paciente solo ve sus citas
        else:
            appointments = Appointment.objects.filter(patient=request.user)

        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

    def post(self, request):
        if request.user.groups.filter(name__in=['Doctores', 'Administradores']).exists():
            return Response(
                {'error': "Only patients can book appointments"},
                status=status.HTTP_403_FORBIDDEN
            )

        # Automaticamente asignamos al usuario ctual como paciente si no es doctor o admin
        request.data['patient'] = request.user.id

        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, appointment_id):
        if not request.user.groups.filter(name="Administradores").exists():
            return Response(
                {'error': "Only admin can update status of appointments"},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            appointment = Appointment.objects.get(id=appointment_id)
        except Appointment.DoesNotExist:
            return Response(
                {'error': "Appointment not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = AppointmentSerializer(
            appointment,
            data={'status': request.data.get('status')},
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IsAdminGroup(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return request.user.groups.filter(name="Administradores")


class UpdateAppointmentStatusAPIView(UpdateAPIView):
    serializer_class = UpdateAppointmentStatusSerializer
    queryset = Appointment.objects.all()
    permission_classes = [IsAdminGroup]

    def perform_update(self, serializer):
        serializer.save(status=self.request.data.get('status'))
