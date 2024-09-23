from django.contrib import admin
from .models import CartItem

@admin.register(CartItem)
class UserAdmin(admin.ModelAdmin):
    list_display_links = None
    list_display = ['user', 'med', 'quantity']
    list_editable = ['user', 'med', 'quantity']
    search_fields = ['user', 'med', 'quantity']
    list_filter = ['user', 'med', 'quantity']