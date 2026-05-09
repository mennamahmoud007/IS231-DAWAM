// ============================================
//              Edit-Job Page
// ============================================

// Function to get CSRF 'cross-site-request-forgery' token from cookies (if needed for API calls)
function getCookies(name){
    let cookievalue = null;
    if(document.cookie && document.cookie !== ''){
        for (let c of document.cookie.split(';')){
            c = c.trim();
            if (c.startsWith(name + '=')){
                cookievalue = decodeURIComponent(c.slice(name.length +1));
                break;
            }
        }
    }
    return cookievalue;
}

const editjobForm = document.getElementById("editjobForm");
if (editjobForm) {

    const job_id = window.job_id; // Get job-id passed from Django view context

    // On page load, fetch job details and pre-fill form
    async function loadJob() {
        try {
            const response = await fetch(`/api/jobs/${job_id}/`); // Fetch job details from API
            const job = await response.json();
            if (!response.ok){
                alert('Could not load job. It may not exist.');
                return;
            }
        // Pre-fill form with existing job data
        document.getElementById("job-title").value = job.title || "";
        document.getElementById("job-schedule").value = job.schedule || "";
        document.getElementById("category").value = job.category || "";
        document.getElementById("status").value = job.status || "";
        document.getElementById("job-description").value = job.description || "";
        document.getElementById("job-salary").value = job.salary || "";
        document.getElementById("education").value = job.education || "";
        document.getElementById("experience").value = job.experience || "";
        document.getElementById("gender").value = job.gender || "";
        document.getElementById("tech-skills").value = job.techSkills || "";
        document.getElementById("soft-skills").value = job.softSkills || "";
        document.getElementById("benefits").value = job.benefits || "";
        document.getElementById("company-name").value = job.company || "";
        document.getElementById("industry").value = job.industry || "";
        document.getElementById("company-size").value = job.companySize || "";
        document.getElementById("location").value = job.location || "";
        document.getElementById("company-location").value = job.companyLocation || "";

    } catch (error) {
        console.error('Failed to load job:', error);
    }
}

editjobForm.addEventListener('submit', async function(e){

    e.preventDefault(); // prevent page from refreshing

    const UpdatedJob = {
        // Update job object with new values from form
        title : document.getElementById("job-title").value.trim(),
        schedule : document.getElementById("job-schedule").value,
        category : document.getElementById("category").value.trim(),
        status : document.getElementById("status").value,
        description : document.getElementById("job-description").value.trim(),
        salary : document.getElementById("job-salary").value.trim(),
        education : document.getElementById("education").value,
        experience : document.getElementById("experience").value,
        gender : document.getElementById("gender").value,
        techSkills : document.getElementById("tech-skills").value.trim(),
        softSkills : document.getElementById("soft-skills").value.trim(),
        benefits : document.getElementById("benefits").value.trim(),
        company : document.getElementById("company-name").value.trim(),
        industry : document.getElementById("industry").value.trim(),
        companySize : document.getElementById("company-size").value.trim(),
        location : document.getElementById("location").value.trim(),
        companyLocation : document.getElementById("company-location").value.trim(),  
    };

    try {
        const response = await fetch(`/api/jobs/${job_id}/`, {
            method: 'PUT', // Use PUT method to update existing job
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookies('csrftoken'), // Include CSRF token if required by backend
            },
            body: JSON.stringify(UpdatedJob), // Send updated job data as JSON String
        });
        const data = await response.json();
        const sucessMessage = document.getElementById("editjobSuccess");
        if (response.ok) {
            sucessMessage.textContent = "Job updated successfully! Redirecting to dashboard...";
            sucessMessage.style.display = "block";
            setTimeout(() =>{
                sucessMessage.style.display = "none";
                window.location.href = dashboard_url;
             }, 2000); // Redirect after short delay
        } else {
            sucessMessage.style.color = 'red';
            sucessMessage.textContent = 'Error:' + JSON.stringify(data);
            sucessMessage.style.display = "block";
        }

    } catch (error) {
        console.error(error);
    }
});

    // Load job data when page opens
    loadJob();
}
    