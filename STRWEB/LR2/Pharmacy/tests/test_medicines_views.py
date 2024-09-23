from django.test import TestCase

from django.utils import timezone
from Medicines.models import Departments, Categories, Medicines, Sales

class MedicinesTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Departments.objects.create(name='Dep name')
        Categories.objects.create(name='Cat name', department=Departments.objects.get(id=1))
        Medicines.objects.create(name='Med name', category=Categories.objects.get(id=1), discount=30, price=65, quantity=10, description='description text', instruction='instruction text')

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/medicines/1/1/')
        self.assertEqual(resp.status_code, 200)

    def test_view_uses_correct_template(self):
         resp = self.client.get('/medicines/1/1/')
         self.assertEqual(resp.status_code, 200)
         self.assertTemplateUsed(resp, 'Medicines/medicines.html')

    def test_lists_all_news(self):
        resp = self.client.get('/medicines/1/1/')
        self.assertEqual(resp.status_code, 200)
        self.assertTrue('meds' in resp.context)
        self.assertEqual(len(resp.context['meds']), 1)

class DepartmentTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Departments.objects.create(name='Dep name')
        Categories.objects.create(name='Cat name', department=Departments.objects.get(id=1))
        Medicines.objects.create(name='Med name', category=Categories.objects.get(id=1), discount=30, price=65, quantity=10, description='description text', instruction='instruction text')

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/medicines/1/')
        self.assertEqual(resp.status_code, 200)

    def test_view_uses_correct_template(self):
         resp = self.client.get('/medicines/1/')
         self.assertEqual(resp.status_code, 200)
         self.assertTemplateUsed(resp, 'Medicines/medicines.html')

    def test_lists_all_news(self):
        resp = self.client.get('/medicines/1/')
        self.assertEqual(resp.status_code, 200)
        self.assertTrue('meds' in resp.context)
        self.assertEqual(len(resp.context['meds']), 1)

class DepartmentsTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Departments.objects.create(name='Dep name')
        Categories.objects.create(name='Cat name', department=Departments.objects.get(id=1))
        Medicines.objects.create(name='Med name', category=Categories.objects.get(id=1), discount=30, price=65, quantity=10, description='description text', instruction='instruction text')

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/medicines/')
        self.assertEqual(resp.status_code, 200)

    def test_view_uses_correct_template(self):
         resp = self.client.get('/medicines/')
         self.assertEqual(resp.status_code, 200)
         self.assertTemplateUsed(resp, 'Medicines/medicines.html')

    def test_lists_all_news(self):
        resp = self.client.get('/medicines/')
        self.assertEqual(resp.status_code, 200)
        self.assertTrue('meds' in resp.context)
        self.assertEqual(len(resp.context['meds']), 1)

class MedicineTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Departments.objects.create(name='Dep name')
        Categories.objects.create(name='Cat name', department=Departments.objects.get(id=1))
        Medicines.objects.create(name='Med name', category=Categories.objects.get(id=1), discount=30, price=65, quantity=10, description='description text', instruction='instruction text')

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/medicines/1/1/1/')
        self.assertEqual(resp.status_code, 200)

    def test_view_uses_correct_template(self):
         resp = self.client.get('/medicines/1/1/1/')
         self.assertEqual(resp.status_code, 200)
         self.assertTemplateUsed(resp, 'Medicines/medicine.html')

    def test_lists_all_news(self):
        resp = self.client.get('/medicines/1/1/1/')
        self.assertEqual(resp.status_code, 200)
        self.assertTrue('med' in resp.context)
        self.assertEqual(resp.context['med'].name, 'Med name')

class SalesTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Departments.objects.create(name='Dep name')
        Categories.objects.create(name='Cat name', department=Departments.objects.get(id=1))
        Medicines.objects.create(name='Med name', category=Categories.objects.get(id=1), discount=30, price=65, quantity=10, description='description text', instruction='instruction text')
        for num in range(1, 6):
            Sales.objects.create(medicine=Medicines.objects.get(id=1), quantity = num)

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/medicines/sales/')
        self.assertEqual(resp.status_code, 200)

    def test_view_uses_correct_template(self):
         resp = self.client.get('/medicines/sales/')
         self.assertEqual(resp.status_code, 200)
         self.assertTemplateUsed(resp, 'main/sale.html')

    def test_lists_all_news(self):
        resp = self.client.get('/medicines/sales/')
        self.assertEqual(resp.status_code, 200)
        self.assertTrue('sales' in resp.context)
        self.assertEqual(len(resp.context['sales']), 5)