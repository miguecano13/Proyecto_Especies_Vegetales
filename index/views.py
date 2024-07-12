from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from .models import Plants

# Create your views here.
def index(request):
    return render(request, 'index/mapa.html')

# Vista para obtener la ubicación de una planta por su nombre
def plant_location_view(request):
    plant_name = request.GET.get('plant_name', None)
    if plant_name:
        try:
            plant = Plants.objects.get(plant_name=plant_name)
            return JsonResponse({'plant_location': plant.plant_location})
        except Plants.DoesNotExist:
            return JsonResponse({'error': 'Plant not found'}, status=404)
    return JsonResponse({'error': 'No plant name provided'}, status=400)