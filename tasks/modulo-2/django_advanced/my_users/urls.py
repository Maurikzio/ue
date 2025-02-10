from django.urls import path
from .views import RegisterPatientAPIView, RegisterDoctorAPIView, RegisterAdminAPIView, ListDoctorsAPIView

urlpatterns = [
    path('register/patient/', RegisterPatientAPIView.as_view(), name="reg-patient"),
    path('register/doctor/', RegisterDoctorAPIView.as_view(), name="reg-doctor"),
    path('register/admin/', RegisterAdminAPIView.as_view(), name="reg-admin"),
    path('doctors/', ListDoctorsAPIView.as_view(), name='doctors-list')
]
