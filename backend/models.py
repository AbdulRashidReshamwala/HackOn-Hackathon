import datetime
import re
import config
from mongoengine import connect, Document, StringField, DateTimeField, IntField, EmailField, DictField

connect(config.database_name)

name_ragex = re.compile(r'^([a-zA-Z]+\s)*[a-zA-Z]+$')


class User(Document):
    name = StringField(regex=name_ragex, required=True, max_length=120)
    email = EmailField(unique=True)
    join_date = DateTimeField(default=datetime.datetime.now)
    password = StringField(required=True)
    data = DictField(required=True)
    publickey = StringField(required=True, unique=True)
    type = StringField(required=True)


class Report(Document):
    filename = StringField(required=True, max_length=120)
    user = StringField(required=True, max_length=120)
    join_date = DateTimeField(default=datetime.datetime.now)
    data = StringField(required=True)
    drugs = DictField()
    disease = DictField(required=True)
# class Doctor(Document):
#     name = StringField(regex=name_ragex, required=True, max_length=120)
#     email = EmailField(unique=True)
#     join_date = DateTimeField(default=datetime.datetime.now)
#     password = StringField(required=True)
#     data = DictField(required=True)
#     publickey = StringField(required=True, unique=True)


# User(name='test test', email='test@test.com', password='lol',
#      data={'hello': 'bye'}, publickey='lol').save()
