# from 111Django.library.app import models
# from django.contrib import admin

# admin.site.register(models.Author)

# admin.site.register(models.Project)
# admin.site.register(models.ToDo)

from django.contrib import admin
from app import models

admin.site.register(models.Author)
admin.site.register(models.Project)
admin.site.register(models.ToDo)

# @admin.register(models.Author)
# class AuthorAdmin(admin.ModelAdmin):
#     pass