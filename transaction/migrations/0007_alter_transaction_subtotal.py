# Generated by Django 4.1.5 on 2023-04-02 16:03

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0006_alter_transaction_transaction_item'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='subtotal',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=8, null=True, validators=[django.core.validators.MinValueValidator(1)]),
        ),
    ]
