from django.db import models
from users.models import User

class Departments(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name='Название')

    class Meta:
        verbose_name = 'Отдел'
        verbose_name_plural = 'Отделы'

    def __str__(self):
        return self.name

class Categories(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name='Название')
    department = models.ForeignKey(to=Departments, on_delete=models.CASCADE, verbose_name='Отдел')

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name

class Medicines(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name='Название')
    category = models.ForeignKey(to=Categories, on_delete=models.CASCADE, verbose_name='Категория')
    discount = models.DecimalField(default=0.00, max_digits=5, decimal_places=2, verbose_name='Скидка')
    price = models.DecimalField(default=0.00, max_digits=5, decimal_places=2, verbose_name='Цена')
    quantity = models.PositiveIntegerField(default=0, verbose_name='Количество')
    description = models.TextField(verbose_name='Описание')
    instruction = models.TextField(verbose_name='Инструкция')
    pick_up_points = models.TextField(verbose_name='Точки самовывоза', null=True, blank=True)
    image = models.ImageField(blank=True, null=True, verbose_name='Изображение', upload_to='medicines_images/')

    class Meta:
        verbose_name = 'Медикамент'
        verbose_name_plural = 'Медикаменты'

    def __str__(self):
        return self.name
    
    def sell_price(self):
        return round(self.price - self.discount / 100 * self.price, 2)
    
class Providers(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name='Компания-поставщик')
    medicine = models.ForeignKey(to=Medicines, on_delete=models.CASCADE, verbose_name='Товар')
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, verbose_name='Персонал')
    price = models.PositiveIntegerField(default=0, verbose_name='Закупочная цена')

    class Meta:
        verbose_name = 'Поставщик'
        verbose_name_plural = 'Поставщики'

    def __str__(self):
        return self.name
    
class Sales(models.Model):
    medicine = models.ForeignKey(to=Medicines, on_delete=models.CASCADE, verbose_name='Товар')
    quantity = models.PositiveIntegerField(default=0, verbose_name='Количество')

    class Meta:
        verbose_name = 'Продажа'
        verbose_name_plural = 'Продажи'

    def __str__(self):
        return self.medicine.name