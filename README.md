# Job Search Website

A full-stack web application built with Django that connects job seekers with company administrators. This platform allows companies to post and manage job listings, while enabling job seekers to browse available opportunities, apply for jobs, and track their application statuses.

## Features

### For Job Seekers
* **User Authentication:** Secure sign-up, login, and logout functionalities.
* **Browse Jobs:** View a list of available job postings with filtering options (both as a guest and a registered user).
* **Job Details:** View comprehensive details about a job, including requirements, tech skills, soft skills, and company information.
* **Apply for Jobs:** Seamlessly apply for jobs directly through the platform.
* **Application Tracking:** A dashboard to monitor all applied jobs, view current application statuses (e.g., 'Under Review', 'Accepted', 'Rejected'), and track the response rate.

### For Company Admins
* **Company Profile:** Manage company details linked to the administrator account.
* **Job Management:** Create, edit, and manage job listings (title, salary, experience, schedule, location, etc.).
* **Application Review:** View all incoming applications for posted jobs and manage their statuses.
* **Admin Dashboard:** An overview of the company's job postings and application metrics.

## Tech Stack

* **Backend Framework:** Django (Python 3.x)
* **Database:** SQLite (Default for Django, can be configured to PostgreSQL/MySQL)
* **Frontend:** HTML, CSS, JavaScript (Integrated within Django Templates)
* **API:** Django REST Framework / JSONResponses for asynchronous API calls (AJAX).

## Project Structure

```text
Job Search Website/
│
├── jobsearch/              # Core Django project directory (Settings, WSGI/ASGI, Core URLs)
├── mainApp/                # Main application directory
│   ├── api/                # API endpoints and serializers for asynchronous actions
│   ├── migrations/         # Database migrations
│   ├── static/             # Static files (CSS, JS, Images)
│   ├── templates/          # HTML templates for rendering views
│   ├── models.py           # Database schema (CustomUser, Job, Application)
│   ├── views.py            # View functions to handle request logic
│   └── urls.py             # App-level URL routing
│
├── manage.py               # Django command-line utility
└── requirements.txt        # Project dependencies
```

## API Endpoints

The project uses a mix of server-rendered templates and API endpoints for dynamic updates.

* `POST /api/my-applications/`: Create a new job application.
* `GET /api/my-applications/`: Fetch a list of applications for the logged-in user, along with statistics.

*(Additional API endpoints for authentication and job management are located under `/api/`)*

## Custom User Model
The project uses a `CustomUser` model extending Django's built-in `AbstractUser`.
* `user_type`: Distinguishes between `'job_seeker'` and `'company_admin'`.
* `company_name`: Associated company name for company administrators.
