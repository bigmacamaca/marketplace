from django.contrib import admin
from market.models import Product,Review

class ProductsAdmin(admin.ModelAdmin):
    list_display = (
                    'id',
                    'name',
                    'availability',
                    'quantity',
                    'price',
                    'productType',
                    'description',
                    'added',
                    'seller',)

admin.site.register(Product, ProductsAdmin)

class ReviewsAdmin(admin.ModelAdmin):
    pass

admin.site.register(Review, ReviewsAdmin)

# Register your models here.
