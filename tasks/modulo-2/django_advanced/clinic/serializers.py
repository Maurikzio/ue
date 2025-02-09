from rest_framework import serializers
from .models import Service, Appointment


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
            'id',
            'patient',
            'doctor',
            'service',
            'date_time',
            'status',
            'notes'
        ]
