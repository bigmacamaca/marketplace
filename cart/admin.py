from django.contrib import admin
from cart.models import Cart

class CartAdmin(admin.ModelAdmin):
    list_display = (
                    'id',
                    'is_sold',
                    'product',
                    'buyer',
                    'date_added',
                    'cart_quantity')

admin.site.register(Cart, CartAdmin)
# Register your models here.
