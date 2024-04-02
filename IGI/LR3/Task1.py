# Calculate the value of a function with a given accuracy.
# Lab №3.
# Standard data types, collections, functions, modules.
# v 1.0.0.
# Mahveenya Konstantin Evgenyevich.
# 26.03.2024.

import repeat
import input_check
import math

def task():
    """Функция, выполняющая задание по подсчету функции с заданной точностью."""
    rep = True
    while rep:
        eps = input_check.float_check('\nВведите точность вычислений eps:\n', 0, float('inf'))
        x = input_check.float_check('\nВведите x в диапазоне от -1 до 1:\n', -1, 1)

        resaults = my_ln(x, eps)

        print('Посчитанный вручную результат: ', resaults[0])
        print('Посчитанный результат с помощью модуля math: ', math.log(1 - x))
        print('Количество итераций: ', resaults[1])
        rep = repeat.repeat()

def my_ln(x, eps):
    """Функция, выполняющая вычисление натурального логарифма для заданного аргумента и точности."""
    try:
        fx = 0
        n = 500
        for i in range(1, 501):
            prev = fx
            fx -= x ** i / i
            if abs(fx - prev) <= eps:
                n = i - 1
                return (fx, n)
    except ValueError:
        print('ValueError')
    except TypeError:
        print('TypeError')