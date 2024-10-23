from django.contrib import auth
from django.http import HttpResponseRedirect, HttpResponseNotFound
from django.shortcuts import render
from django.urls import reverse

from users.forms import UserLoginForm, UserRegistrationForm, ReviewForm
from users.models import User, Questions, Review
from Medicines.models import Providers, Medicines
from datetime import datetime, timezone
import pytz, calendar

from functions.menu import load_medicines

def login(request):
    if request.method == 'POST':
        form = UserLoginForm(data=request.POST)
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            user = auth.authenticate(username=username, password=password)
            if user:
                auth.login(request, user)
                return HttpResponseRedirect(reverse('main:index'))
    else:
        form = UserLoginForm()

    context = {
        'departments': load_medicines(),
        'form': form
    }

    return render(request, 'users/login.html', context)

def registration(request):
    if request.method == 'POST':
        form = UserRegistrationForm(data=request.POST, files=request.FILES)
        if form.is_valid() and request.POST.get('age_check', False):
            form.save()
            user = form.instance
            auth.login(request, user)
            return HttpResponseRedirect(reverse('main:index'))
    else:
        form = UserRegistrationForm()

    context = {
        'departments': load_medicines(),
        'form': form
        }
    return render(request, 'users/registration.html', context)

def logout(request):
    auth.logout(request)
    return HttpResponseRedirect(reverse('main:index'))

def staff(request):
    users = list(User.objects.filter(is_staff=True).values('first_name', 'last_name', 'position', 'surname', 'date_joined', 'email', 'phone', 'image'))

    context = {
        'departments': load_medicines(),
        'staff': users
    }
    return render(request, 'users/staff.html', context)

def questions(request):
    questions = Questions.objects.all()

    context = {
        'departments': load_medicines(),
        'questions': questions[::-1]
    }
    return render(request, 'users/question-answer.html', context)

def question(request, question_id):
    
    question = Questions.objects.get(id=question_id)

    context = {
        'departments': load_medicines(),
        'question': question
    }
    return render(request, 'users/question.html', context)

def profile(request):
    minsk_zone = pytz.timezone('Europe/Minsk')
    date = datetime.now(minsk_zone)
    utcdate = date.astimezone(pytz.utc)

    if request.method == 'POST':
        form = ReviewForm(data=request.POST)
        grade = request.POST['grade']
        text = request.POST['review']
        if grade and text:
            review = Review()
            review.review = text
            review.grade = grade
            review.date = datetime.now(minsk_zone)
            review.user = request.user
            review.save()
            return HttpResponseRedirect(reverse('users:reviews'))
    else:
        form = ReviewForm()
    
    c = calendar.HTMLCalendar()
    s = c.formatmonth(date.year, date.month)

    context = {
        'departments': load_medicines(),
        'form': form,
        'cur_time': str(date.hour) + ':' + str(date.minute) + '+' + str(date.utcoffset()),
        'utc_time': str(utcdate.hour) + ':' + str(utcdate.minute) + '+' + str(utcdate.utcoffset()),
        'tzinfo': date.tzinfo,
        'calendar': s
    }
    return render(request, 'users/profile.html', context)

def reviews(request):
    reviews = Review.objects.all()

    context = {
        'departments': load_medicines(),
        'reviews': reviews[::-1]
    }
    return render(request, 'users/review.html', context)

def providers(request):
    curr_user = request.user
    providers = Providers.objects.filter(user = curr_user)
    meds = Medicines.objects.all()
    context = {
        'departments': load_medicines(),
        'providers': providers,
        'meds': meds
    }
    return render(request, 'users/providers.html', context)

def create(request):
    if request.method == "POST":
        prov = Providers()
        prov.name = request.POST.get("name")
        prov.price = request.POST.get("price")
        prov.medicine = Medicines.objects.get(id=request.POST.get("medicine"))
        prov.user = request.user
        prov.save()
    return HttpResponseRedirect("/users/providers/")

def edit(request, provider_id):
    try:
        prov = Providers.objects.get(id=provider_id)
 
        if request.method == "POST":
            prov.name = request.POST.get("name")
            prov.medicine = Medicines.objects.get(id=request.POST.get("medicine"))
            prov.price = request.POST.get("price")
            prov.save()
            return HttpResponseRedirect("/users/providers/")
        else:
            return render(request, "users/edit.html", {"provider": prov, 'meds': Medicines.objects.all()})
    except Providers.DoesNotExist:
        return HttpResponseNotFound("<h2>Person not found</h2>")

def delete(request, provider_id):
    try:
        prov = Providers.objects.get(id=provider_id)
        prov.delete()
        return HttpResponseRedirect("/users/providers/")
    except Providers.DoesNotExist:
        return HttpResponseNotFound("<h2>Person not found</h2>")