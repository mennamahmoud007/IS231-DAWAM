from django.shortcuts import render
#from django.contrib.auth.decorators import login_required
from .models import Application

#@login_required
def applied_jobs(request):
    if request.user.is_authenticated:
        applications = Application.objects.filter(applicant=request.user)
    else:
        applications = Application.objects.none()

    total = applications.count()
    review = applications.filter(status__icontains="Review").count()
    accepted = applications.filter(status="Accepted").count()
    rejected = applications.filter(status="Rejected").count()

    response_rate = 0
    if total > 0:
        response_rate = round(((accepted + rejected) / total) * 100)

    return render(request, 'HTMLpages/applied-jobs.html', {
        'applications': applications,
        'total': total,
        'review': review,
        'accepted': accepted,
        'response': response_rate,
    })

