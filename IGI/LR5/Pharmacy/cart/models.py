from django.db import models
from users.models import User
from Medicines.models import Medicines

class CartItem(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, verbose_name='Пользователь')
    med = models.ForeignKey(to=Medicines, on_delete=models.CASCADE, verbose_name='Медикамент')
    quantity = models.PositiveIntegerField(default=0, verbose_name='Количество')

    class Meta:
        verbose_name = 'Позиция корзины'
        verbose_name_plural = 'Позиции корзины'

    def __str__(self):
        return self.med.name