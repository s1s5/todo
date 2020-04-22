from django.db import models

import architect

# https://architect.readthedocs.io/features/partition/postgresql.html
@architect.install('partition', type='range', subtype='integer',
                   constraint='100', column='id')
class Author(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)

    def __str__(self):
        return '{} {}'.format(self.first_name, self.last_name)


@architect.install('partition', type='range', subtype='integer',
                   constraint='100', column='author_id')
class Book(models.Model):
    name = models.CharField(max_length=150)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    abstract = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


@architect.install('partition', type='range', subtype='integer',
                   constraint='100', column='id')
class Shop(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return '{}'.format(self.name)


# One of the Limitations of partitions is that you can't have foreign keys pointing to them.
class Staff(models.Model):
    name = models.CharField(max_length=50)


class DiaryNaive(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    date = models.DateField()
    title = models.CharField(max_length=50)

    class Meta:
        ordering = ['-date', '-staff_id']


class DiaryWithIndex(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    date = models.DateField()
    title = models.CharField(max_length=50)

    class Meta:
        ordering = ['-date', '-staff_id']
        indexes = (
            models.Index(fields=('staff', )),
            models.Index(fields=('date', )),
            models.Index(fields=('staff', 'date')),
        )


@architect.install('partition', type='range', subtype='integer',
                   constraint='10', column='staff_id')
class DiaryPartition(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    date = models.DateField()
    title = models.CharField(max_length=50)

    class Meta:
        ordering = ['-date', '-staff_id']
        indexes = (
            models.Index(fields=('staff', )),
            models.Index(fields=('date', )),
            models.Index(fields=('staff', 'date')),
        )


@architect.install('partition', type='range', subtype='date',
                   constraint='month', column='date')
class DiaryPartitionDate(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    date = models.DateField()
    title = models.CharField(max_length=50)

    class Meta:
        ordering = ['-date', '-staff_id']
        indexes = (
            models.Index(fields=('staff', )),
            models.Index(fields=('date', )),
            models.Index(fields=('staff', 'date')),
        )
