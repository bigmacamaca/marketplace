from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.contrib.auth.decorators import login_required

class HomeView(TemplateView):
    template_name = "index.html"

    def get(self, request):
        return render(request, self.template_name)

class ListSellerView(TemplateView):
    template_name = "users/view_seller_list.html"

    def get(self, request):
        return render(request, self.template_name)

class LoginView(TemplateView):
    template_name = "users/login.html"

    def get(self, request):
        return render(request, self.template_name)

class ChangePasswordView(TemplateView):
    template_name = "users/change_password.html"

    def get(self, request):
        return render(request, self.template_name)

class UpdateProfileView(TemplateView):
    template_name = "users/update_profile.html"

class ProfileView(TemplateView):
    template_name = "users/profile.html"

class RegisterUserView(TemplateView):
    template_name = "users/register_user.html"

    def get(self, request):
        return render(request, self.template_name)

# Create your views here.
