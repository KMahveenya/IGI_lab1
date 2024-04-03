# In accordance with the assignment of your option, create a program for text analysis.
# Lab №4.
# Working with files, classes, serializers, regular expressions and standard libraries.
# v 1.0.0.
# Mahveenya Konstantin Evgenyevich.
# 26.03.2024.

import TaskClass
import input_check, repeat
import re

class Task2(TaskClass.Task):
    
    filename = 'task2.txt'
    text = ''

    def __init__(self, task):
        """Функция, инициализирующая объект класса."""
        super().__init__(task)

    @property
    def filename_init(self):
        """Функция-геттер для переменной filename."""
        return self.filename
    
    @filename_init.setter
    def dict_init(self, new_filename):
        """Функция-сеттер для переменной filename."""
        self.filename = new_filename

    @property
    def text_init(self):
        """Функция-геттер для переменной text."""
        return self.filename
    
    @text_init.setter
    def text_init(self, new_text):
        """Функция-сеттер для переменной text."""
        self.text = new_text

    def start_task(self):
        """Функция, выполняющая основное задание."""
        rep = True
        while rep:
            
            self.get_text()
            #print(self.text)
            #self.find_average_sentence_len()

            self.general_task()
            self.variant_task()
            
            rep = repeat.repeat()
            
    def get_text(self):
        """Функция, которая считывает из файла данные."""
        with open(self.filename, 'r', encoding='utf-8') as file:
            self.text = file.read()
    
    def general_task(self):
        """Функция, записывающая в файл результаты общего задания."""
        with open('task2_resaults.txt', 'w', encoding='utf-8') as file:
            file.write(f'Общее задание\n\n')
            file.write(f'Количество предложений в тексте: {self.find_sentence_count()}\n')
            file.write('\tИз них:\n')
            type_count = self.find_sentence_type_count()
            file.write(f'\tПовествовательные: {type_count[0]}\n')
            file.write(f'\tПобудительные: {type_count[1]}\n')
            file.write(f'\tВопросительные: {type_count[2]}\n')
            file.write(f'Средняя длина предложения: {self.find_average_sentence_len()}\n')
            file.write(f'Средняя длина слова: {self.find_average_word_len()}\n')
            file.write(f'Количество смайликов в тексте: {self.find_smiles_count()}\n')

    def variant_task(self):
        """Функция, записывающая в файл результаты задания варианта."""
        with open('task2_resaults.txt', 'a', encoding='utf-8') as file:
            file.write('\nЗадание варианта\n\n')
            file.write('Полученные даты в тексте:\n')
            for elem in self.find_dates():
                file.write(f'{elem}\n')
            file.write('Слова, у которых 3-я с конца буква - согласная, а предпоследняя - гласная:\n')
            for elem in self.word_list():
                file.write(f'{elem}\n')
            file.write(f'Количество слов на гласную букву: {self.start_with_vowel()}\n')
            self.double_letter()
            file.write(f'\nСлова с повторяющейся буквой\n')
            for word, index in self.double_letter():
                file.write(f'Слово: {word} Порядковый номер: {index}\n')
            file.write(f'\nСлова в алфавитном порядке\:n')
            for word in sorted(self.all_words(), key=str.lower):
                file.write(f'{word}\n')

    def find_sentence_count(self):
        """Функция, подсчитывающая количество предложений в тексте."""
        return len(re.findall(r'[\.!?]', self.text))
    
    def find_sentence_type_count(self):
        """Функция, подсчитывающая количество предложений разных типов."""
        list = re.findall(r'[\.!?]', self.text)
        return (list.count('.'), list.count('!'), list.count('?'))
    
    def find_average_sentence_len(self):
        """Функция, подсчитывающая среднюю длину предложения в символах."""
        return sum(len(elem) for elem in re.findall(r'\w+', self.text)) / self.find_sentence_count()
    
    def find_average_word_len(self):
        """Функция, подсчитывающая среднюю длину слова в текст в символах."""
        list = re.findall(r'\w+', self.text)
        return sum(len(elem) for elem in list) / len(list)
    
    def find_smiles_count(self):
        """Функция, подсчитывающая количество смайликов в тексте."""
        return len(re.findall(r'[:;]-*(\)+|\(+|\]+|\[+)', self.text))
    
    def find_dates(self):
        """Функция, возвращающая даты из текста."""
        return re.findall(r'\d+', self.text)
    
    def word_list(self):
        """Функция, возвращающая список слов, где 3 с конца буква - согласная, а предпоследняя - гласная."""
        return re.findall(r'\w*[qwrtplkjhgfdszxcvbnm][aeiouy][^\s]\b', self.text)
    
    def start_with_vowel(self):
        """Функция, возвращающая количество слов с первой гласной буквой."""
        return len(re.findall(r'^[aeiouyAEIOUY]\w*\b| ([aeiouyAEIOUY]\w*\b)', self.text))#
    
    def double_letter(self):
        """Функция, возвращающая кортеж с словом, где есть повторяющиееся 2 буквы подряд, а также его порядковый номер."""
        double_words = []
        all_words = self.all_words()
        for match in re.finditer(r'\w*([a-zA-Z])\1\w*\b', self.text):
            double_words.append(match.group(0))
        for elem in double_words:
            yield (elem, all_words.index(elem) + 1)

    def all_words(self):
        """Функция, возвращающая список всех слов в тексте."""
        return re.findall(r'\w+', self.text)