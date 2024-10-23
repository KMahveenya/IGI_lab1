import requests
from django.shortcuts import render
from .models import New, Vacancy, Promotion, Partner, CompanyInfo
from users.models import User
from Medicines.models import Sales, Medicines

from functions.menu import load_medicines
from datetime import datetime
import statistics, matplotlib.pyplot as plt
import seaborn as sns, pandas as pd

import logging

def index(request):
    logging.basicConfig(level=logging.INFO, filename="py_log.log", filemode="w")
    appid = '53463e2c2ed3172e0488ab9e52e72b44'
    url = 'https://api.openweathermap.org/data/2.5/weather?q={}&units=metric&appid=' + appid
    cities = ['Brest', 'Vitebsk', 'Gomel', 'Grodno', 'Minsk', 'Mogilev']
    res = []
    # for city in cities:
    #     temp = requests.get(url.format(city)).json()
    #     temp1 = {
    #         'city': city,
    #         'temp': temp["main"]["temp"],
    #         'icon': temp["weather"][0]["icon"],
    #         'values': [1, 2]
    #     }
    #     res.append(temp1)
    new = New.objects.last()
    logging.info('len of new must be 1')
    print(res)
    partners = Partner.objects.all()
    context = {
        'departments': load_medicines(),
        'new': new,
        'weather': res,
        'partners': partners
        }
    return render(request, 'main/index.html', context)

def about(request):

    info = CompanyInfo.objects.first()

    context = {
        'departments': load_medicines(),
        'info': info,
        'history': info.history.split('\n')
        }
    
    return render(request, 'main/about.html', context)

def confidentialPolicy(request):
    url = 'https://official-joke-api.appspot.com/random_joke'
    joke = requests.get(url).json()

    context = {
        'departments': load_medicines(),
        'info': 'Здесь должна быть политика конфиденциальности, а пока что анекдот:',
        'setup': joke['setup'],
        'punchline': joke['punchline']
        }
    return render(request, 'main/confidentialPolicy.html', context)

def news(request):
    news = New.objects.all()
    context = {
        'departments': load_medicines(),
        'news' : news
        }
    return render(request, 'main/news.html', context)

def new(request, new_id):
    new_id = int(new_id)
    new = New.objects.filter(id=new_id)[0]
    context = {
        'departments': load_medicines(),
        'new' : new
        }
    return render(request, 'main/new.html', context)

def vacancies(request):
    vacancies = Vacancy.objects.all()
    context = {
        'departments': load_medicines(),
        'vacancies': vacancies
        }
    return render(request, 'main/vacancy.html', context)

def promotions(request):
    date_now = datetime.now()
    promotions = []
    if '/promotions/archive/' == request.path:
        promotions = Promotion.objects.filter(date__lte=date_now)
    elif '/promotions/current/' == request.path:
        promotions = Promotion.objects.filter(date__gte=date_now)
    else:
        promotions = Promotion.objects.all()

    promotions = [*promotions]
    promotions.sort(key=lambda elem: elem.date, reverse=True)
    
    context = {
        'departments': load_medicines(),
        'promotions': promotions
        }
    return render(request, 'main/promotion.html', context)

def statistic(request):
    users_count = len(User.objects.all())
    
    sales = Sales.objects.all()
    sales_incomes = [elem.medicine.price * elem.quantity for elem in sales]

    general_income = sum(sales_incomes)
    popular_med = max([elem for elem in sales], key=lambda elem: elem.quantity).medicine.name
    most_income_med = max([elem for elem in sales], key=lambda elem: elem.medicine.price * elem.quantity).medicine.name

    vals = [elem.quantity for elem in sales]
    labels = [elem.medicine.name for elem in sales]
    fig, ax = plt.subplots()
    ax.pie(vals, labels=labels, autopct='%1.1f%%')
    ax.axis("equal")
    fig.tight_layout()
    plt.savefig('main/static/images/graph.png')

    medicines = Medicines.objects.all()
    vals = [elem.price for elem in medicines]
    labels = [elem.name for elem in medicines]

    fig, ax = plt.subplots(figsize=(11,11))
    plt.barh(labels, vals)
    ax.spines[['right', 'top']].set_visible(False) 
    fig.tight_layout()
    plt.savefig('main/static/images/graph2.png')



    # x = [i / 100 for i in range(-100, 100, 1)]
    # math_y = [math.log(1 - elem) for elem in x]

    # fig, ax = plt.subplots()
    # ax.plot(x, math_y, 'red', linewidth=2, label='Taylor')
    # ax.legend(loc='lower left')
    # ax.set_xlabel('Ox')
    # ax.set_ylabel('Oy')
    # ax.text(-1.05, -2.3, 'Демонстрация графиков, полученных\nпо Тейлору и с помощью модуля Math')
    # ax.annotate('Точка, с которой начинается разложение по Тейлору', xy=(0, 0), xytext=(-0.75, 0.75), arrowprops=dict(facecolor='black', shrink=0.01))
    # plt.savefig('main/static/images/graph.png')
    #plt.show()

    context = {
        'departments': load_medicines(),
        'users_count': users_count,
        'income': general_income,
        'popular_med': popular_med,
        'most_income_med': most_income_med,
        'sales_average': statistics.mean(sales_incomes),
        'sales_mode': statistics.mode(sales_incomes),
        'sales_median': statistics.median(sales_incomes),
        'sales_variance': statistics.variance(sales_incomes),
        'sales_stdev': statistics.stdev(sales_incomes),
        }
    return render(request, 'main/statistic.html', context)