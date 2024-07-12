from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name = "Index"),
    path('plant-location/', views.plant_location_view, name='plant_location_view'),
]