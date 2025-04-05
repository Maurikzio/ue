from django.urls import path
from . import views

urlpatterns = [
    path('stock/<str:symbol_name>/', views.symbol_price, name="symbol-detail")
]
