from django.test import TestCase

from main.models import New, Vacancy, Promotion
from django.utils import timezone
from Medicines.models import Departments, Categories, Medicines, Sales

class NewsTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        for num in range(5):
            New.objects.create(title='Title %s' % num, some_info = 'Some info %s' % num, text = 'Text %s' % num)

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/news/')
        self.assertEqual(resp.status_code, 200)

    def test_view_uses_correct_template(self):
         resp = self.client.get('/news/')
         self.assertEqual(resp.status_code, 200)
         self.assertTemplateUsed(resp, 'main/news.html')

    def test_lists_all_news(self):
        resp = self.client.get('/news/')
        self.assertEqual(resp.status_code, 200)
        self.assertTrue('news' in resp.context)
        self.assertEqual(len(resp.context['news']), 5)

class NewTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        for num in range(1, 6):
            New.objects.create(title='Title %s' % num, some_info = 'Some info %s' % num, text = 'Text %s' % num)

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/news/3/')
        self.assertEqual(resp.status_code, 200)

    def test_view_uses_correct_template(self):
         resp = self.client.get('/news/3/')
         self.assertEqual(resp.status_code, 200)
         self.assertTemplateUsed(resp, 'main/new.html')

    def test_correct_title(self):
        resp = self.client.get('/news/3/')
        self.assertEqual(resp.status_code, 200)
        self.assertTrue('new' in resp.context)
        self.assertEqual(resp.context['new'].title, 'Title 3')

class VacanciesTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        for num in range(1, 6):
            Vacancy.objects.create(position='Powition %s' % num, some_info = 'Some info %s' % num, salary = num, city = 'City %s' % num)

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/vacancies/')
        self.assertEqual(resp.status_code, 200)

    def test_view_uses_correct_template(self):
         resp = self.client.get('/vacancies/')
         self.assertEqual(resp.status_code, 200)
         self.assertTemplateUsed(resp, 'main/vacancy.html')

    def test_lists_all_vacancies(self):
        resp = self.client.get('/vacancies/')
        self.assertEqual(resp.status_code, 200)
        self.assertTrue('vacancies' in resp.context)
        self.assertEqual(len(resp.context['vacancies']), 5)

class PromotionsTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        for num in range(1, 6):
            Promotion.objects.create(title='Title %s' % num, some_info = 'Some info %s' % num, discount = num, date = timezone.now())

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/promotions/')
        self.assertEqual(resp.status_code, 200)

    def test_view_uses_correct_template(self):
         resp = self.client.get('/promotions/')
         self.assertEqual(resp.status_code, 200)
         self.assertTemplateUsed(resp, 'main/promotion.html')

    def test_lists_all_vacancies(self):
        resp = self.client.get('/promotions/')
        self.assertEqual(resp.status_code, 200)
        self.assertTrue('promotions' in resp.context)
        self.assertEqual(len(resp.context['promotions']), 5)

class StatisticTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Departments.objects.create(name='Dep name')
        Categories.objects.create(name='Cat name', department=Departments.objects.get(id=1))
        Medicines.objects.create(name='Med name', category=Categories.objects.get(id=1), discount=30, price=65, quantity=10, description='description text', instruction='instruction text')
        for num in range(1, 6):
            Sales.objects.create(medicine=Medicines.objects.get(id=1), quantity = num)

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/statistic/')
        self.assertEqual(resp.status_code, 200)

    def test_view_uses_correct_template(self):
         resp = self.client.get('/statistic/')
         self.assertEqual(resp.status_code, 200)
         self.assertTemplateUsed(resp, 'main/statistic.html')

    def test_popular_med(self):
        resp = self.client.get('/statistic/')
        self.assertEqual(resp.status_code, 200)
        self.assertTrue('popular_med' in resp.context)
        self.assertEqual(resp.context['popular_med'], 'Med name')

class IndexTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        for num in range(1, 6):
            New.objects.create(title='Title %s' % num, some_info = 'Some info %s' % num, text = 'Text %s' % num)

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/')
        self.assertEqual(resp.status_code, 200)

    def test_view_uses_correct_template(self):
         resp = self.client.get('/')
         self.assertEqual(resp.status_code, 200)
         self.assertTemplateUsed(resp, 'main/index.html')

    def test_popular_med(self):
        resp = self.client.get('/')
        self.assertEqual(resp.status_code, 200)
        self.assertTrue('new' in resp.context)
        self.assertEqual(resp.context['new'].title, 'Title 5')