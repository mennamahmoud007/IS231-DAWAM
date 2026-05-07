async function loadApplications() {
    try {
        const response = await fetch('/api/applications/');
        const data = await response.json();
        if (data.error) {
            document.getElementById("emptyState").style.display = "block";
            document.getElementById("tableContainer").style.display = "none";
            return;
        }
        
        const applications = data.applications;
        const stats = data.stats;
        document.getElementById('total').textContent = stats.total;
        document.getElementById('review').textContent = stats.review;
        document.getElementById('accepted').textContent = stats.accepted;
        document.getElementById('response').textContent = stats.response;
        
        const tbody = document.getElementById('jobsBody');
        if (applications.length === 0) {
            document.getElementById("emptyState").style.display = "block";
            document.getElementById("tableContainer").style.display = "none";
            return;
        }
        document.getElementById("emptyState").style.display = "none";
        document.getElementById("tableContainer").style.display = "table";
        
        tbody.innerHTML = applications.map(app => {
            const badgeClass = app.status === 'Accepted' ? 'accepted' : 
                             app.status === 'Rejected' ? 'rejected' : 
                             app.status === 'Under Review' ? 'review' : 'applied';
            
            return `
                <tr>
                    <td><strong>${app.job__title}</strong></td>
                    <td>${app.job__company}</td>
                    <td>${app.job__location}</td>
                    <td>${new Date(app.date).toLocaleDateString()}</td>
                    <td>
                        <span class="badge ${badgeClass}">
                            ${app.status}
                        </span>
                    </td>
                    <td>
                        <a href="/job-details/${app.id}/" class="view-btn">
                            View Job
                        </a>
                    </td>
                </tr>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error loading applications:', error);
    }
}
document.addEventListener('DOMContentLoaded', loadApplications);
