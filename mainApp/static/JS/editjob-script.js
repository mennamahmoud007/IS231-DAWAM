// ============================================
//              Edit-Job Page
// ============================================

const editjobForm = document.getElementById("editjobForm")

if (editjobForm) {

    // Get job ID from URL
    let urlParams = new URLSearchParams(window.location.search);
    let jobId = parseInt(urlParams.get("id"));

    // Get jobs from localStorage
    let Jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    // Find the job to edit
    let jobToEdit = Jobs.find(job => job.id === jobId);

    if (jobToEdit) {

        // Pre-fill form with existing job data
        document.getElementById("job-title").value = jobToEdit.title || "";
        document.getElementById("job-schedule").value = jobToEdit.schedule.toLowerCase() || "";
        document.getElementById("category").value = jobToEdit.category || "";
        document.getElementById("status").value = jobToEdit.status || "";
        document.getElementById("applications").value = jobToEdit.applications || 0;
        document.getElementById("job-description").value = jobToEdit.description || "";
        document.getElementById("job-salary").value = jobToEdit.salary || "";
        document.getElementById("education").value = jobToEdit.education || "";
        document.getElementById("experience").value = jobToEdit.experience || "";
        document.getElementById("gender").value = jobToEdit.gender || "";
        document.getElementById("tech-skills").value = jobToEdit.techSkills || "";
        document.getElementById("soft-skills").value = jobToEdit.softSkills || "";
        document.getElementById("benefits").value = jobToEdit.benefits || "";
        document.getElementById("company-name").value = jobToEdit.company || "";
        document.getElementById("industry").value = jobToEdit.industry || "";
        document.getElementById("company-size").value = jobToEdit.companySize || "";
        document.getElementById("location").value = jobToEdit.location || "";
        document.getElementById("company-location").value = jobToEdit.companyLocation || "";
        document.getElementById("creator").value = jobToEdit.creator || "";
    }
    
    // Handle form submission
    editjobForm.addEventListener("submit", function (e) {

        e.preventDefault();

        // Update job object with new values from form
        jobToEdit.title = document.getElementById("job-title").value.trim();
        jobToEdit.schedule = document.getElementById("job-schedule").value;
        jobToEdit.category = document.getElementById("category").value.trim();
        jobToEdit.status = document.getElementById("status").value;
        jobToEdit.applications = parseInt(document.getElementById("applications").value.trim()) || 0;
        jobToEdit.description = document.getElementById("job-description").value.trim();
        jobToEdit.salary = document.getElementById("job-salary").value.trim();
        jobToEdit.education = document.getElementById("education").value;
        jobToEdit.experience = document.getElementById("experience").value;
        jobToEdit.gender = document.getElementById("gender").value;
        jobToEdit.techSkills = document.getElementById("tech-skills").value.trim();
        jobToEdit.softSkills = document.getElementById("soft-skills").value.trim();
        jobToEdit.benefits = document.getElementById("benefits").value.trim();
        jobToEdit.company = document.getElementById("company-name").value.trim();
        jobToEdit.industry = document.getElementById("industry").value.trim();
        jobToEdit.companySize = document.getElementById("company-size").value.trim();
        jobToEdit.location = document.getElementById("location").value.trim();
        jobToEdit.companyLocation = document.getElementById("company-location").value.trim();
        jobToEdit.creator = document.getElementById("creator").value.trim(); 

        // Update the job in the array 
        Jobs = Jobs.map(j => j.id === jobId ? jobToEdit : j);

        // Save updated jobs array back to localStorage
        localStorage.setItem("jobs", JSON.stringify(Jobs));

        // Show success message
        const successMessage = document.getElementById("editjobSuccess");
        successMessage.textContent = "Job updated successfully!";
        successMessage.style.display = "block";

        // Redirect back to dashboard after a short delay
        setTimeout(() => {
            successMessage.style.display = "none";
            window.location.href = "dashboard.html";
        }, 2000);

    });

}