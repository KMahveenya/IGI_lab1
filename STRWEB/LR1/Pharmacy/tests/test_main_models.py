from django.test import TestCase

from main.models import New, Vacancy, Promotion
from django.utils import timezone

class NewModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        New.objects.create(title='Head', some_info='info of new', text='text of new')

    def test_title_label(self):
        new=New.objects.get(id=1)
        field_label = new._meta.get_field('title').verbose_name
        self.assertEqual(field_label, 'Заголовок')

    def test_some_info_label(self):
        new=New.objects.get(id=1)
        field_label = new._meta.get_field('some_info').verbose_name
        self.assertEqual(field_label, 'Краткая информация')

    def test_text_label(self):
        new=New.objects.get(id=1)
        field_label = new._meta.get_field('text').verbose_name
        self.assertEqual(field_label, 'Текст новости')

    def test_image_label(self):
        new=New.objects.get(id=1)
        field_label = new._meta.get_field('image').verbose_name
        self.assertEqual(field_label, 'Изображение')

    def test_title_max_length(self):
        new=New.objects.get(id=1)
        field_label = new._meta.get_field('title').max_length
        self.assertEqual(field_label, 200)

    def test_some_info_max_length(self):
        new=New.objects.get(id=1)
        field_label = new._meta.get_field('some_info').max_length
        self.assertEqual(field_label, 1000)

    def test_text_max_length(self):
        new=New.objects.get(id=1)
        field_label = new._meta.get_field('text').max_length
        self.assertEqual(field_label, 2000)

    def test_str(self):
        new=New.objects.get(id=1)
        self.assertEqual(str(new), 'Head')

class VacancyModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Vacancy.objects.create(position='Director', some_info='vacancy info', salary=1000, city='Gomel')

    def test_position_label(self):
        vacancy=Vacancy.objects.get(id=1)
        field_label = vacancy._meta.get_field('position').verbose_name
        self.assertEqual(field_label, 'Должность')

    def test_salary_label(self):
        vacancy=Vacancy.objects.get(id=1)
        field_label = vacancy._meta.get_field('salary').verbose_name
        self.assertEqual(field_label, 'Заработная плата')

    def test_some_info_label(self):
        vacancy=Vacancy.objects.get(id=1)
        field_label = vacancy._meta.get_field('some_info').verbose_name
        self.assertEqual(field_label, 'Описание должности')

    def test_city_label(self):
        vacancy=Vacancy.objects.get(id=1)
        field_label = vacancy._meta.get_field('city').verbose_name
        self.assertEqual(field_label, 'Город')

    def test_position_max_length(self):
        vacancy=Vacancy.objects.get(id=1)
        field_label = vacancy._meta.get_field('position').max_length
        self.assertEqual(field_label, 200)

    def test_some_info_max_length(self):
        vacancy=Vacancy.objects.get(id=1)
        field_label = vacancy._meta.get_field('some_info').max_length
        self.assertEqual(field_label, 1000)

    def test_city_max_length(self):
        vacancy=Vacancy.objects.get(id=1)
        field_label = vacancy._meta.get_field('city').max_length
        self.assertEqual(field_label, 30)

    def test_salary_default(self):
        vacancy=Vacancy.objects.get(id=1)
        field_label = vacancy._meta.get_field('salary').default
        self.assertEqual(field_label, 0)

    def test_str(self):
        vacancy=Vacancy.objects.get(id=1)
        self.assertEqual(str(vacancy), 'Director')

class PromotionModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Promotion.objects.create(title='Promotion head', some_info='promotion info', discount=30, date=timezone.now())

    def test_title_label(self):
        promotion=Promotion.objects.get(id=1)
        field_label = promotion._meta.get_field('title').verbose_name
        self.assertEqual(field_label, 'Название')

    def test_some_info_label(self):
        promotion=Promotion.objects.get(id=1)
        field_label = promotion._meta.get_field('some_info').verbose_name
        self.assertEqual(field_label, 'Описание акции')

    def test_date_label(self):
        promotion=Promotion.objects.get(id=1)
        field_label = promotion._meta.get_field('date').verbose_name
        self.assertEqual(field_label, 'Дата окончания')

    def test_discount_label(self):
        promotion=Promotion.objects.get(id=1)
        field_label = promotion._meta.get_field('discount').verbose_name
        self.assertEqual(field_label, 'Скидка')

    def test_title_max_length(self):
        promotion=Promotion.objects.get(id=1)
        field_label = promotion._meta.get_field('title').max_length
        self.assertEqual(field_label, 200)

    def test_some_info_max_length(self):
        promotion=Promotion.objects.get(id=1)
        field_label = promotion._meta.get_field('some_info').max_length
        self.assertEqual(field_label, 1000)

    def test_discount_default(self):
        promotion=Promotion.objects.get(id=1)
        field_label = promotion._meta.get_field('discount').default
        self.assertEqual(field_label, 0)

    def test_str(self):
        promotion=Promotion.objects.get(id=1)
        self.assertEqual(str(promotion), 'Promotion head')