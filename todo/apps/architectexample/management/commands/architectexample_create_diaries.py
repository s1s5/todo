import datetime
from django.core.management.base import BaseCommand

from ... import models


class Command(BaseCommand):
    def handle(self, *args, **options):
        klass_list = [
            models.DiaryNaive,
            models.DiaryWithIndex,
            models.DiaryPartition,
            models.DiaryPartitionDate,
        ]

        num_staffs = 5000
        if models.Staff.objects.all().count() < num_staffs:
            staffs = []
            for i in range(num_staffs - models.Staff.objects.all().count()):
                staffs.append(models.Staff(name='name{}'.format(i)))
            models.Staff.objects.bulk_create(staffs)

        staffs = list(models.Staff.objects.all())

        for klass in klass_list:
            for i in range(40):
                cur_date = datetime.date(1980 + i, 1, 1)
                for j in range(365):
                    cur_date += datetime.timedelta(days=1)

                    diaries = []
                    for k in staffs:
                        diaries.append(klass(staff=k, date=cur_date, title='{}_{}'.format(k, cur_date)))
                    klass.objects.bulk_create(diaries)
