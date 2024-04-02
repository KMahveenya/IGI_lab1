import input_check

def repeat():
    a = input_check.int_check('Повторить выполнение программы?\n1. Да\n2. Нет\n\n', 1, 2)
    if a == 1:
        return True
    else:
        return False