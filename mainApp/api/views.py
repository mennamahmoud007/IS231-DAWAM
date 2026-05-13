from rest_framework import viewsets
from ..models import CustomUser, Job, Application
from .serializers import UserSerializer, JobDetailSerializer, JobListSerializer, ApplicationSerializer
from django.shortcuts import render


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()

    def get_queryset(self):
        queryset=Job.objects.all()

         # If the user is a company_admin, show only their jobs on dashboard
        if self.request.query_params.get('mine') == 'true':
            queryset = queryset.filter(creator=self.request.user)

        category=self.request.query_params.get('category') # reads ? category= from the URL
        if category:
            queryset=queryset.filter(category=category)
        return queryset    

    def get_serializer_class(self):
        if self.action == 'list':      # /api/jobs/
            return JobListSerializer
        return JobDetailSerializer
    
    def perform_create(self, serializer):
        # Automatically set the creator to the logged-in user when creating a job
        serializer.save(creator=self.request.user)

    def perform_update(self, serializer):

        # stop other users from editing jobs they don't own
        job = self.get_object()
        if job.creator != self.request.user:
          from rest_framework.exceptions import PermissionDenied
          raise PermissionDenied("You can only edit your own jobs.")
        # Keep the original creator on edit
        serializer.save(creator=self.get_object().creator)

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user) # Automatically set the applicant to the logged-in user when creating an application

