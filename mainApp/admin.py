from django.contrib import admin
from .models import Job, Application, CustomUser

admin.site.register(Job)
admin.site.register(Application)
admin.site.register(CustomUser)