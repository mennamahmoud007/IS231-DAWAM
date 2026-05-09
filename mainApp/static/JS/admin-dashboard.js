async function loadDashboard() {
    try {
        const response = await fetch('/api/jobs/');
        const allJobs = await response.json();

        const totalJobs = allJobs.length;
        const openJobs = allJobs.filter(j => j.status === "Open").length;
        document.getElementById("stat-total").textContent = totalJobs;
        document.getElementById("stat-open").textContent = openJobs;

        // 3. رسم الكروت (Jobs Grid)
        const jobsGrid = document.querySelector(".jobs-section .jobs-grid");
        jobsGrid.innerHTML = ""; 

        if (allJobs.length === 0) {
            jobsGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <h2>No Jobs Posted Yet</h2>
                    <p>Click the button below to add your first job!</p>
                </div>`;
            return;
        }

        allJobs.forEach((job) => {
            const isOpen = job.status === "Open";
            const statusClass = isOpen ? "open-color" : "closed-color";
            
            const card = document.createElement("div");
            card.classList.add("job-card");
            card.innerHTML = `
                <div class="card-header">
                    <p class="card-title">${job.title}</p>
                </div>
                <p class="card-company">${job.company}</p>
                <div class="card-details">
                    <span class="detail-chip">${job.schedule} | ${job.location}</span>
                    <span class="detail-chip">${job.salary}</span>
                    <span class="detail-chip">${job.experience} yrs</span>
                </div>
                <div class="card-stats">
                    <div class="stat-item">
                        <span class="stat-value">0</span> <span class="stat-label">Applications</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value ${statusClass}">${job.status}</span>
                        <span class="stat-label">Status</span>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="card-actions">
                        <a href="/edit-job/${job.id}/" style="background:var(--deep); padding:7px 14px; border-radius:8px; color:white; text-decoration:none;">Edit</a>
                        <a href="#" class="delete-link" data-id="${job.id}" style="background:#c0392b; padding:7px 14px; border-radius:8px; color:white; text-decoration:none;">Delete</a>
                    </div>
                    <a href="/job-details/${job.id}/" class="btn-view">View Job Details</a>
                </div>
            `;
            jobsGrid.appendChild(card);
        });


        setupDeleteButtons();

    } catch (error) {
        console.error("Error loading dashboard:", error);
    }
}

function setupDeleteButtons() {
    document.querySelectorAll(".delete-link").forEach(btn => {
        btn.onclick = async (e) => {
            e.preventDefault();
            const jobId = e.target.dataset.id;
            if (confirm("Are you sure you want to delete this job?")) {
                const res = await fetch(`/api/jobs/${jobId}/`, { 
                    method: 'DELETE',
                    headers: {
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                });
                if (res.ok) {
                    location.reload();
                } else {
                    alert("Failed to delete job.");
                }
            }
        };
    });
}


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

document.addEventListener("DOMContentLoaded", loadDashboard);