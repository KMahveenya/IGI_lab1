from django.urls import path, re_path
from main import views

app_name = 'main'

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('policy/', views.confidentialPolicy, name='policy'),
    path('statistic/', views.statistic, name='statistic'),
    path('news/', views.news, name='news'),
    re_path(r'news/(?P<new_id>\d+)/', views.new, name='new'),
    path('vacancies/', views.vacancies, name='vacancies'),
    path('promotions/', views.promotions, name='promotions'),
    path('promotions/archive/', views.promotions, name='promotions_archive'),
    path('promotions/current/', views.promotions, name='promotions_current'),
]
