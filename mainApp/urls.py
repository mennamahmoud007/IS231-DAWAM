from django.urls import path
from . import views

urlpatterns = [
    path('applied-jobs/', views.applied_jobs, name='applied-jobs'),
    path('browse/', views.browse, name='browse'),
    path('job-details/<int:job_id>/', views.job_details, name='job-details'),
    path('logout/', views.logout_view, name='logout'),
]