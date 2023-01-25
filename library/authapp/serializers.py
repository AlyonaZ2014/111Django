# from rest_framework.serializers import HyperlinkedModelSerializer

# from authapp.models import CustomUser


# class CustomUserModelSerializer(HyperlinkedModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = [
#             "id",
#             "username",
#             "password",
#             "first_name",
#             "last_name",
#             "email",
#         ]
from rest_framework import serializers
from .models import Author, Book
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'
class BookSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()
    class Meta:
        model = Book
        fields = '__all__'