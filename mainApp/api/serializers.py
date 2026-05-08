from rest_framework import serializers
from ..models import Job, Profile, Application


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class JobListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title', 'company', 'location', 'salary',
                  'experience', 'schedule', 'status']


class JobDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'