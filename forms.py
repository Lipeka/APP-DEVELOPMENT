# forms.py

from django import forms
from .models import Author, Chess

class AuthorForm(forms.ModelForm):
    class Meta:
        model = Author
        fields = ['name', 'mail']

class ChessForm(forms.ModelForm):
    class Meta:
        model = Chess
        fields = ['course', 'slot', 'frequency', 'timing', 'payment_status']
