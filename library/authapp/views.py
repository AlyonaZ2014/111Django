from rest_framework import viewsets, permissions
from .models import Author, Book
from .serializers import AuthorSerializer, BookSerializer

class AuthorViewSet(viewsets.ModelViewSet):
    serializer_class = AuthorSerializer
    queryset = Author.objects.all()

class BookViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BookSerializer
    queryset = Book.objects.all()

# from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
# from rest_framework.pagination import LimitOffsetPagination
# from rest_framework.viewsets import GenericViewSet

# from authapp.models import CustomUser
# from authapp.serializers import CustomUserModelSerializer


# class CustomUserLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 2


# class CustomUserModelViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
#     queryset = CustomUser.objects.all()
#     serializer_class = CustomUserModelSerializer
#     pagination_class = CustomUserLimitOffsetPagination
