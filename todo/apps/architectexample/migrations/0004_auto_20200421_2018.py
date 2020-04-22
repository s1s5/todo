# Generated by Django 3.0.4 on 2020-04-21 11:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('architectexample', '0003_auto_20200421_1543'),
    ]

    operations = [
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='DiaryWithIndex',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('title', models.CharField(max_length=50)),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='architectexample.Staff')),
            ],
        ),
        migrations.CreateModel(
            name='DiaryNaive',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('title', models.CharField(max_length=50)),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='architectexample.Staff')),
            ],
        ),
        migrations.AddIndex(
            model_name='diarywithindex',
            index=models.Index(fields=['staff'], name='architectex_staff_i_cfa764_idx'),
        ),
        migrations.AddIndex(
            model_name='diarywithindex',
            index=models.Index(fields=['date'], name='architectex_date_f2d233_idx'),
        ),
        migrations.AddIndex(
            model_name='diarywithindex',
            index=models.Index(fields=['staff', 'date'], name='architectex_staff_i_f2e76a_idx'),
        ),
    ]
