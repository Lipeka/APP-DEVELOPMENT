from rest_framework import serializers
from .models import User, Logins, Courses,Payments,Contact
from .models import TournamentRegistration


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password', 'role']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False}
        }

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        instance = super().update(instance, validated_data)
        if password:
            instance.set_password(password)
            instance.save()
        return instance

class LoginsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logins
        fields = ['id', 'email', 'password']



class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = ['id','name', 'image_url', 'details','duration', 'start_date','fee', 'text_lesson_url', 'video_lesson_url']


 # Assuming Course is a model storing available courses

class PaymentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payments
        fields = ['id', 'student_id', 'name', 'contact_no', 'course', 'amount_to_pay', 'payment_status', 'frequency', 'slot', 'time']
    

    def validate(self, data):
        # Fetch available courses and their fees dynamically
        course_fees = {course.name: course.fee for course in Courses.objects.all()}  # Assuming Course model has name and fee fields
        
        course = data.get('course')
        amount_to_pay = data.get('amount_to_pay')
        
        if course in course_fees:
            expected_fee = course_fees[course]
            if amount_to_pay != expected_fee:
                raise serializers.ValidationError({'amount_to_pay': 'Amount mismatch for the selected course.'})
        else:
            raise serializers.ValidationError({'course': 'Invalid course selected.'})
        
        return data

class TournamentRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TournamentRegistration
        fields = ['id', 'user_type', 'name', 'age', 'contact', 'academy', 'competition']
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'phone', 'email', 'subject', 'message']
class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  # Fields automatically retrieved
