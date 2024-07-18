from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name = "Index"),
    path('plant-location/', views.plant_location, name='plant_location'),
    path('plant-detail/<int:plant_id>/', views.plant_detail, name='plant_detail'), # La vista que trae los datos de la planta 
]