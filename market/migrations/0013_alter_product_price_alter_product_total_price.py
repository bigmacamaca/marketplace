# Generated by Django 4.1.5 on 2023-02-07 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0012_product_cart_quantity_product_total_price_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=6),
        ),
        migrations.AlterField(
            model_name='product',
            name='total_price',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=6),
        ),
    ]
