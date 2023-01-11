from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Author
from .serializers import AuthorModelSerializer
from .models import Author, Project, ToDo
from .serializers import AuthorModelSerializer, ProjectModelSerializer, ToDoModelSerializer
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer

class AuthorModelViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer

class ProjectModelViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class ToDoModelViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer


