from django.test import TestCase

from django.utils import timezone
from users.models import User, Questions, Review
from Medicines.models import Providers, Departments, Categories, Medicines

class StaffTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        User.objects.create(first_name='Name', last_name='Last name', surname='Surname1', username='username1', phone='+375-44-34-55-194', position='driver', is_staff=True)
        User.objects.create(first_name='Name', last_name='Last name', surname='Surname2', username='username2', phone='+375-44-34-55-194', position='driver', is_staff=True)
        User.objects.create(first_name='Name', last_name='Last name', surname='Surname3', username='username3', phone='+375-44-34-55-194', position='driver', is_staff=False)
        User.objects.create(first_name='Name', last_name='Last name', surname='Surname4', username='username4', phone='+375-44-34-55-194', position='driver', is_staff=True)
        User.objects.create(first_name='Name', last_name='Last name', surname='Surname5', username='username5', phone='+375-44-34-55-194', position='driver', is_staff=False)

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/users/staff/')
        self.assertEqual(resp.status_code, 200)

    def test_view_uses_correct_template(self):
         resp = self.client.get('/users/staff/')
         self.assertEqual(resp.status_code, 200)
         self.assertTemplateUsed(resp, 'users/staff.html')

    def test_lists_all_news(self):
        resp = self.client.get('/users/staff/')
        self.assertEqual(resp.status_code, 200)
        self.assertTrue('staff' in resp.context)
        self.assertEqual(len(resp.context['staff']), 3)

class QuestionsTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Questions.objects.create(question='quest1', answer='answer1', date=timezone.now())

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/users/questions/')
        self.assertEqual(resp.status_code, 200)

    def test_view_uses_correct_template(self):
         resp = self.client.get('/users/questions/')
         self.assertEqual(resp.status_code, 200)
         self.assertTemplateUsed(resp, 'users/question-answer.html')

    def test_lists_all_news(self):
        resp = self.client.get('/users/questions/')
        self.assertEqual(resp.status_code, 200)
        self.assertTrue('questions' in resp.context)
        self.assertEqual(len(resp.context['questions']), 1)

class ReviewsTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        User.objects.create(first_name='Name', last_name='Last name', surname='Surname1', username='username1', phone='+375-44-34-55-194', position='driver', is_staff=True)
        Review.objects.create(review='review', grade=5, date=timezone.now(), user=User.objects.get(id=1))

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/users/reviews/')
        self.assertEqual(resp.status_code, 200)

    def test_view_uses_correct_template(self):
         resp = self.client.get('/users/reviews/')
         self.assertEqual(resp.status_code, 200)
         self.assertTemplateUsed(resp, 'users/review.html')

    def test_lists_all_news(self):
        resp = self.client.get('/users/reviews/')
        self.assertEqual(resp.status_code, 200)
        self.assertTrue('reviews' in resp.context)
        self.assertEqual(len(resp.context['reviews']), 1)