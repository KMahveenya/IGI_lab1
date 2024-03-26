# the program implements work with sequences and also provides a search for minimal elements.
# Lab №3.
# Standard data types, collections, functions, modules.
# v 1.0.0.
# Mahveenya Konstantin Evgenyevich.
# 26.03.2024.

import repeat
import inputsequence
import input_check

"""Функция, выполняющая основное задание."""
def task():
    rep = True
    while rep:
        var = input_check.int_check('Выберите способ ввода последовательности:\n1. Функция-генератор\n2. Ручной ввод\n', 1, 2)
        list = []
        if var == 1:
            gen = inputsequence.seq_input()
            for num in gen:
                list.append(num)
        elif var == 2:
            list = inputsequence.user_input()
        resaults = seq_func(list)
        if resaults[0] != None:
            print('Индекс минимального отрицательного элемента: ', resaults[0])
        else:
            print('В последовательности нет отрицательных элементов')
        if resaults[1] != None:
            print('Сумма элементов между двумя первыми отрицательными элементами: ', resaults[1])
        else:
            print('В последовательности двух отрицательных элементов')
        rep = repeat.repeat()

"""Функция, которая ищет индекс минимального отрицательного элемента, а также сумму элементов между первыми двумя отрицательными элементами."""
def seq_func(list):
    try:
        index_min = -1
        min = float('inf')
        first_neg_index = -1
        second_neg_index = -1
        for i in range(len(list)):
            if list[i] < 0:
                if list[i] < min:
                    min = list[i]
                    index_min = i
                if first_neg_index < 0:
                    first_neg_index = i
                elif second_neg_index < 0:
                    second_neg_index = i
        sum_elems = sum(list[first_neg_index + 1:second_neg_index])
        if index_min == -1:
            index_min = None
        if second_neg_index == -1:
            sum_elems = None
        return (index_min, sum_elems)
    except ValueError:
        print('ValueError')
    except TypeError:
        print('TypeError')