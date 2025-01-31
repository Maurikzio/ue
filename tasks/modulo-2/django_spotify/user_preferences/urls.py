from django.urls import path
from .views import PreferencesList

urlpatterns = [
    path('<int:user_id>/preferences/',
         PreferencesList.as_view(), name='user_preference')
]
