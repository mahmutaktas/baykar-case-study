# Generated by Django 4.2.4 on 2023-08-25 11:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('iha', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='RentedIHA',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='updated at')),
                ('renting_start_date', models.DateTimeField()),
                ('renting_end_date', models.DateTimeField()),
                ('iha', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='iha.iha')),
                ('renter_user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
