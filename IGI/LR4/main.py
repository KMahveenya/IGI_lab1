import task1, task2, task3, task4, task5
import repeat, input_check

tasks = [task1.Task1, task2.Task2, task3.Task3, task4.Task4, task5.Task5]

def main():
    
    rep = True
    while rep:
        task = input_check.int_check("Выберите выполняемую задачу: \n1. Задание 1\n2. Задание 2\n3. Задание 3\n4. Задание 4\n5. Задание 5\n6. Завершить программу\n", 1, 6)
        if task == 6:
            rep = False
        else:
            tasks[task - 1](task).start_task()
            rep = repeat.repeat()

if __name__ == '__main__':
    main()