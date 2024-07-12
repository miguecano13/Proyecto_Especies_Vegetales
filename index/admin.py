from django.contrib import admin
from .models import Plants, Images, PlantsHasRecipes, Recipes, Users

# Clases de administración para personalizar la vista del administrador

class PlantsAdmin(admin.ModelAdmin):
    list_display = ('plant_id', 'plant_name', 'plant_description', 'plant_location', 'plant_estado', 'plant_image')
    fields = ('plant_name', 'plant_description', 'plant_location', 'plant_estado', 'plant_image')

class ImagesAdmin(admin.ModelAdmin):
    list_display = ('images_id', 'images_ruta', 'plants_plant_id')
    fields = ('images_ruta', 'plants_plant_id')

class PlantsHasRecipesAdmin(admin.ModelAdmin):
    list_display = ('plants_plant_id', 'recipes_recipes_id')
    fields = ('plants_plant_id', 'recipes_recipes_id')

class RecipesAdmin(admin.ModelAdmin):
    list_display = ('recipes_id', 'recipes_name', 'recipes_description', 'recipes_image')
    fields = ('recipes_name', 'recipes_description', 'recipes_image')

class UsersAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'user_name', 'user_rol', 'user_password')
    fields = ('user_name', 'user_rol', 'user_password')

# Registro de los modelos con sus clases de administración personalizadas
admin.site.register(Plants, PlantsAdmin)
admin.site.register(Images, ImagesAdmin)
admin.site.register(PlantsHasRecipes, PlantsHasRecipesAdmin)
admin.site.register(Recipes, RecipesAdmin)
admin.site.register(Users, UsersAdmin)