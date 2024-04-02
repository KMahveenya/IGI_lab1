# Serialize the dictionary and calculate the corresponding data as specified.
# Lab №4.
# Working with files, classes, serializers, regular expressions and standard libraries.
# v 1.0.0.
# Mahveenya Konstantin Evgenyevich.
# 26.03.2024.

import TaskClass
import pickle, csv
import input_check, repeat

class Task1(TaskClass.Task):
    
    def __init__(self, task):
        """Функция, инициализирующая объект класса."""
        super().__init__(task)
        self.tree_dict = {'яблоня': [100, 85], 'груша': [150, 105], 'береза': [130, 120]}

    @property
    def dict_init(self):
        return self.tree_dict
    
    @dict_init.setter
    def dict_init(self, new_dict):
        self.tree_dict = new_dict

    def start_task(self):
        """Функция, выполняющая основное задание."""
        rep = True
        while rep:
            self.curr_task(self.current_task)

            if input_check.int_check('Put info in:\n1. pickle\n2. CSV\n', 1, 2) == 1:
                self.set_get_pickle()
            else:
                self.set_get_CSV()

            rep2 = True
            while rep2:
                var = input_check.int_check('Select which feature you want to demonstrate:\n1. Count of all trees\n2. Count of healphy trees\n3. Percent of sick trees\n4. Percent info for all trees\n5. Info for tree\n6. Exit\n', 1, 6)
                if var == 1:
                    print(self.all_trees_count())
                elif var == 2:
                    print(self.healthy_trees_count())
                elif var == 3:
                    print(str(self.percent_of_sick_trees()) + '%')
                elif var == 4:
                    gen = self.percent_for_each()
                    for value in gen:
                        print(f'Percent of {value[0]} in plot is {value[1]}%. Of which {value[2]}% are sick')
                elif var == 5:
                    value = self.info_for_tree(input().lower())
                    if value:
                        print(f'Count of trees: {value[0]}\nCount of healthy trees: {value[1]}')
                    else:
                        print('No such tree')
                elif var == 6:
                    rep2 = False
            rep = repeat.repeat()
            
    def set_get_pickle(self):
        """Функция, которая записывает в файл и считывает из файла данные с помощью pickle."""
        with open('task1.txt', 'wb') as file:
            pickle.dump(self.tree_dict, file)
        with open('task1.txt', 'rb') as file:
            self.tree_dict = pickle.load(file)

    def set_get_CSV(self):
        """Функция, которая записывает в файл и считывает из файла данные с помощью CSV."""
        with open('task1.csv', 'w', encoding='utf-8', newline='') as file:
            writer = csv.writer(file, quoting=csv.QUOTE_ALL)
            for key, values in self.tree_dict.items():
                writer.writerow([key, *values])

        with open('task1.csv', 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            for row in reader:
                self.tree_dict[row[0]] = row[1:3]

    def all_trees_count(self):
        """Функция, которая считает количество деревьев на контрольном участке."""
        return sum(int(values[0]) for values in self.tree_dict.values())
    
    def healthy_trees_count(self):
        """Функция, которая считает количество здоровых деревьев на контрольном участке."""
        return sum(int(values[1]) for values in self.tree_dict.values())
    
    def percent_of_sick_trees(self):
        """Функция, которая считает процент больных деревьев на контрольном участке."""
        return (self.all_trees_count() - self.healthy_trees_count()) / self.all_trees_count() * 100
    
    def percent_for_each(self):
        """Функция - генератор, которая возвращает кортеж для с данными для каждого вида дерева."""
        all_trees_count = self.all_trees_count()
        for key, values in self.tree_dict.items():
            yield (key, int(values[0]) / int(all_trees_count) * 100, 100 - (int(values[1]) / int(values[0]) * 100))

    def info_for_tree(self, tree):
        """Функция, которая возвращает информацию о конкретном дереве."""
        return self.tree_dict.get(tree)