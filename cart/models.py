from django.db import models
from users.models import CustomUser
from market.models import Product

class Cart(models.Model):
    product = models.ForeignKey(Product, related_name ="product", on_delete = models.CASCADE, blank=True, null=True)
    buyer = models.ForeignKey(CustomUser, related_name="buyer", on_delete = models.CASCADE, blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)
    # total_price = models.FloatField(null = True, default=0.00)
    cart_quantity = models.IntegerField(default=0)
    
    def __str__(self):
        return str(self.product)

    class Meta:
        ordering = ['date_added']

# class CartItem(models.Model):
#     cart = models.ForeignKey(Cart, on_delete = models.CASCADE, blank=True, null = True)
#     product = models.ManyToManyField(Product, related_name ="product", blank=True)
#     date_added = models.DateTimeField(auto_now_add=True)
#     quantity = models.CharField(max_length=250)

#     def total_price(self):
#         return self.totalPrice

#     class Meta:
#         ordering = ['date_added']    

# Create your models here.
