from django.shortcuts import render
from django.views.generic.base import TemplateView

class RegisterProductView(TemplateView):
    template_name = "market/register_product.html"

    def get(self, request):
        return render(request, self.template_name)


class ProductDetailsView(TemplateView):
    template_name = "market/productDetails.html"

#     def get(self, request, *args, **kwargs):
#         return render(request, self.template_name)

class WishlistView(TemplateView):
    template_name = "market/wishlist.html"

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

class ModifyProductView(TemplateView):
    template_name = "market/modify_product.html"

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

# class CartView(TemplateView):
#     template_name = "cart/view_cart.html"

#     def get(self, request, *args, **kwargs):
#         return render(request, self.template_name)


# Create your views here.
