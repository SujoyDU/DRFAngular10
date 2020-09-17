from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.response import Response

from app1.models import Content
from app1.serializers import ContentSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def content_list(request):
    if request.method == 'GET':
        contents = Content.objects.all()

        title = request.GET.get('title', None)
        if title is not None:
            contents = contents.filter(title__icontains=title)

        contents_serializer = ContentSerializer(contents, many=True)
        # return JsonResponse(contents_serializer.data, safe=False)
        return Response(contents_serializer.data)
        # 'safe=False' for objects serialization
    elif request.method == 'POST':
        content_data = JSONParser().parse(request)
        content_serializer = ContentSerializer(data=content_data)
        if content_serializer.is_valid():
            content_serializer.save()
            # return JsonResponse(content_serializer.data, status=status.HTTP_201_CREATED)
            return Response(content_serializer.data)
        # return JsonResponse(content_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(content_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = Content.objects.all().delete()
        # return JsonResponse({'message': '{} Tutorials were deleted successfully!'.format(count[0])},status=status.HTTP_204_NO_CONTENT)
        return Response({'message': '{} Tutorials were deleted successfully!'.format(count[0])},status=status.HTTP_204_NO_CONTENT)
# GET list of tutorials, POST a new tutorial, DELETE all tutorials


@api_view(['GET', 'PUT', 'DELETE'])
def content_detail(request, pk):
    # find tutorial by pk (id)
    try:
        content = Content.objects.get(pk=pk)
        if request.method == 'GET':
            content_serializer = ContentSerializer(content)
            # return JsonResponse(content_serializer.data)
            return Response(content_serializer.data)
        elif request.method == 'PUT':
            content_data = JSONParser().parse(request)
            content_serializer = ContentSerializer(content, data=content_data)
            if content_serializer.is_valid():
                content_serializer.save()
                # return JsonResponse(content_serializer.data)
                return Response(content_serializer.data)
            # return JsonResponse(content_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(content_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE':
            content.delete()
            # return JsonResponse({'message': 'Tutorial was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
            return Response({'message': 'Tutorial was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    except Content.DoesNotExist:
        # return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND)
        # GET / PUT / DELETE tutorial


@api_view(['GET'])
def content_list_published(request):
# GET all published tutorials
    contents = Content.objects.filter(published=True)

    if request.method == 'GET':
        contents_serializer = ContentSerializer(contents, many=True)
        # return JsonResponse(contents_serializer.data, safe=False)
        return Response(contents_serializer.data)