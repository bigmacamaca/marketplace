from django.shortcuts import render
from django.views.generic.base import TemplateView

class CartView(TemplateView):
    template_name = "cart/view_cart.html"

class DeleteCartProductView(TemplateView):
    template_name = "cart/delete_cart_product.html"
