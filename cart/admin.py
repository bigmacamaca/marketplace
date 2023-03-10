from django.contrib import admin
from cart.models import Cart

class CartAdmin(admin.ModelAdmin):
    list_display = (
                    'id',
                    'buyer',
                    'product',
                    'date_added',
                    'cart_quantity')

admin.site.register(Cart, CartAdmin)
# Register your models here.
