# Generated by Django 4.1.3 on 2022-11-13 01:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_advertisement_image_description_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='advertisement',
            old_name='final_image_path',
            new_name='processed_image_file_name',
        ),
        migrations.RenameField(
            model_name='advertisement',
            old_name='original_image_path',
            new_name='raw_image_file_name',
        ),
        migrations.RenameField(
            model_name='advertisement',
            old_name='slogan_text',
            new_name='slogan',
        ),
    ]