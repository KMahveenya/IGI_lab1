from django.urls import path, re_path
from cart import views

app_name = 'cart'

urlpatterns = [
    re_path(r'add/(?P<med_id>\d+)/', views.cart_add, name='cart_add'),
    re_path(r'delete/(?P<med_id>\d+)/', views.cart_delete, name='cart_delete'),
    re_path(r'edit/(?P<med_id>\d+)/(?P<type>\d+)/', views.cart_edit, name='cart_edit'),
    re_path(r'payment/', views.payment, name='cart_payment'),
    re_path(r'', views.cart, name='cart'),
    
]