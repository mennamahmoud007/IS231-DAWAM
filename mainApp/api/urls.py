from rest_framework.routers import DefaultRouter
from .views import UserViewSet, JobViewSet, ApplicationViewSet

router = DefaultRouter()
router.register('profiles', UserViewSet)
router.register('jobs', JobViewSet)
router.register('applications', ApplicationViewSet)

urlpatterns = router.urls