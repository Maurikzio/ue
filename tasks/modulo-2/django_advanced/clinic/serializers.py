from rest_framework import serializers
from .models import Service, Appointment
from django.contrib.auth.models import Group


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

    def validate_doctor(self, value):
        doctors_group = Group.objects.get(name="Doctores")
        if not value.groups.filter(id=doctors_group.id).exists():
            raise serializers.ValidationError(
                "Invalid doctor"
            )
        return value


class UpdateAppointmentStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['status']
