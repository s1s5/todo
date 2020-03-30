FROM python:3

WORKDIR /usr/src/app

RUN pip install --upgrade pip

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

RUN pip freeze | sort

COPY s1s5_graphene-django /opt/graphene-django
WORKDIR /opt/graphene-django
RUN python setup.py install
RUN rm -rf /usr/local/lib/python3.7/site-packages/graphene_django
RUN cp -r /opt/graphene-django/build/lib/graphene_django /usr/local/lib/python3.7/site-packages/graphene_django

WORKDIR /usr/src/app

COPY manage.py ./
COPY todo ./todo

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
