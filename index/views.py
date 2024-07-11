from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def hello(request):
    return HttpResponse("<h1>Hola Mundo</h1>")

def about(request):
    return HttpResponse("<h2>Acerca de mi empresa</h2>")

def index(request):
    return render(request, 'index/mapa.html')