from rest_framework import serializers
from ..models import Job, CustomUser, Application


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class SignUpSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only = True)
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'confirm_password', 'user_type', 'company_name']

        # Validation
    def validate(self, data):
        if CustomUser.objects.filter(email = data['email']).exists():
            raise serializers.ValidationError("email already taken")
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        if(data['user_type'] == 'company_admin' and not data.get('company_name')):
            raise serializers.ValidationError("Company name is required")
        return data
        
        # Create a user
    def create(self, validated_data):
        validated_data.pop('confirm_password') #removed, not stored in DB

        user = CustomUser.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password'],
            user_type = validated_data['user_type'],
            company_name = validated_data.get('company_name', None)
        )
        return user

        

class LogInSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only = True)


class JobListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title', 'company', 'location', 'salary',
                  'experience', 'schedule', 'status']


class JobDetailSerializer(serializers.ModelSerializer):
    creator = serializers.PrimaryKeyRelatedField(read_only=True)  # Show creator's ID in detail view
    class Meta:
        model = Job
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'