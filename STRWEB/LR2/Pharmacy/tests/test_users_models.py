from django.test import TestCase

from users.models import User, Questions, Review
from django.utils import timezone

class UserModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        User.objects.create(first_name='Name', last_name='Last name', surname='Surname', username='username', phone='+375-44-34-55-194', position='driver')

    def test_phone_label(self):
        user=User.objects.get(id=1)
        field_label = user._meta.get_field('phone').verbose_name
        self.assertEqual(field_label, 'phone')

    def test_image_label(self):
        user=User.objects.get(id=1)
        field_label = user._meta.get_field('image').verbose_name
        self.assertEqual(field_label, 'Аватар')

    def test_surname_label(self):
        user=User.objects.get(id=1)
        field_label = user._meta.get_field('surname').verbose_name
        self.assertEqual(field_label, 'surname')
    
    def test_position_label(self):
        user=User.objects.get(id=1)
        field_label = user._meta.get_field('position').verbose_name
        self.assertEqual(field_label, 'position')

    def test_phone_max_length(self):
        user=User.objects.get(id=1)
        field_label = user._meta.get_field('phone').max_length
        self.assertEqual(field_label, 19)

    def test_position_max_length(self):
        user=User.objects.get(id=1)
        field_label = user._meta.get_field('position').max_length
        self.assertEqual(field_label, 150)

    def test_surname_max_length(self):
        user=User.objects.get(id=1)
        field_label = user._meta.get_field('surname').max_length
        self.assertEqual(field_label, 150)

    def test_str(self):
        user=User.objects.get(id=1)
        self.assertEqual(str(user), 'username')

class QuestionsModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Questions.objects.create(question='Question text', answer='Answer text', date=timezone.now())

    def test_question_label(self):
        quest=Questions.objects.get(id=1)
        field_label = quest._meta.get_field('question').verbose_name
        self.assertEqual(field_label, 'Вопрос')

    def test_answer_label(self):
        quest=Questions.objects.get(id=1)
        field_label = quest._meta.get_field('answer').verbose_name
        self.assertEqual(field_label, 'Ответ')

    def test_date_label(self):
        quest=Questions.objects.get(id=1)
        field_label = quest._meta.get_field('date').verbose_name
        self.assertEqual(field_label, 'Дата добавления вопроса')

    def test_answer_max_length(self):
        quest=Questions.objects.get(id=1)
        field_label = quest._meta.get_field('answer').max_length
        self.assertEqual(field_label, 2000)

    def test_question_max_length(self):
        quest=Questions.objects.get(id=1)
        field_label = quest._meta.get_field('question').max_length
        self.assertEqual(field_label, 2000)

    def test_answer_default(self):
        quest=Questions.objects.get(id=1)
        field_label = quest._meta.get_field('answer').default
        self.assertEqual(field_label, 'На этот вопрос пока нет ответа.')

    def test_str(self):
        quest=Questions.objects.get(id=1)
        self.assertEqual(str(quest), 'Question text')

class ReviewModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        User.objects.create(first_name='Name', last_name='Last name', surname='Surname', username='username', phone='+375-44-34-55-194', position='driver')
        Review.objects.create(review='Review text', grade=5, date=timezone.now(), user=User.objects.get(id=1))

    def test_review_label(self):
        rev=Review.objects.get(id=1)
        field_label = rev._meta.get_field('review').verbose_name
        self.assertEqual(field_label, 'Отзыв')

    def test_grade_label(self):
        rev=Review.objects.get(id=1)
        field_label = rev._meta.get_field('grade').verbose_name
        self.assertEqual(field_label, 'Оценка')

    def test_user_label(self):
        rev=Review.objects.get(id=1)
        field_label = rev._meta.get_field('user').verbose_name
        self.assertEqual(field_label, 'Пользователь')

    def test_date_label(self):
        rev=Review.objects.get(id=1)
        field_label = rev._meta.get_field('date').verbose_name
        self.assertEqual(field_label, 'Дата добавления отзыва')

    def test_review_max_length(self):
        rev=Review.objects.get(id=1)
        field_label = rev._meta.get_field('review').max_length
        self.assertEqual(field_label, 2000)

    def test_grade_default(self):
        rev=Review.objects.get(id=1)
        field_label = rev._meta.get_field('grade').default
        self.assertEqual(field_label, 5)

    def test_user_to(self):
        rev=Review.objects.get(id=1)
        field_label = rev._meta.get_field('user').many_to_one
        self.assertTrue(field_label)

    def test_str(self):
        rev=Review.objects.get(id=1)
        self.assertEqual(str(rev), 'Review text')