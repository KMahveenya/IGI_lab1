
from Medicines.models import Medicines
from django.db.models import Q

def q_search(query):
    meds = []

    if query.isdigit() and len(query) <= 5:
        for med in Medicines.objects.filter(id=int(query)):
            temp = {
                    'dep_id': med.category.department.id,
                    'cat_id': med.category.id,
                    'med': med
                }
            meds.append(temp)
        return meds
    
    keywords = [word for word in query.split() if len(word) > 2]

    q_objects = Q()

    for token in keywords:
        q_objects |= Q(description__icontains=token)
        q_objects |= Q(name__icontains=token)

    for med in Medicines.objects.filter(q_objects):
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
            'dep_id': med.category.department.id,
            'cat_id': med.category.id,
            'med': jsonmed
        }
        meds.append(temp)
    return meds