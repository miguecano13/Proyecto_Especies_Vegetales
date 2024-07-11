from django.urls import path
from . import views

urlpatterns = [
    # path('', views.hello),
    path('', views.index, name = "Index"),
    path('about/', views.about)

]