# Generated by Django 3.1.2 on 2020-11-03 14:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='listing',
            old_name='users',
            new_name='user',
        ),
    ]
