from django.urls import path, re_path
from Medicines import views

app_name = 'medicines'

urlpatterns = [
    path('search/', views.departments, name='search'),
    path('sales/', views.sales, name='sales'),
    path('', views.departments, name='deps'),
    re_path(r'(?P<dep_id>\d+)/(?P<cat_id>\d+)/(?P<med_id>\d+)/', views.medicine, name='med'),
    re_path(r'(?P<dep_id>\d+)/(?P<cat_id>\d+)/', views.medicines, name='meds'),
    re_path(r'(?P<dep_id>\d+)', views.department, name='dep'),
]