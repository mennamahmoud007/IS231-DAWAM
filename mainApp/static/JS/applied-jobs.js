// ============================================
//              Applied Jobs Page
// ============================================
let applications = JSON.parse(localStorage.getItem("applications")) || [];
let tbody = document.getElementById("jobsBody");

function renderApplications() {
    let emptyState = document.getElementById("emptyState");
    let tableContainer = document.getElementById("tableContainer");

    if (applications.length === 0) {
        emptyState.style.display = "block";
        tableContainer.style.display = "none";
    } else {
        emptyState.style.display = "none";
        tableContainer.style.display = "block";
       let rowsHtml = ""; 
        applications.forEach(app => {
            rowsHtml += `
                <tr>
                    <td>
                        <strong>${app.title || 'Untitled Job'}</strong>
                        <p class="schedule">${app.schedule || 'Full-time'}</p>
                    </td>
                    <td>${app.company || 'Unknown Company'}</td>
                    <td>${app.location || 'Not Specified'}</td>
                    <td>${app.date || 'Not Specified'}</td>
                    <td>
                        <span class="badge ${getStatusClass(app.status)}">
                            ${app.status || 'Applied'}
                        </span>
                    </td>
                    <td>
                        <a href="job-details.html?id=${app.jobId}" class="view-btn">
                            View Job
                        </a>
                    </td>
                </tr>
            `;
        });
        tbody.innerHTML = rowsHtml; 
    }
}

function getStatusClass(status) {
    if (!status) return "applied";
    let s = status.toLowerCase(); 
    if (s === "accepted") return "accepted";
    if (s === "rejected") return "rejected";
    if (s === "under review") return "review";
    return "applied";
}
function updateStats() {

    let total = applications.length;

    let review = applications.filter(app => app.status.toLowerCase().includes("review")).length;
    let accepted = applications.filter(app => app.status.toLowerCase() === "accepted").length;
    let rejected = applications.filter(app => app.status.toLowerCase() === "rejected").length;

    let responseRate = total > 0 ? Math.round(((accepted + rejected) / total) * 100) : 0;

    if(document.getElementById("total")) document.getElementById("total").textContent = total;
    if(document.getElementById("review")) document.getElementById("review").textContent = review;
    if(document.getElementById("accepted")) document.getElementById("accepted").textContent = accepted;
    if(document.getElementById("response")) document.getElementById("response").textContent = responseRate + "%";
    
}

renderApplications();
updateStats();
