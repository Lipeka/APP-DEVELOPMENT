from .models import User, Logins, Courses
from .serializers import UserSerializer, LoginsSerializer, CoursesSerializer
from .models import Payments
from .serializers import PaymentsSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import JsonResponse
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import status
from .models import TournamentRegistration
from .serializers import TournamentRegistrationSerializer
from django.contrib.auth.hashers import check_password
@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        users = User.objects.filter(role='trainer')  # Filter trainers only
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            print("Valid data:", serializer.validated_data)  # Log valid data
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Invalid data:", serializer.errors)  # Log errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    serializer = LoginsSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                # Send back user info and role
                return Response({'message': 'Login successful', 'role': user.role, 'username': user.username}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE'])
def login_detail(request, pk):
    try:
        login = Logins.objects.get(pk=pk)
    except Logins.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = LoginsSerializer(login)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        login.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
@api_view(['GET', 'POST'])
def adds_course(request):
    if request.method == 'POST':
        serializer = CoursesSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        courses = Courses.objects.all()  # List all courses
        serializer = CoursesSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT', 'DELETE'])
def courses_detail(request, pk):
    try:
        course = Courses.objects.get(pk=pk)
    except Courses.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = CoursesSerializer(course)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = CoursesSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
@api_view(['GET', 'POST'])
def payment_list(request):
    if request.method == 'GET':
        payments = Payments.objects.all()
        serializer = PaymentsSerializer(payments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = PaymentsSerializer(data=request.data)
        if serializer.is_valid():
            payment = serializer.save()
            payment.payment_status = 'Completed'  # Automatically set payment status to Completed
            payment.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET', 'PUT', 'DELETE'])
def payment_detail(request, pk):
    try:
        payment = Payments.objects.get(pk=pk)
    except Payments.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = PaymentsSerializer(payment)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = PaymentsSerializer(payment, data=request.data)
        if serializer.is_valid():
            payment = serializer.save()
            payment.payment_status = 'Completed'  # Automatically set payment status to Completed
            payment.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        payment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
@api_view(['POST'])
def obtain_jwt_token(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
@api_view(['GET', 'POST'])
def tournament_registration_list(request):
    if request.method == 'GET':
        registrations = TournamentRegistration.objects.all()
        serializer = TournamentRegistrationSerializer(registrations, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TournamentRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET', 'PUT', 'DELETE'])
def tournament_registration_detail(request, pk):
    try:
        registration = TournamentRegistration.objects.get(pk=pk)
    except TournamentRegistration.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = TournamentRegistrationSerializer(registration)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = TournamentRegistrationSerializer(registration, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        registration.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
from .models import Contact
from .serializers import ContactSerializer
@api_view(['POST'])
def submit_contact_form(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Message delivered successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Payments
from .serializers import PaymentsSerializer

@api_view(['POST'])
def verify_payment(request):
    student_id = request.data.get('student_id')
    name = request.data.get('name')
    course = request.data.get('course')

    try:
        payment = Payments.objects.get(student_id=student_id, name=name, course=course)
        if payment.payment_status == 'Completed':
            return Response({"status": "success", "message": "Access granted to the learning module."}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "pending", "message": "Payment is pending. Please complete the payment to access the learning module."}, status=status.HTTP_403_FORBIDDEN)
    except Payments.DoesNotExist:
        return Response({"status": "error", "message": "Wrong course selected or payment not found."}, status=status.HTTP_404_NOT_FOUND)