from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

from users.models import User, Review

class UserLoginForm(AuthenticationForm):

    username = forms.CharField()
    password = forms.CharField()

    class Meta:
        model = User
        fields = ('username', 'password')

class UserRegistrationForm(UserCreationForm):

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'phone', 'email', 'surname', 'password1', 'password2', 'image')

class ReviewForm(forms.Form):

    class Meta:
        model = Review
        fields = ('review', 'grade', 'date', 'user')