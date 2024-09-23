from django.shortcuts import render, redirect
from .models import Medicines, CartItem

def cart_add(request, med_id):

    curmed = Medicines.objects.get(id=med_id)

    if request.user.is_authenticated:
        carts = CartItem.objects.filter(user=request.user, med=curmed)

        if carts.exists():
            cart = carts.first()
            if cart:
                cart.quantity += 1
                cart.save()
        else:
            CartItem.objects.create(user=request.user, med=curmed, quantity=1)

    return redirect(request.META['HTTP_REFERER'])

def cart_delete(request, med_id):

    cart = CartItem.objects.get(id=med_id)
    cart.delete()

    return redirect(request.META['HTTP_REFERER'])

def cart_edit(request, med_id, type):

    
    cart = CartItem.objects.get(id=med_id)
    if type == '1':
        cart.quantity += 1
    elif type == '2' and cart.quantity != 1:
        cart.quantity -= 1
    cart.save()

    return redirect(request.META['HTTP_REFERER'])

def payment(request):

    meds = CartItem.objects.filter(user=request.user)
    print("123123123")
    price = 0
    for med in meds:
        price += med.quantity * med.med.sell_price()

    context = {
        'total': price
        }
    
    return render(request, 'cart/payment.html', context)

def cart(request):

    meds = CartItem.objects.filter(user=request.user)

    price = 0
    for med in meds:
        price += med.quantity * med.med.sell_price()

    context = {
        'meds' : meds,
        'total': price
        }
    print('999999')
    return render(request, 'cart/cart.html', context)

