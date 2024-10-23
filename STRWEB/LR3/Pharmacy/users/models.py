from django.db import models
from django.contrib.auth.models import AbstractUser

from django.utils import timezone

class User(AbstractUser):
    phone = models.CharField(max_length=19)
    image = models.ImageField(blank=True, null=True, verbose_name='Аватар', upload_to='users_images/')
    surname = models.CharField(max_length=150, unique=True, blank=True, null=True)
    position = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return self.username
    
class Questions(models.Model):
    question = models.TextField(max_length=2000, unique=True, verbose_name='Вопрос')
    answer = models.TextField(max_length=2000, verbose_name='Ответ', null=True, blank=True, default='На этот вопрос пока нет ответа.')
    date = models.DateField(default=timezone.now(), verbose_name='Дата добавления вопроса', auto_now=False, auto_now_add=False)

    class Meta:
        verbose_name = 'Вопрос-ответ'
        verbose_name_plural = 'Вопросы-ответы'

    def __str__(self):
        return self.question
    
class Review(models.Model):
    review = models.TextField(max_length=2000, verbose_name='Отзыв')
    grade = models.PositiveIntegerField(default=5, verbose_name='Оценка')
    date = models.DateField(default=timezone.now(), verbose_name='Дата добавления отзыва', auto_now=False, auto_now_add=False)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, verbose_name='Пользователь')

    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'

    def __str__(self):
        return self.review