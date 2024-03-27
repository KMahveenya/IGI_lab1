import Task1, Task2, Task3, Task4, Task5
import repeat, input_check

rep = True
tasks = [Task1.task, Task2.task, Task3.task, Task4.task, Task5.task]
while rep:
    task = input_check.int_check("Выберите выполняемую задачу: \n1. Задание 1\n2. Задание 2\n3. Задание 3\n4. Задание 4\n5. Задание 5\n6. Завершить программу\n", 1, 6)
    if task == 6:
        rep = False
    else:
        tasks[task - 1]()