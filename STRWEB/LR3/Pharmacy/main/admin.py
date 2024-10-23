from django.contrib import admin
from .models import New, Vacancy, Promotion, Partner, CompanyInfo

@admin.register(New)
class NewAdmin(admin.ModelAdmin):
    list_display = ['title',]
    search_fields = ['title', 'some_info']
    list_filter = ['title',]

@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = ['position', 'salary', 'city']
    list_editable = ['salary', 'city']
    search_fields = ['position', 'city']
    list_filter = ['salary', 'city', 'position']

@admin.register(Promotion)
class PromotionAdmin(admin.ModelAdmin):
    list_display = ['title', 'discount', 'date']
    list_editable = ['discount']
    search_fields = ['title']
    list_filter = ['title', 'discount', 'date']

@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display_links = None
    list_display = ['name', 'ref', 'image']
    list_editable = ['name', 'ref']
    search_fields = ['name']
    list_filter = ['name', 'ref']

@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    list_display_links = None
    list_display = ['info', 'logo', 'video', 'history', 'props']
    list_editable = ['info', 'logo', 'video', 'history', 'props']
    search_fields = ['info', 'logo', 'video', 'history', 'props']
    list_filter = ['info', 'logo', 'video', 'history', 'props']