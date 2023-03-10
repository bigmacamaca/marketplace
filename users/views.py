from django.shortcuts import render
from django.views.generic.base import TemplateView

class HomeView(TemplateView):
    template_name = "index.html"

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

    # def get(self, request):
    #     return render(request, self.template_name)

class ProfileView(TemplateView):
    template_name = "users/profile.html"

    # def get(self, request, *args, **kwargs):
    #     return render(request, self.template_name)

class RegisterUserView(TemplateView):
    template_name = "users/register_user.html"

    def get(self, request):
        return render(request, self.template_name)

# Create your views here.
