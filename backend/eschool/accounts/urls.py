from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView, RegisterView, ProfileView,
    PasswordChangeView, PasswordResetView, PasswordResetConfirmView,
    logout_view, user_info, get_users_without_accounts, create_account_for_profile,
    list_user_accounts, reset_user_password
)

app_name = 'accounts'

urlpatterns = [
    # Authentication endpoints
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', logout_view, name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # User profile endpoints
    path('profile/', ProfileView.as_view(), name='profile'),
    path('user-info/', user_info, name='user_info'),
    
    # Password management endpoints
    path('change-password/', PasswordChangeView.as_view(), name='change_password'),
    path('password-reset/', PasswordResetView.as_view(), name='password_reset'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    
    # Account management endpoints
    path('users-without-accounts/', get_users_without_accounts, name='users_without_accounts'),
    path('create-account-for-profile/', create_account_for_profile, name='create_account_for_profile'),
    path('list-accounts/', list_user_accounts, name='list_user_accounts'),
    path('reset-password/', reset_user_password, name='reset_user_password'),
]





