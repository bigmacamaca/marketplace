from django.contrib import admin
from transaction.models import Transaction

class TransactionsAdmin(admin.ModelAdmin):
    pass

admin.site.register(Transaction, TransactionsAdmin)

# Register your models here.
