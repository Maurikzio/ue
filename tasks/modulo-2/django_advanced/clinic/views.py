from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ServiceSerializer
from .models import Service
from rest_framework.permissions import AllowAny


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
