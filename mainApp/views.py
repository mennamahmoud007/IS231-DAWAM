from django.shortcuts import redirect, render
#from django.contrib.auth.decorators import login_required
from .models import Application
from django.http import JsonResponse
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required


#@login_required
def get_applications_api(request): #AJAX API to fetch applications for the logged-in user
    if request.user.is_authenticated:
        applications = Application.objects.filter(applicant=request.user).values(
            'id', 'job__title', 'job__company', 'job__location', 
            'date', 'status', 'job__schedule'
        )
        
        total = len(list(applications))
        all_apps = Application.objects.filter(applicant=request.user)
        review = all_apps.filter(status__icontains="Review").count()
        accepted = all_apps.filter(status="Accepted").count()
        rejected = all_apps.filter(status="Rejected").count()
        
        response_rate = 0
        if total > 0:
            response_rate = round(((accepted + rejected) / total) * 100)
        
        return JsonResponse({
            'applications': list(applications),
            'stats': {
                'total': total,
                'review': review,
                'accepted': accepted,
                'response': response_rate
            }
        })
    return JsonResponse({'error': 'Not authenticated'}, status=401)
def applied_jobs(request):
    return render(request, 'HTMLpages/applied-jobs.html')
def browse(request):
    return render(request, 'HTMLpages/browse.html')
def guest_browse(request):
    return render(request, 'HTMLpages/guestBrowse.html')
def job_details(request, job_id):
    return render(request, 'HTMLpages/job-details.html', {'job_id': job_id})
def logout_view(request):
    logout(request)
    return render(request, 'HTMLpages/home.html')
def home(request):
    return render(request, 'HTMLpages/home.html')
def login(request):
    return render(request, 'HTMLpages/login.html')
def signup(request):
    return render(request, 'HTMLpages/signup.html')

@login_required(login_url='login')  
def dashboard(request):
    company_name = ""
    if hasattr(request.user, 'profile'):
        company_name = request.user.profile.company_name
    return render(request, 'HTMLpages/dashboard.html', {'company_name': company_name})

def addjob(request):
    return render(request, 'HTMLpages/add-job.html')

