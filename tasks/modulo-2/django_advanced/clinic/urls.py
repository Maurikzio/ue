from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ServiceViewSet, AppointmentAPIView

router = DefaultRouter()
router.register(r'services', ServiceViewSet)

urlpatterns = [
    path('appointments/', AppointmentAPIView.as_view(), name="appointments"),
]
urlpatterns += router.urls
