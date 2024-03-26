# A program that involves working with text implements the solution of three subtasks according to options.
# Lab №3.
# Standard data types, collections, functions, modules.
# v 1.0.0.
# Mahveenya Konstantin Evgenyevich.
# 26.03.2024.

import repeat

"""Функция, выполняющая основное задание."""
def task():
    rep = True
    while rep:
        input_string = 'So she was considering in her own mind, as well as she could, for the hot day made her feel very sleepy and stupid, whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.'
        
        words_list = input_string.replace(',', '').strip('.').lower().split(' ')

        print('а) Число слов, в которых меньше 7 символов: ', task_A(words_list))
        print('b) Самое короткое слово, заканчивающееся на букву "а": ', task_B(words_list))
        task_C(words_list)

        rep = repeat.repeat()

"""Функция, выполняющая подсчет слов, у которых длина меньше 7 символов."""
def task_A(word_list):
    try:
        count = 0
        for word in word_list:
            if len(word) < 7:
                count += 1
        return count
    except ValueError:
        print('ValueError')
    except TypeError:
        print('TypeError')

"""Функция, выполняющая поиск самого короткого слова, которое заканчивается на 'а'."""
def task_B(word_list):
    try:
        cur_min = ''
        for word in word_list:
            if (word.endswith('a') and len(cur_min) > len(word)) or len(cur_min) == 0:
                cur_min = word
        return cur_min
    except ValueError:
        print('ValueError')
    except TypeError:
        print('TypeError')

"""Функция, выводящая слова текста в порядке убывания."""
def task_C(word_list):
    try:
        word_list = sorted(word_list, key=len, reverse=True)
        print('c)')
        for word in word_list:
            print(word, ' ')
    except ValueError:
        print('ValueError')
    except TypeError:
        print('TypeError')