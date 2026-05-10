from rest_framework import viewsets
from ..models import Profile, Job, Application
from .serializers import UserSerializer, JobDetailSerializer, JobListSerializer, ApplicationSerializer
from django.shortcuts import render


class UserViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = UserSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()

    def get_queryset(self):
        queryset=Job.objects.all()
        category=self.request.query_params.get('category') # reads ? category= from the URL
        if category:
            queryset=queryset.filter(category=category)
        return queryset    

    def get_serializer_class(self):
        if self.action == 'list':      # /api/jobs/
            return JobListSerializer
        return JobDetailSerializer

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user) # Automatically set the applicant to the logged-in user when creating an application

