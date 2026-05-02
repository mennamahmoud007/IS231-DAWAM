//  Admin Dashboard Page

//Company Name from localStorage to put in thr title 
const user = JSON.parse(localStorage.getItem("currentUser")); // string => object

if (!user) {
    window.location.href = "login.html";
}

const dashboardTitle = document.getElementById("dashboard-title"); //dashboard's title 

if (user && user.type === "company" && user.company) { //if user id company
    dashboardTitle.textContent = user.company + "'s Dashboard";
} else {
    dashboardTitle.textContent = "Welcome to Your Dashboard";
}

// getting Jobs from localStorage 
const allJobs = JSON.parse(localStorage.getItem("jobs")) || [];

// only jobs belong to this company
const companyJobs = user && user.company
    ? allJobs.filter(job => job.company?.toLowerCase() === user.company.toLowerCase())
    : allJobs;

// update Stats 
const totalJobs = companyJobs.length; //no. of jobs for the company
const openJobs = companyJobs.filter(j => j.status && j.status.toLowerCase() === "open").length;
const allApplications = JSON.parse(localStorage.getItem("applications")) || [];
const totalApps = allApplications.filter(app => app.company === user.company).length;
const pendingReview = allApplications.filter(app => app.company === user.company && app.status.toLowerCase() === "under review").length;

//display in the cards
document.getElementById("stat-total").textContent = totalJobs;
document.getElementById("stat-open").textContent = openJobs;
document.getElementById("stat-apps").textContent = totalApps;

//update pending review
const statPending = document.getElementById("stat-pending"); //check if the element exists
if (statPending) statPending.textContent = pendingReview;


//Job Cards
const jobsGrid = document.querySelector(".jobs-section .jobs-grid");

if (jobsGrid) {
    jobsGrid.innerHTML = ""; // clear anything put as default in the cards place
    if (companyJobs.length === 0) { //if empty
        jobsGrid.innerHTML = ` 
            <div class="empty-state" style="grid-column: 1/-1;">
                <h2>No Jobs Posted Yet</h2>
                <p>You haven't posted any jobs yet. Click the button below to add your first job!</p>
            </div>
        `;
    } else {
        companyJobs.forEach(function (job, index) {
            const isOpen = job.status && job.status.toLowerCase() === "open";
            const statusClass = isOpen ? "open-color" : "closed-color"; //if true => open color, if not => close color
            const statusText = isOpen ? "Open" : "Closed"; //if opened write it and ..... .
            const apps = allApplications.filter(app => app.jobId == job.id).length; //dynamic applications

            // ternary => to add value and default if not found
            const typeChip = job.schedule ? job.schedule : "—";
            const locationChip = job.location ? job.location : "—";
            const salaryChip = job.salary ? job.salary : "—";
            const expChip = job.experience ? job.experience + " yrs" : "—";
            const companyLine = job.company ? job.company : "—";
            
            const card = document.createElement("div");
            card.classList.add("job-card"); //adding class for styling => class in css home page

            //adding data to the card
            card.innerHTML = ` 
                <div class="card-header">
                    <p class="card-title">${job.title || "Untitled Job"}</p>
                </div>
                <p class="card-company">${companyLine}</p>
                <div class="card-details">
                    <span class="detail-chip">${typeChip} | ${locationChip}</span>
                    <span class="detail-chip">${salaryChip}</span>
                    <span class="detail-chip">${expChip}</span>
                </div>
                <div class="card-stats">
                    <div class="stat-item">
                        <span class="stat-value">${apps}</span>
                        <span class="stat-label">Applications</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value ${statusClass}">${statusText}</span>
                        <span class="stat-label">Status</span>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="card-actions">
                        <a href="edit-job.html?id=${job.id}" style="background:var(--deep); padding:7px 14px; border-radius:8px;">Edit</a>
                        <a href="#" class="delete-link" style="background:#c0392b; padding:7px 14px; border-radius:8px;" data-index="${index}">Delete</a>
                    </div>
                    <a href="job-details.html?id=${job.id}" class="btn-view">View Job Details</a>
                </div>
            `;

            jobsGrid.appendChild(card); //add card to the page 
        });

        //Delete button
        jobsGrid.addEventListener("click", function (e) {
            if (e.target.classList.contains("delete-link")) { //if the ckicked was delete button
                e.preventDefault();
                const idx = parseInt(e.target.dataset.index); //get index job in the array to delete
                if (confirm("Are you sure you want to delete this job?")) { //pop up confirm
                    const jobToDelete = companyJobs[idx];
                    const updatedJobs = allJobs.filter(j => j.id !== jobToDelete.id); //put in the new array all jobs except the deleted ones
                    localStorage.setItem("jobs", JSON.stringify(updatedJobs)); //store the updated jobs array in ;ocal storage
                    location.reload(); //reloaded automatically
                }
            }
        });
    }
}
