# Generated by Django 3.1.2 on 2020-11-03 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0003_auto_20201103_1456'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='image_url',
            field=models.CharField(default=None, max_length=3000),
        ),
        migrations.AlterField(
            model_name='listing',
            name='category',
            field=models.CharField(default=None, max_length=64),
        ),
    ]
