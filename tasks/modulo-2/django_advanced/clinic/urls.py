from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ServiceViewSet, AppointmentAPIView, UpdateAppointmentStatusAPIView, ListAppointmentsAPIView

router = DefaultRouter()
router.register(r'services', ServiceViewSet)

urlpatterns = [
    path('appointments/', AppointmentAPIView.as_view(), name="appointments"),
    path('appointments/<int:appointment_id>/',
         AppointmentAPIView.as_view(), name="appointment-update"),
    path('appointments/<int:pk>/status/',
         UpdateAppointmentStatusAPIView.as_view(), name="update-status-appointment"),
    path('appointments/for-admin/', ListAppointmentsAPIView.as_view(),
         name="list-appointments-for-user")
]
urlpatterns += router.urls
