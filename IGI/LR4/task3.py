# In accordance with the instructions of your option, modify the program from LR3 using the class.
# Lab №4.
# Working with files, classes, serializers, regular expressions and standard libraries.
# v 1.0.0.
# Mahveenya Konstantin Evgenyevich.
# 26.03.2024.

import TaskClass
import input_check, repeat
import math, statistics, matplotlib.pyplot as plt

class Task3(TaskClass.Task):
    
    def __init__(self, task):
        """Функция, инициализирующая объект класса."""
        super().__init__(task)

    def start_task(self):
        """Функция, выполняющая основное задание."""
        rep = True
        while rep:

            eps = input_check.float_check('\nВведите точность вычислений eps:\n', 0, float('inf'))
            x = input_check.float_check('\nВведите x в диапазоне от -1 до 1:\n', -1, 1)

            ans, n, list = self.my_ln(x, eps)
            print('Посчитанный вручную результат: ', ans)
            print('Посчитанный результат с помощью модуля math: ', math.log(1 - x))
            print('Количество итераций: ', n)
            print(f'Среднее арфиметическое элементов списка: {statistics.mean(list)}')
            print(f'Медиана элементов списка: {statistics.median(list)}')
            print(f'Мода элементов списка: {statistics.mode(list)}')
            print(f'Дисперсия элементов списка: {statistics.variance(list)}')
            print(f'СКО элементов списка: {statistics.stdev(list)}')
            self.draw(5)

            rep = repeat.repeat()

    def my_ln(self, x, eps):
        """Функция, выполняющая вычисление натурального логарифма для заданного аргумента и точности."""
        try:
            fx = 0
            n = 500
            list = []
            for i in range(1, 501):
                prev = fx
                fx = -(x ** i / i)
                list.append(fx)
                if abs(fx - prev) <= eps:
                    n = i - 1
                    return (sum(list), n, list)
        except ValueError:
            print('ValueError')
        except TypeError:
            print('TypeError')
    
    def draw(self, h):
        """Функция, выполняющая построение графика с функциями варианта."""
        eps = input_check.float_check('\nВведите точность вычислений eps для построения графика:\n', 0, float('inf'))
        x = [i / 100 for i in range(-100, 100, h)]
        my_y = [self.my_ln(elem, eps)[0] for elem in x]
        math_y = [math.log(1 - elem) for elem in x]
        fig, ax = plt.subplots()
        ax.plot(x, my_y, 'red', linewidth=2, label='Taylor')
        ax.plot(x, math_y, 'blue', linewidth=2, label='Math')
        ax.legend(loc='lower left')
        ax.set_xlabel('Ox')
        ax.set_ylabel('Oy')
        ax.text(-1.05, -2.3, 'Демонстрация графиков, полученных\nпо Тейлору и с помощью модуля Math')
        ax.annotate('Точка, с которой начинается разложение по Тейлору', xy=(0, 0), xytext=(-0.75, 0.75), arrowprops=dict(facecolor='black', shrink=0.01))
        plt.savefig('task3.png')
        plt.show()