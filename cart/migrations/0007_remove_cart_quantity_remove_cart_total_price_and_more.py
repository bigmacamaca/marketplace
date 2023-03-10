# Generated by Django 4.1.5 on 2023-02-09 16:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('market', '0020_remove_product_cart_quantity_and_more'),
        ('cart', '0006_remove_cart_buyer_cart_cart_quantity_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='quantity',
        ),
        migrations.RemoveField(
            model_name='cart',
            name='total_price',
        ),
        migrations.RemoveField(
            model_name='cart',
            name='user_cart',
        ),
        migrations.AddField(
            model_name='cart',
            name='buyer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='buyer', to=settings.AUTH_USER_MODEL),
        ),
        migrations.RemoveField(
            model_name='cart',
            name='product',
        ),
        migrations.AddField(
            model_name='cart',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product', to='market.product'),
        ),
    ]
