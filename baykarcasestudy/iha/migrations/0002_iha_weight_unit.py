# Generated by Django 4.2.4 on 2023-08-24 21:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('iha', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='iha',
            name='weight_unit',
            field=models.PositiveSmallIntegerField(blank=True, choices=[(1, 'KG'), (2, 'TON')], null=True),
        ),
    ]