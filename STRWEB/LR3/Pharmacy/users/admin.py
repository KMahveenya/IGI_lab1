from django.contrib import admin
from .models import User, Questions, Review

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'phone']
    list_editable = ['email', 'phone']
    search_fields = ['username', 'first_name', 'last_name', 'surname']
    list_filter = ['username', 'date_joined']

@admin.register(Questions)
class QuestionsAdmin(admin.ModelAdmin):
    list_display = ['question', 'date']
    search_fields = ['question']
    list_filter = ['question', 'date']

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['review', 'grade', 'date', 'user']
    search_fields = ['review']
    list_filter = ['grade', 'date']