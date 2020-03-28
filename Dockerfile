FROM python:3

WORKDIR /usr/src/app

RUN pip install --upgrade pip

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY manage.py ./
COPY todo ./todo

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
