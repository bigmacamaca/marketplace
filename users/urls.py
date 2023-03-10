from django.urls import path
from users import views
from users import apis

app_name = "users"

urlpatterns = [
    path("api/registerUser/", apis.UsersViewSet.as_view({'post':'RegisterUser'})),
    path('api/loginUser/', apis.UsersViewSet.as_view({'post':'user_login'})),
    path('api/logout/', apis.UsersViewSet.as_view({'post':'user_logout'})),
    path('api/change_pass/', apis.UsersViewSet.as_view({'post':'change_pass'})),
    
    path('api/get_UserObject/<int:user_id>/', apis.LoggedUserViewSet.as_view({'get':'get_UserObject'})),
    path('api/get_userDetails/<int:user_id>/', apis.LoggedUserViewSet.as_view({'get':'get_userDetails'})),
    path('api/update_user/<int:user_id>/', apis.LoggedUserViewSet.as_view({'post':'update_profile'})),


    #Views urls
    path('home/', views.HomeView.as_view(), name="home"),
    path('register/', views.RegisterUserView.as_view(), name="register-user"),
    path('update-profile/<int:user_id>/', views.UpdateProfileView.as_view(), name="update-profile"),
    path('login/', views.LoginView.as_view(), name="login"),
    path('change-password/', views.ChangePasswordView.as_view(), name="change-password"),
    path('profile/<int:user_id>/', views.ProfileView.as_view(), name="profile"),
]