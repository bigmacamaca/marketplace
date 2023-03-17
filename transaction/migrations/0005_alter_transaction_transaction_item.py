# Generated by Django 4.1.5 on 2023-03-16 15:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0008_cart_is_sold'),
        ('transaction', '0004_alter_transaction_transaction_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='transaction_item',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='trsItem', to='cart.cart'),
        ),
    ]
