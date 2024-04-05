# In accordance with the specifications of your variant, develop base classes and descendant classes.
# Lab №4.
# Working with files, classes, serializers, regular expressions and standard libraries.
# v 1.0.0.
# Mahveenya Konstantin Evgenyevich.
# 26.03.2024.

from abc import ABC, abstractmethod
import TaskClass
import repeat, input_check
import matplotlib.pyplot as plt
import matplotlib.patches as patches

class Color():
    def __init__(self, color):
        """Функция, инициализирующая объект класса."""
        self.color = color

    @property
    def color_init(self):
        """Функция-геттер для переменной color."""
        return self.color
    
    @color_init.setter
    def color_init(self, new_color):
        """Функция-сеттер для переменной color."""
        self.color = new_color

    @color_init.deleter
    def x(self):
        """Функция-делетер для переменной color."""
        del self.color

    def __str__(self):
        """Магический метод, переопределяющий __str__."""
        return self.color

class Geometric_figure(ABC):

    @abstractmethod
    def square(self):
        """Функция, вычисляющая площадь фигуры."""

class Rectangle(Geometric_figure):

    def __init__(self, name, length, color):
        """Функция, инициализирующая объект класса."""
        super().__init__()
        self.length = length
        self.color = Color(color)
        self.name = name

    @property
    def get_length(self):
        """Функция-геттер для переменной length."""
        return self.length
    
    @get_length.setter
    def set_length(self, new_length):
        """Функция-сеттер для переменной length."""
        self.length = new_length

    @property
    def get_name(self):
        """Функция-геттер для переменной name."""
        return self.name
    
    @get_name.setter
    def set_name(self, new_name):
        """Функция-сеттер для переменной name."""
        self.name = new_name

    def square(self):
        """Переопределенная функция, вычисляющая площадь квадрата."""
        return self.length ** 2
    
    def draw(self, text):
        """Функция, отрисовывающая квадрат."""
        try:
            fig, ax = plt.subplots()
            square = patches.Rectangle((self.length / 2, self.length / 2), self.length, self.length, facecolor=str(self.color))
            circle = patches.Circle((self.length, self.length), radius=self.length / 2, edgecolor='black', facecolor='none')
            ax.add_patch(square)
            ax.add_patch(circle)
            plt.xlim(0, self.length * 2)
            plt.ylim(0, self.length * 2)
            plt.gca().set_aspect('equal')
            plt.title(text)
            plt.savefig('task4.png')
            plt.show()
        except ValueError:
            print('Был введен некорректный цвет')
            plt.close()
    
    def __str__(self):
        """Магический метод, переопределяющий __str__."""
        return 'Длина стороны квадрата: {}\nЦвет квадрата: {}'.format(self.length, str(self.color))

class Task4(TaskClass.Task):
    def __init__(self, task):
        """Функция, инициализирующая объект класса."""
        super().__init__(task)

    def start_task(self):
        """Функция, выполняющая основное задание."""
        rep = True
        while rep:

            name = input('Введите название фигуры:\n')
            length = 2 * input_check.float_check('Введите радиус окружности, около которой нужно описать квадрат:\n', 0, float('inf'))
            color = input('Введите цвет квадрата:\n')
            text = input('Введите подпись к картинке:\n')
            rect = Rectangle(name, length, color)
            #print(rect.name)
            rect.draw(text)

            rep = repeat.repeat()