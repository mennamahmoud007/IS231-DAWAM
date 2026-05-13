from django.urls import path
from . import views

urlpatterns = [
    path('applied-jobs/', views.applied_jobs, name='applied-jobs'),
    path('api/my-applications/', views.get_applications_api, name='api-applications'),
    #path('api/applications/', views.get_applications_api, name='api-applications'),
    path('browse/', views.browse, name='browse'),
    path('job-details/<int:job_id>/', views.job_details, name='job-details'),
    path('logout/', views.logout_view, name='logout'),
    path('', views.home, name='home'),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('guest-browse/', views.guest_browse, name='guest-browse'),
    path('dashboard/', views.dashboard, name = 'dashboard'),
    path('addjob/', views.addjob, name = 'addjob'),
    path('edit-job/<int:job_id>/', views.editjob, name='edit-job'),
    path('job-detailsAdmin/<int:job_id>/', views.job_detailsAdmin, name='job-detailsAdmin'),
    path('job-applications/', views.job_applications_view, name='job-applications')
]