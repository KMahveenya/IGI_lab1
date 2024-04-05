# In accordance with the assignment of your option, explore the capabilities of the NumPy library when working with arrays and mathematical and static operations.
# Lab №4.
# Working with files, classes, serializers, regular expressions and standard libraries.
# v 1.0.0.
# Mahveenya Konstantin Evgenyevich.
# 26.03.2024.

import TaskClass
import input_check, repeat
import numpy as np, random, statistics, math

class Task5(TaskClass.Task):
    
    def __init__(self, task):
        """Функция, инициализирующая объект класса."""
        super().__init__(task)
        self.arr = None

    def start_task(self):
        """Функция, выполняющая основное задание."""
        rep = True
        while rep:

            n, m = input_check.int_check('Введите размер длину матрицы: \n', 0, 100), input_check.int_check('Введите размер ширину матрицы: \n', 0, 100)
            self.arr = np.array([[random.randint(-100, 100) for i in range(n)] for j in range(m)])
            print('Получившаяся матрица:')
            print(self.arr)
            print(f'\nСумма элементов ниже главной диагонали: {self.sum_under_diag()}\n')
            print(f'СКО главной диагонали, посчитанное с помощью метода numpy: {round(self.std(), 2)}\n')
            print(f'СКО главной диагонали, посчитанное вручную: {round(self.my_std(), 2)}\n')

            rep = repeat.repeat()

    def sum_under_diag(self):
        """Функция, подсчитывающая сумму элементов ниже главной диагонали."""
        return sum([sum(elem for index2, elem in enumerate(elems) if index1 > index2) for index1, elems in enumerate(self.arr)])
    
    def std(self):
        """Функция, подсчитывающая СКО главной диагонали."""
        return np.std([self.arr[i][i] for i in range(min(self.arr.shape))])

    def my_std(self):
        """Функция, подсчитывающая СКО главной диагонали вручную."""
        elems = [self.arr[i][i] for i in range(min(self.arr.shape))]
        aver = statistics.mean(elems)
        return math.sqrt(sum([(elem - aver) ** 2 for elem in elems]) / len(elems))
        