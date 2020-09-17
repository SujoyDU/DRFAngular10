from rest_framework import serializers
from app1.models import Content


class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = ('id',
                  'title',
                  'description',
                  'published')
