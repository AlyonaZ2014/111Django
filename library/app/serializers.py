from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Author, Project, ToDo


class AuthorModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'
# from rest_framework.serializers import HyperlinkedModelSerializer
# from .models import Author
# from .models import Author, Project, ToDo

# class AuthorModelSerializer(HyperlinkedModelSerializer):
#     class Meta:
#         model = Author
#         fields = ('first_name', 'last_name' 'birthday_year')


# class ProjectModelSerializer(HyperlinkedModelSerializer):
#     class Meta:
#         model = Project
#         fields = '__all__'


# class ToDoModelSerializer(HyperlinkedModelSerializer):
#     class Meta:
#         model = ToDo
#         fields = '__all__'
        