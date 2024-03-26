import input_check

def generator(first, last, step):
    num = first
    while num < last:
        yield num
        num += step

def seq_input():
    first = input_check.float_check('Введите начальное значение последовательности:\n')
    last = input_check.float_check('Введите конечное значение последовательности:\n')
    step = input_check.float_check('Введите шаг последовательности:\n')
    return generator(first, last, step)

def user_input():
    list = []
    count = input_check.int_check('Введите количество элементов последовательности:\n', 1, float('inf'))
    for i in range(count):
        list.append(input_check.float_check())
    return list