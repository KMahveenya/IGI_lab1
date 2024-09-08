from Medicines.models import Departments, Categories

def load_medicines():
    deps = Departments.objects.all()
    resault = []
    for dep in deps:
        categories = Categories.objects.filter(department=dep)
        temp = {
            'department': dep,
            'categories': categories
        }
        resault.append(temp)
    return resault