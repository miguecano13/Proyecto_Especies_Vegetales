from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from .models import Plants

# Create your views here.
def index(request):
    return render(request, 'index/mapa.html')

# Vista para obtener la ubicación de una planta por su nombre
def plant_location(request):
    plant_name = request.GET.get('plant_name')
    try:
        plant = Plants.objects.get(plant_name=plant_name)
        data = {
            'plant_location': plant.plant_location,
            'plant_id': plant.plant_id
        }
    except Plants.DoesNotExist:
        data = {'plant_location': None}
    return JsonResponse(data)

def plant_detail(request, plant_id):
    plant = Plants.objects.get(pk=plant_id)
    data = {
        'name': plant.plant_name,
        'description': plant.plant_description,
        'location': plant.plant_location,
        'estado': plant.plant_estado,
        'image': plant.plant_image,
    }
    return JsonResponse(data)