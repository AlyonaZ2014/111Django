from mainapp import views
from django.urls import path
from mainapp.apps import MainappConfig
from django.views.decorators.cache import cache_page

app_name = MainappConfig.name

urlpatterns = [
    path('projectlist/', views.ProjectListAPIView.as_view(), name="contacts"),
]