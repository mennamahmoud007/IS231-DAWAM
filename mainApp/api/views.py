from rest_framework import viewsets
from ..models import CustomUser, Job, Application
from .serializers import UserSerializer, JobDetailSerializer, JobListSerializer, ApplicationSerializer
from django.shortcuts import render


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class JobViewSet(viewsets.ModelViewSet):

    def get_queryset(self):
        queryset = Job.objects.all()

        is_mine = self.request.query_params.get('filter') == 'mine'

        if is_mine:
            if self.request.user.is_authenticated:
                queryset = queryset.filter(creator=self.request.user)
            else:
                return Job.objects.none()

        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)

        return queryset

    def get_serializer_class(self):
        if self.action == 'list':      # /api/jobs/
            return JobListSerializer
        return JobDetailSerializer
    
    def perform_create(self, serializer):
        # Automatically set the creator to the logged-in user when creating a job
        serializer.save(creator=self.request.user)

    def perform_update(self, serializer):
        # Keep the original creator on edit
        serializer.save(creator=self.get_object().creator)

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user) # Automatically set the applicant to the logged-in user when creating an application

