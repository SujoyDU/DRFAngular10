from django.conf.urls import url
from app1 import views

urlpatterns = [
    url(r'^api/contents$', views.content_list),
    url(r'^api/contents/(?P<pk>[0-9]+)$', views.content_detail),
    url(r'^api/contents/published$', views.content_list_published)
]