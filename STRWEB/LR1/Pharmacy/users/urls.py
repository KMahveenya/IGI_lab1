from django.urls import path, re_path
from users import views

app_name = 'users'

urlpatterns = [
    path('login/', views.login, name='login'),
    path('registration/', views.registration, name='registration'),
    path('logout/', views.logout, name='logout'),
    path('staff/', views.staff, name='staff'),
    path('questions/', views.questions, name='questions'),
    path('profile/', views.profile, name='profile'),
    path('reviews/', views.reviews, name='reviews'),
    path('providers/', views.providers, name='providers'),
    path('providers/create/', views.create, name='create'),
    re_path(r'providers/edit/(?P<provider_id>\d+)/', views.edit, name='edit'),
    re_path(r'providers/delete/(?P<provider_id>\d+)/', views.delete, name='dalete'),
]
