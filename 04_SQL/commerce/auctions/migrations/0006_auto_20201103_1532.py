# Generated by Django 3.1.2 on 2020-11-03 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0005_auto_20201103_1531'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='category',
            field=models.CharField(blank=True, default=None, max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='listing',
            name='image_url',
            field=models.CharField(blank=True, default=None, max_length=3000, null=True),
        ),
    ]
