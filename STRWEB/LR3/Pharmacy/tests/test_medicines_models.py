from django.test import TestCase

from Medicines.models import Departments, Categories, Medicines, Providers, Sales

class DepartmentsModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Departments.objects.create(name='Name')

    def test_name_label(self):
        dep=Departments.objects.get(id=1)
        field_label = dep._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'Название')

    def test_name_max_length(self):
        dep=Departments.objects.get(id=1)
        field_label = dep._meta.get_field('name').max_length
        self.assertEqual(field_label, 100)

    def test_str(self):
        dep=Departments.objects.get(id=1)
        self.assertEqual(str(dep), 'Name')

class CategoriesModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Departments.objects.create(name='Dep name')
        Categories.objects.create(name='Cat name', department=Departments.objects.get(id=1))

    def test_name_label(self):
        cat=Categories.objects.get(id=1)
        field_label = cat._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'Название')

    def test_department_label(self):
        cat=Categories.objects.get(id=1)
        field_label = cat._meta.get_field('department').verbose_name
        self.assertEqual(field_label, 'Отдел')

    def test_name_max_length(self):
        cat=Categories.objects.get(id=1)
        field_label = cat._meta.get_field('name').max_length
        self.assertEqual(field_label, 100)

    def test_department_to(self):
        cat=Categories.objects.get(id=1)
        field_label = cat._meta.get_field('department').many_to_one
        self.assertTrue(field_label)

    def test_str(self):
        cat=Categories.objects.get(id=1)
        self.assertEqual(str(cat), 'Cat name')

class MedicinesModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Departments.objects.create(name='Dep name')
        Categories.objects.create(name='Cat name', department=Departments.objects.get(id=1))
        Medicines.objects.create(name='Med name', category=Categories.objects.get(id=1), discount=30, price=65, quantity=10, description='description text', instruction='instruction text')

    def test_name_label(self):
        med=Medicines.objects.get(id=1)
        field_label = med._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'Название')

    def test_category_label(self):
        med=Medicines.objects.get(id=1)
        field_label = med._meta.get_field('category').verbose_name
        self.assertEqual(field_label, 'Категория')

    def test_discount_label(self):
        med=Medicines.objects.get(id=1)
        field_label = med._meta.get_field('discount').verbose_name
        self.assertEqual(field_label, 'Скидка')

    def test_price_label(self):
        med=Medicines.objects.get(id=1)
        field_label = med._meta.get_field('price').verbose_name
        self.assertEqual(field_label, 'Цена')

    def test_quantity_label(self):
        med=Medicines.objects.get(id=1)
        field_label = med._meta.get_field('quantity').verbose_name
        self.assertEqual(field_label, 'Количество')

    def test_image_label(self):
        med=Medicines.objects.get(id=1)
        field_label = med._meta.get_field('image').verbose_name
        self.assertEqual(field_label, 'Изображение')

    def test_description_label(self):
        med=Medicines.objects.get(id=1)
        field_label = med._meta.get_field('description').verbose_name
        self.assertEqual(field_label, 'Описание')

    def test_instruction_label(self):
        med=Medicines.objects.get(id=1)
        field_label = med._meta.get_field('instruction').verbose_name
        self.assertEqual(field_label, 'Инструкция')

    def test_name_max_length(self):
        med=Medicines.objects.get(id=1)
        field_label = med._meta.get_field('name').max_length
        self.assertEqual(field_label, 100)

    def test_category_to(self):
        med=Medicines.objects.get(id=1)
        field_label = med._meta.get_field('category').many_to_one
        self.assertTrue(field_label)

    def test_price_default(self):
        med=Medicines.objects.get(id=1)
        field_label = med._meta.get_field('price').default
        self.assertEqual(field_label, 0.00)

    def test_discount_default(self):
        med=Medicines.objects.get(id=1)
        field_label = med._meta.get_field('discount').default
        self.assertEqual(field_label, 0.00)
    
    def test_quantity_default(self):
        med=Medicines.objects.get(id=1)
        field_label = med._meta.get_field('quantity').default
        self.assertEqual(field_label, 0)

    def test_str(self):
        med=Medicines.objects.get(id=1)
        self.assertEqual(str(med), 'Med name')

    def test_sell_price(self):
        med=Medicines.objects.get(id=1)
        self.assertEqual(med.sell_price(), 45.50)

class ProvidersModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Departments.objects.create(name='Dep name')
        Categories.objects.create(name='Cat name', department=Departments.objects.get(id=1))
        Medicines.objects.create(name='Med name', category=Categories.objects.get(id=1), discount=30, price=65, quantity=10, description='description text', instruction='instruction text')
        Providers.objects.create(name='Provider name', medicine=Medicines.objects.get(id=1), price=50)

    def test_name_label(self):
        prov=Providers.objects.get(id=1)
        field_label = prov._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'Компания-поставщик')

    def test_medicine_label(self):
        prov=Providers.objects.get(id=1)
        field_label = prov._meta.get_field('medicine').verbose_name
        self.assertEqual(field_label, 'Товар')
    
    def test_price_label(self):
        prov=Providers.objects.get(id=1)
        field_label = prov._meta.get_field('price').verbose_name
        self.assertEqual(field_label, 'Закупочная цена')

    def test_name_max_length(self):
        prov=Providers.objects.get(id=1)
        field_label = prov._meta.get_field('name').max_length
        self.assertEqual(field_label, 100)

    def test_medicine_to(self):
        prov=Providers.objects.get(id=1)
        field_label = prov._meta.get_field('medicine').many_to_one
        self.assertTrue(field_label)

    def test_price_default(self):
        prov=Providers.objects.get(id=1)
        field_label = prov._meta.get_field('price').default
        self.assertEqual(field_label, 0)

    def test_str(self):
        prov=Providers.objects.get(id=1)
        self.assertEqual(str(prov), 'Provider name')

class ProvidersModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Departments.objects.create(name='Dep name')
        Categories.objects.create(name='Cat name', department=Departments.objects.get(id=1))
        Medicines.objects.create(name='Med name', category=Categories.objects.get(id=1), discount=30, price=65, quantity=10, description='description text', instruction='instruction text')
        Sales.objects.create(medicine=Medicines.objects.get(id=1), quantity=20)

    def test_medicine_label(self):
        sale=Sales.objects.get(id=1)
        field_label = sale._meta.get_field('medicine').verbose_name
        self.assertEqual(field_label, 'Товар')

    def test_quantity_label(self):
        sale=Sales.objects.get(id=1)
        field_label = sale._meta.get_field('quantity').verbose_name
        self.assertEqual(field_label, 'Количество')

    def test_medicine_to(self):
        sale=Sales.objects.get(id=1)
        field_label = sale._meta.get_field('medicine').many_to_one
        self.assertTrue(field_label)

    def test_quantity_default(self):
        sale=Sales.objects.get(id=1)
        field_label = sale._meta.get_field('quantity').default
        self.assertEqual(field_label, 0)

    def test_str(self):
        sale=Sales.objects.get(id=1)
        self.assertEqual(str(sale), 'Med name')