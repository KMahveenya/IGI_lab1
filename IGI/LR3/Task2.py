# Create a loop that takes integers and subtracts them from 10000.
# Lab №3.
# Standard data types, collections, functions, modules.
# v 1.0.0.
# Mahveenya Konstantin Evgenyevich.
# 26.03.2024.

import repeat
import input_check

"""Функция, выполняющая основное задание."""
def task():
    rep = True
    while rep:
        my_loop()
        rep = repeat.repeat()

"""Функция, организующая цикл и выводящая результат остатка после каждой итерации."""
def my_loop():
    try:
        ans = 10000
        flag = True
        while flag:
            ans -= input_check.int_check('\nВведите любое целое число\n')
            print('\nОстаток на текущий момент: ', ans)
            if ans < 0:
                print('Остаток отрицательный, цель задания достигнута\n')
                flag = False
    except ValueError:
        print('ValueError')
    except TypeError:
        print('TypeError')