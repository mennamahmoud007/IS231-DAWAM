from rest_framework import viewsets
from ..models import Profile, Job, Application
from .serializers import UserSerializer, JobDetailSerializer, JobListSerializer, ApplicationSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = UserSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':      # /api/jobs/
            return JobListSerializer
        return JobDetailSerializer

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer