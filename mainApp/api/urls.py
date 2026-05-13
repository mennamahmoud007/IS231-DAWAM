from rest_framework.routers import DefaultRouter
from .views import UserViewSet, JobViewSet, ApplicationViewSet
from django.urls import path
from .signUpView import SignUpView
from .logInView import LogInView

router = DefaultRouter()
router.register('profiles', UserViewSet)
router.register('jobs', JobViewSet)
router.register('applications', ApplicationViewSet)

urlpatterns = router.urls + [
    path('signup/', SignUpView.as_view(), name='api-signup'),
    path('login/', LogInView.as_view(), name='api-login'),
]
