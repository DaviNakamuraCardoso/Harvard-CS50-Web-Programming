# Generated by Django 3.1.2 on 2020-11-04 17:11

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0010_auto_20201103_2318'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='watchers',
            field=models.ManyToManyField(blank=True, related_name='watchlist', to=settings.AUTH_USER_MODEL),
        ),
    ]
