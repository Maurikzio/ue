from django.urls import path
from .views import RegisterPatientAPIView, RegisterDoctorAPIView

urlpatterns = [
    path('register/patient/', RegisterPatientAPIView.as_view(), name="reg-patient"),
    path('register/doctor/', RegisterDoctorAPIView.as_view(), name="reg-doctor"),
]
