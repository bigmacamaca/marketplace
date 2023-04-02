from django.db import models
from users.models import CustomUser
from market.models import Product
from cart.models import Cart
from django.core.validators import MinValueValidator

class Transaction(models.Model):
    number_identifier = models.IntegerField(default = 0)
    transaction_item = models.ForeignKey(Cart, related_name = "transaction_item", on_delete = models.CASCADE, blank=True, null=True)
    transaction_buyer = models.ForeignKey(CustomUser, on_delete = models.CASCADE, blank=True, null=True)
    transaction_quantity = models.IntegerField(default=0)
    subtotal = models.DecimalField(max_digits=8, decimal_places=2, validators=[MinValueValidator(1)], null = True, default=0.00)
    checkout_date = models.DateTimeField(auto_now_add=True)

    # cart_items = models.ManyToManyField(Cart, through='TransactionProduct')

    # def __str__(self):
    #     return str(self.transction_item)

    # def save(self, *args, **kwargs):
    #     if not self.pk:  # If the object is being created
    #         count = Transaction.objects.count()
    #         self.number_identifier = count + 1
    #     super().save(*args, **kwargs)

    class Meta:
        ordering = ['checkout_date']

# class TransactionProduct(models.Model):
#     transaction = models.ForeignKey(Transaction, on_delete = models.CASCADE)
#     cart = models.ForeignKey(Cart, on_delete = models.CASCADE)
#     quantity = models.IntegerField(default = 0)
#     subtotal = models.FloatField(null = True, default=0.00) 


# Create your models here.
