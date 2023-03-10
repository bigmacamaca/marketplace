from django.contrib import admin
from market.models import Product,Review

class ProductsAdmin(admin.ModelAdmin):
    pass

admin.site.register(Product, ProductsAdmin)

class ReviewsAdmin(admin.ModelAdmin):
    pass

admin.site.register(Review, ReviewsAdmin)

# Register your models here.
