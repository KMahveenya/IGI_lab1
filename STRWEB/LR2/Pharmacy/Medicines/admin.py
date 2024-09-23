from django.contrib import admin
from .models import Departments, Categories, Medicines, Sales, Providers

@admin.register(Departments)
class DepartmentsAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']
    list_filter = ['name']

@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
    list_display = ['name', 'department']
    search_fields = ['name']
    list_filter = ['name', 'department']

@admin.register(Medicines)
class MedicinesAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'quantity', 'price', 'discount']
    list_editable = ['price', 'quantity', 'discount']
    search_fields = ['name', 'description']
    list_filter = ['discount', 'quantity', 'discount']

@admin.register(Providers)
class ProvidersAdmin(admin.ModelAdmin):
    list_display = ['name', 'medicine', 'price']
    list_editable = ['price']
    search_fields = ['name', 'medicine']
    list_filter = ['name', 'price']

@admin.register(Sales)
class SalesAdmin(admin.ModelAdmin):
    list_display = ['medicine', 'quantity']
    list_editable = ['quantity']
    list_filter = ['quantity']