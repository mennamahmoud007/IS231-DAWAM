from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    USER_CHOICES = [
        ('job_seeker', 'job_seeker'),
        ('company_admin', 'company_admin'),
    ]
    user_type = models.CharField(max_length=20, choices=USER_CHOICES)
    company_name = models.CharField(max_length=200, blank=True, null=True)

    def __str__ (self):
        return self.username


class Job(models.Model):
    SCHEDULE_CHOICES = [
        ('Full-time', 'Full-time'),
        ('Part-time', 'Part-time'),
        ('Internship', 'Internship'),
    ]
    LOCATION_CHOICES = [
        ('onsite', 'Onsite'),
        ('remote', 'Remote'),
    ]
    STATUS_CHOICES = [
        ('Open', 'Open'),
        ('Closed', 'Closed'),
    ]
    EXPERIENCE_CHOICES = [
        ('0-1', '0-1 years'),
        ('2-4', '2-4 years'),
        ('+4', '+4 years'),
    ]

    title = models.CharField(max_length=100) 
    #applications = models.IntegerField(), count of actual job objects
    company= models.CharField(max_length=100)
    salary = models.CharField(max_length=100)
    experience= models.CharField(max_length=20, choices = EXPERIENCE_CHOICES)
    schedule = models.CharField(max_length=100, choices = SCHEDULE_CHOICES) 
    location = models.CharField(max_length=100, choices = LOCATION_CHOICES)
    status = models.CharField(max_length=100, choices = STATUS_CHOICES)
    #link: "job-details.html",
    category= models.CharField(max_length=100)
    description = models.TextField()
    education = models.CharField(max_length=100)
    gender = models.CharField(max_length=100)
    techSkills = models.TextField()
    softSkills = models.TextField()
    benefits = models.TextField()
    industry = models.CharField(max_length=100)
    companySize = models.CharField(max_length=100)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    companyLocation = models.CharField(max_length=100)

    def __str__ (self):
        return self.title
    
class Application(models.Model):
    STATUS_CHOICES = [
        ('Under Review', 'Under Review'),
        ('Accepted', 'Accepted'),
        ('Rejected', 'Rejected'),
    ]
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    schedule = models.CharField(max_length=100) 
    applicant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.name} applied for {self.job.title}"    