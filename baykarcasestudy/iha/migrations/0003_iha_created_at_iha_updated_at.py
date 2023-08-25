# Generated by Django 4.2.4 on 2023-08-25 11:27

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('iha', '0002_iha_weight_unit'),
    ]

    operations = [
        migrations.AddField(
            model_name='iha',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='created at'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='iha',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, verbose_name='updated at'),
        ),
    ]
