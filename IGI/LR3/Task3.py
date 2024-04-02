# In the line entered from the keyboard, count the number of whitespace characters and commas.
# Lab №3.
# Standard data types, collections, functions, modules.
# v 1.0.0.
# Mahveenya Konstantin Evgenyevich.
# 26.03.2024.

import repeat

def task():
    """Функция, выполняющая основное задание."""
    rep = True
    while rep:
        input_string = input('Введите строку: \n')
        commas_spaces_count(input_string)
        rep = repeat.repeat()

def print_answer(func):
    """Функция-декоратор, которая выводит ответ в консоль."""
    def wrapper(*args, **kwargs):
        orig = func(*args, **kwargs)
        print('\nКоличество пробелов в строке: ', orig[0])
        print('\nКоличество запятых в строке: ', orig[1])
    return wrapper

@print_answer
def commas_spaces_count(input_string):
    """Функция, выполняющая подсчет пробелов и запятыхЮ после чего возвращает кортеж с посчитанными значениями."""
    try:
        spaces = 0
        commas = 0
        for c in input_string:
            if c == ' ':
                spaces += 1
            elif c == ',':
                commas += 1
        return (spaces, commas)
    except ValueError:
        print('ValueError')
    except TypeError:
        print('TypeError')