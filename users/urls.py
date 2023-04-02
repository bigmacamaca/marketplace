from django.urls import path
from users import views
from users import apis
from django.contrib.auth.decorators import login_required

app_name = "users"

urlpatterns = [
    path("api/registerUser/", apis.UsersViewSet.as_view({'post':'RegisterUser'})),
    path('api/loginUser/', apis.UsersViewSet.as_view({'post':'user_login'})),
    path("api/list_sellers/", apis.UsersViewSet.as_view({'get':'get_userList'})),
    path('api/get_userDetails/<int:user_id>/', apis.UsersViewSet.as_view({'get':'get_userDetails'})),
    
    path('api/logout/', apis.LoggedUserViewSet.as_view({'post':'user_logout'})),
    path('api/change_pass/', apis.LoggedUserViewSet.as_view({'post':'change_pass'})),
    path('api/get_UserObject/<int:user_id>/', apis.LoggedUserViewSet.as_view({'get':'get_UserObject'})),
    path('api/update_user/<int:user_id>/', apis.LoggedUserViewSet.as_view({'post':'update_profile'})),

    #Views urls
    path('home/', views.HomeView.as_view(), name="home"),
    path('seller-list/', views.ListSellerView.as_view(), name="seller-list"),
    path('register/', views.RegisterUserView.as_view(), name="register-user"),
    path('update-profile/<int:user_id>/', login_required(views.UpdateProfileView.as_view()), name="update-profile"),
    path('login/', views.LoginView.as_view(), name="login"),
    path('change-password/', views.ChangePasswordView.as_view(), name="change-password"),
    path('profile/<int:user_id>/', views.ProfileView.as_view(), name="profile"),
]