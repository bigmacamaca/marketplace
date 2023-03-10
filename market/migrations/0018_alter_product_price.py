# Generated by Django 4.1.5 on 2023-02-07 18:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0017_product_price_product_total_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=5),
        ),
    ]
