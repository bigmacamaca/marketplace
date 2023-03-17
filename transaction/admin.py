from django.contrib import admin
from transaction.models import Transaction

class TransactionsAdmin(admin.ModelAdmin):
    list_display = (
                    'id',
                    'number_identifier',
                    'transaction_item',
                    'transaction_buyer',
                    'transaction_quantity',
                    'subtotal',
                    'checkout_date')

admin.site.register(Transaction, TransactionsAdmin)

# Register your models here.
