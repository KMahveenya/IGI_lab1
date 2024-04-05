import task1, task2, task3, task4

tasks = [task1.Task1, task2.Task2, task3.Task3, task4.Task4]

def main():
    tasks[3](4).start_task()

if __name__ == '__main__':
    main()
