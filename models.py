
from django.db import models, connection
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.utils import timezone

class User(models.Model):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('trainer', 'Trainer'),
    )

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=7, choices=ROLE_CHOICES)

    def save(self, *args, **kwargs):
        # Hash the password before saving if it's not already hashed
        if not self.password.startswith('pbkdf2_sha256'):
            self.password = make_password(self.password)
        super(User, self).save(*args, **kwargs)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.username

class Logins(models.Model):
    email = models.EmailField()
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.email
class Courses(models.Model):
    name = models.CharField(max_length=200)
    image_url = models.URLField()
    details=models.CharField(max_length=200)
    duration = models.CharField(max_length=100)
    start_date = models.DateField()
    fee = models.IntegerField()
    text_lesson_url = models.URLField()
    video_lesson_url = models.URLField()


    def __str__(self):
        return self.name

class Payments(models.Model):
    student_id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    contact_no = models.CharField(max_length=15)
    course = models.CharField(max_length=100)
    amount_to_pay = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.CharField(max_length=50, default='Pending')
    frequency = models.CharField(max_length=50)
    slot = models.CharField(max_length=50)
    time = models.TimeField()
    def __str__(self):
        return f"{self.name} - {self.course}"



class TournamentRegistration(models.Model):
    USER_TYPE_CHOICES = (
        ('student', 'Student'),
        ('trainer', 'Trainer/Mentor'),
    )

    COMPETITION_CHOICES = (
        ('Local', 'Local'),
        ('State', 'State'),
        ('National', 'National'),
        ('International', 'International'),
        ('Chessbusters\' GrandMaster of the Year', 'Chessbusters\' GrandMaster of the Year'),
    )

    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    contact = models.CharField(max_length=15)
    academy = models.CharField(max_length=100)
    competition = models.CharField(max_length=100, choices=COMPETITION_CHOICES)

    def __str__(self):
        return f'{self.name} - {self.competition}'
# models.py


class Contact(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()

    def __str__(self):
        return f"{self.name} - {self.subject}"