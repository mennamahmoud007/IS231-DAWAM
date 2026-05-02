// ============================================
//              Add-Job Page
// ============================================


const addjobForm = document.getElementById("addjobForm")

if (addjobForm) {


    //for company name auto fill in add form
    const CurrentUser = JSON.parse(localStorage.getItem("currentUser"));
    const companyNameField = document.getElementById("company-name");

    if (CurrentUser && CurrentUser.company && companyNameField) {
        companyNameField.value = CurrentUser.company;
        companyNameField.readOnly = true;//read only to prevent change
    }


    addjobForm.addEventListener("submit", function (e) {


        e.preventDefault();

        let title = document.getElementById("job-title").value.trim();
        let schedule = document.getElementById("job-schedule").value;
        let category = document.getElementById("category").value.trim();
        let status = document.getElementById("status").value;
        let applications = parseInt(document.getElementById("applications").value.trim()) || 0;
        let description = document.getElementById("job-description").value.trim();
        let salary = document.getElementById("job-salary").value.trim();
        let education = document.getElementById("education").value;
        let experience = document.getElementById("experience").value.trim();
        let gender = document.getElementById("gender").value;
        let techSkills = document.getElementById("tech-skills").value.trim();
        let softSkills = document.getElementById("soft-skills").value.trim();
        let benefits = document.getElementById("benefits").value.trim();
        let company = document.getElementById("company-name").value.trim();
        let industry = document.getElementById("industry").value.trim();
        let companySize = document.getElementById("company-size").value.trim();
        let location = document.getElementById("location").value.trim();
        let companyLocation = document.getElementById("company-location").value.trim();
        let creator = document.getElementById("creator").value.trim();

        // Get existing jobs from localStorage or initialize array
        let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

        // Auto-increment job ID based on last job in the array or start at 1 if no jobs exist
        let id = jobs.length > 0 ? jobs[jobs.length - 1].id + 1 : 1;

        let job = {
            id: id,
            title: title,
            applications: 0, // Initialize applications to 0
            schedule: schedule,
            category: category,
            status: status,
            description: description,
            salary: salary,
            education: education,
            experience: experience,
            gender: gender,
            techSkills: techSkills,
            softSkills: softSkills,
            benefits: benefits,
            company: company,
            industry: industry,
            companySize: companySize,
            location: location,
            companyLocation: companyLocation,
            creator: creator, 
        };

        // Add new job to jobs array
        jobs.push(job);

        // Save back to localStorage
        localStorage.setItem("jobs", JSON.stringify(jobs));

        const successMessage = document.getElementById("addjobSuccess");
        successMessage.textContent = "Job added successfully!";
        successMessage.style.display = "block";

        setTimeout(() => {
            successMessage.style.display = "none";
            window.location.href = "dashboard.html";
        }, 2000);
    });
}
