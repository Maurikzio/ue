from django.urls import path
from .import views

urlpatterns = [
    # para nuestra base de datos
    path('pokemon/', views.pokemon_list, name='pokemon-list'),
    path('pokemon/<int:pk>/', views.pokemon_detail, name='pokemon-detail'),

    # endpoints para la api externa
    path('external/pokemon/', views.external_pokemon_list,
         name='external-pokemon-list'),
    path('external/pokemon/<str:pokemon_id>/',
         views.external_pokemos_detail, name="external-pokemon-detail"),

    # endpoint para importar desde la API externa a nuestra base de datos
    path('import/pokemon/<str:pokemon_id>/',
         views.import_pokemon, name='import-pokemon')
]
