from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.db.models import Q
import secrets
import string
from .serializers import (
    UserSerializer, UserCreateSerializer, UserUpdateSerializer,
    LoginSerializer, PasswordChangeSerializer, PasswordResetSerializer,
    PasswordResetConfirmSerializer, CustomTokenObtainPairSerializer
)

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    """Custom token obtain view with additional user data"""
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = getattr(serializer, 'user', None)
            if user is None:
                return Response({'detail': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Generate tokens using the custom serializer
            refresh = serializer.validated_data['refresh']
            access = serializer.validated_data['access']
            
            # Update last login
            user.save()
            
            return Response({
                'user': UserSerializer(user).data,
                'access_token': str(access),
                'refresh_token': str(refresh),
                'token_type': 'Bearer'
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(generics.CreateAPIView):
    """User registration view"""
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Generate tokens for auto-login
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            
            return Response({
                'user': UserSerializer(user).data,
                'access_token': access_token,
                'refresh_token': refresh_token,
                'token_type': 'Bearer',
                'message': 'User registered successfully'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileView(generics.RetrieveUpdateAPIView):
    """User profile view and update"""
    serializer_class = UserUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
    def get(self, request, *args, **kwargs):
        """Get user profile"""
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    def patch(self, request, *args, **kwargs):
        """Update user profile"""
        return super().patch(request, *args, **kwargs)

class PasswordChangeView(generics.UpdateAPIView):
    """Password change view"""
    serializer_class = PasswordChangeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def update(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            # Check current password
            if not user.check_password(serializer.validated_data['current_password']):
                return Response({'current_password': ['Current password is incorrect']}, 
                              status=status.HTTP_400_BAD_REQUEST)
            
            # Set new password
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            
            return Response({'message': 'Password changed successfully'})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetView(generics.GenericAPIView):
    """Password reset request view"""
    serializer_class = PasswordResetSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email, is_active=True)
                # Here you would typically send a password reset email
                # For now, we'll just return a success message
                return Response({
                    'message': 'Password reset email sent successfully'
                })
            except User.DoesNotExist:
                # Don't reveal if user exists or not
                return Response({
                    'message': 'Password reset email sent successfully'
                })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmView(generics.GenericAPIView):
    """Password reset confirmation view"""
    serializer_class = PasswordResetConfirmSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Here you would typically verify the token and reset the password
            # For now, we'll just return a success message
            return Response({
                'message': 'Password reset successfully'
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout_view(request):
    """Logout view - blacklist refresh token"""
    try:
        refresh_token = request.data.get('refresh_token')
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
        return Response({'message': 'Logged out successfully'})
    except Exception:
        return Response({'message': 'Logged out successfully'})

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_info(request):
    """Get current user information"""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

def generate_random_password(length=12):
    """Generate a random password"""
    alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
    password = ''.join(secrets.choice(alphabet) for i in range(length))
    return password

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_users_without_accounts(request):
    """Get students, teachers, and employees who don't have user accounts yet"""
    from student.models import Student
    from teacher.models import Teacher
    from employee.models import Employee
    
    # Get all existing user emails
    existing_emails = set(User.objects.values_list('email', flat=True))
    
    # Get students without accounts (email is not null and not in existing emails)
    students_without_accounts = Student.objects.filter(
        email__isnull=False
    ).exclude(email__in=existing_emails).values(
        's_id', 'name', 'email', 'student_number'
    )[:50]  # Limit to 50 for performance
    
    # Get teachers without accounts - need to join with employee table
    teachers_without_accounts = Teacher.objects.filter(
        teacher_id__email__isnull=False
    ).exclude(teacher_id__email__in=existing_emails).values(
        'teacher_id__emp_id', 'teacher_id__name', 'teacher_id__email', 'teacher_id__emp_id'
    )[:50]
    
    # Get employees without accounts
    employees_without_accounts = Employee.objects.filter(
        email__isnull=False
    ).exclude(email__in=existing_emails).values(
        'emp_id', 'name', 'email', 'emp_id'
    )[:50]
    
    # Transform the data to match frontend expectations
    students_data = []
    for student in students_without_accounts:
        students_data.append({
            'id': student['s_id'],  # Keep as UUID, frontend will handle conversion
            'name': student['name'],
            'email': student['email'],
            'identifier': student['student_number']
        })
    
    teachers_data = []
    for teacher in teachers_without_accounts:
        teachers_data.append({
            'id': teacher['teacher_id__emp_id'],  # Keep as integer
            'name': teacher['teacher_id__name'],
            'email': teacher['teacher_id__email'],
            'identifier': str(teacher['teacher_id__emp_id'])
        })
    
    employees_data = []
    for employee in employees_without_accounts:
        employees_data.append({
            'id': employee['emp_id'],  # Keep as integer
            'name': employee['name'],
            'email': employee['email'],
            'identifier': str(employee['emp_id'])
        })
    
    return Response({
        'students': students_data,
        'teachers': teachers_data,
        'employees': employees_data
    })

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_account_for_profile(request):
    """Create user account for existing student/teacher/employee"""
    profile_type = request.data.get('profile_type')  # 'student', 'teacher', 'employee'
    profile_id = request.data.get('profile_id')
    role = request.data.get('role')  # 'student', 'teacher', 'staff'
    
    if not all([profile_type, profile_id, role]):
        return Response({
            'error': 'Missing required fields: profile_type, profile_id, role'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Get the profile record
        if profile_type == 'student':
            from student.models import Student
            # Handle both UUID string and UUID object
            if isinstance(profile_id, str):
                profile = Student.objects.get(s_id=profile_id)
            else:
                profile = Student.objects.get(s_id=profile_id)
            email = profile.email
            name = profile.name
        elif profile_type == 'teacher':
            from teacher.models import Teacher
            profile = Teacher.objects.get(teacher_id__emp_id=profile_id)
            email = profile.teacher_id.email
            name = profile.teacher_id.name
        elif profile_type == 'employee':
            from employee.models import Employee
            profile = Employee.objects.get(emp_id=profile_id)
            email = profile.email
            name = profile.name
        else:
            return Response({
                'error': 'Invalid profile_type'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if not email:
            return Response({
                'error': f'{profile_type.title()} does not have an email address'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user already exists
        if User.objects.filter(email=email).exists():
            return Response({
                'error': 'User account already exists for this email'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Generate random password
        password = generate_random_password()
        
        # Create user account
        user = User.objects.create_user(
            email=email,
            username=email,  # Use email as username
            first_name=name.split(' ')[0] if name else '',
            last_name=' '.join(name.split(' ')[1:]) if name and len(name.split(' ')) > 1 else '',
            role=role,
            password=password
        )
        
        return Response({
            'message': 'Account created successfully',
            'user': UserSerializer(user).data,
            'generated_password': password,
            'profile_type': profile_type,
            'profile_id': profile_id
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({
            'error': f'Failed to create account: {str(e)}'
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def list_user_accounts(request):
    """List all user accounts with their roles"""
    users = User.objects.all().order_by('-date_joined')
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def reset_user_password(request):
    """Reset password for a user account"""
    user_id = request.data.get('user_id')
    if not user_id:
        return Response({
            'error': 'user_id is required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(id=user_id)
        new_password = generate_random_password()
        user.set_password(new_password)
        user.save()
        
        return Response({
            'message': 'Password reset successfully',
            'new_password': new_password,
            'user': UserSerializer(user).data
        })
    except User.DoesNotExist:
        return Response({
            'error': 'User not found'
        }, status=status.HTTP_404_NOT_FOUND)

