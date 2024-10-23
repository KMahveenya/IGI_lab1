from django.shortcuts import render
from .models import Medicines, Categories, Departments, Sales

from functions.menu import load_medicines
from .utils import q_search

def medicines(request, dep_id, cat_id):
    dep_id = int(dep_id)
    cat_id = int(cat_id)
    discount = request.GET.get('on_sale', None)
    order_by = request.GET.get('order_by', 'default')
    query = request.GET.get('q', None)

    cat = Categories.objects.filter(id=cat_id)[0]
    #list(Medicines.objects.filter(category=cat).values('name', 'category', 'discount', 'price', 'quantity', 'description', 'instruction', 'pick_up_points', 'image'))
    meds = []
    for med in Medicines.objects.filter(category=cat):
        jsonmed = {
            'name': med.name,
            'discount': med.discount,
            'price': med.price,
            'quantity': med.quantity,
            'description': med.description,
            'instruction': med.instruction,
            'pick_up_points': med.pick_up_points,
            'image': med.image.url,
            'id': med.id
        }
        temp = {
            'dep_id': dep_id,
            'cat_id': cat_id,
            'med': jsonmed
        }
        
        meds.append(temp)

    if discount:
        meds = [elem for elem in meds if elem['med'].discount != 0]

    if order_by == 'price':
        meds.sort(key=lambda elem: elem['med'].price)
    elif order_by == '-price':
        meds.sort(key=lambda elem: elem['med'].price, reverse=True)

    context = {
        'departments' : load_medicines(),
        'meds': meds,
        }
    return render(request, "Medicines/medicines.html", context)

def department(request, dep_id):
    dep_id = int(dep_id)
    discount = request.GET.get('on_sale', None)
    order_by = request.GET.get('order_by', 'default')
    query = request.GET.get('q', None)

    meds = []

    dep = Departments.objects.filter(id=dep_id)[0]
    for cat in Categories.objects.filter(department=dep):
        for med in Medicines.objects.filter(category=cat):
            jsonmed = {
                        'name': med.name,
                        'discount': med.discount,
                        'price': med.price,
                        'quantity': med.quantity,
                        'description': med.description,
                        'instruction': med.instruction,
                        'pick_up_points': med.pick_up_points,
                        'image': med.image.url,
                        'id': med.id
                    }
            temp = {
                'dep_id': dep_id,
                'cat_id': cat.id,
                'med': jsonmed
            }
            meds.append(temp)

    if discount:
        meds = [elem for elem in meds if elem['med'].discount != 0]

    if order_by == 'price':
        meds.sort(key=lambda elem: elem['med'].price)
    elif order_by == '-price':
        meds.sort(key=lambda elem: elem['med'].price, reverse=True)

    context = {
        'departments' : load_medicines(),
        'meds': meds,
        }
    return render(request, "Medicines/medicines.html", context)

def departments(request):
    discount = request.GET.get('on_sale', None)
    order_by = request.GET.get('order_by', 'default')
    query = request.GET.get('q', None)

    meds = []
    if query:
        meds = q_search(query)
    else:
        for dep in Departments.objects.all():
            for cat in Categories.objects.filter(department=dep):
                for med in Medicines.objects.filter(category=cat):
                    jsonmed = {
                        'name': med.name,
                        'discount': med.discount,
                        'price': med.price,
                        'quantity': med.quantity,
                        'description': med.description,
                        'instruction': med.instruction,
                        'pick_up_points': med.pick_up_points,
                        'image': med.image.url,
                        'id': med.id
                    }
                    temp = {
                        'dep_id': dep.id,
                        'cat_id': cat.id,
                        'med': jsonmed
                    }
                    meds.append(temp)

    if discount:
        meds = [elem for elem in meds if elem['med'].discount != 0]

    if order_by == 'price':
        meds.sort(key=lambda elem: elem['med'].price)
    elif order_by == '-price':
        meds.sort(key=lambda elem: elem['med'].price, reverse=True)

    context = {
        'departments' : load_medicines(),
        'meds': meds,
        }
    return render(request, "Medicines/medicines.html", context)

def medicine(request, dep_id, cat_id, med_id):
    dep_id = int(dep_id)
    cat_id = int(cat_id)
    med_id = int(med_id)
    med = Medicines.objects.filter(id=med_id)[0]

    context = {
        'departments' : load_medicines(),
        'med': med,
        'med_id': med_id
        }
    return render(request, "Medicines/medicine.html", context)

def sales(request):
    sales = Sales.objects.all()

    info = []

    for sale in sales:
        temp = {
            'name': sale.medicine.name,
            'quantity': sale.quantity,
            'income': sale.quantity * sale.medicine.sell_price(),
        }
        info.append(temp)

    context = {
        'departments': load_medicines(),
        'sales': info
        }
    return render(request, 'main/sale.html', context)