// Reads ?job=<id> from the URL
const jobId = new URLSearchParams(window.location.search).get('job');

async function loadApplications() {
    if (!jobId) {
        document.getElementById("emptyState").style.display = "block";
        document.getElementById("tableContainer").style.display = "none";
        return;
    }

    try {
        const response = await fetch(`/api/applications/?job=${jobId}`);
        const data = await response.json();
        const applications = data; // DRF returns a plain list here

        // ---- UPDATE STATS ----
        const total = applications.length;
        const review = applications.filter(a => a.status === 'Under Review').length;
        const accepted = applications.filter(a => a.status === 'Accepted').length;
        const rejected = applications.filter(a => a.status === 'Rejected').length;

        document.getElementById('total').textContent = total;
        document.getElementById('review').textContent = review;
        document.getElementById('accepted').textContent = accepted;
        document.getElementById('rejected').textContent = rejected;

        // ---- EMPTY STATE ----
        if (total === 0) {
            document.getElementById("emptyState").style.display = "block";
            document.getElementById("tableContainer").style.display = "none";
            return;
        }

        document.getElementById("emptyState").style.display = "none";
        document.getElementById("tableContainer").style.display = "table";

        // ---- RENDER ROWS ----
        const tbody = document.getElementById('applicationsBody');
        tbody.innerHTML = applications.map(app => {
            const badgeClass = app.status === 'Accepted' ? 'accepted' :
                               app.status === 'Rejected' ? 'rejected' : 'review';

            return `
                <tr id="row-${app.id}">
                    <td><strong>${app.name}</strong></td>
                    <td>
                        <span>${app.email}</span><br>
                        <span>${app.phone}</span>
                    </td>
                    <td>${app.schedule}</td>
                    <td>${new Date(app.date).toLocaleDateString()}</td>
                    <td>
                        <span class="badge ${badgeClass}" id="badge-${app.id}">
                            ${app.status}
                        </span>
                    </td>

                    <!-- *** ACCEPT / REJECT BUTTONS ARE HERE *** -->
                    <td>
                        <button onclick="updateStatus(${app.id}, 'Accepted')"
                            style="background:#1a6b3c; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer; margin-right:4px;">
                            Accept
                        </button>
                        <button onclick="updateStatus(${app.id}, 'Rejected')"
                            style="background:#c0392b; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer;">
                            Reject
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

    } catch (error) {
        console.error('Error loading applications:', error);
    }
}

// ---- THIS FUNCTION HANDLES ACCEPT / REJECT ----
async function updateStatus(appId, newStatus) {
    try {
        const response = await fetch(`/api/applications/${appId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ status: newStatus })
        });

        if (response.ok) {
            // Update the badge in the row without reloading the whole page
            const badge = document.getElementById(`badge-${appId}`);
            badge.textContent = newStatus;
            badge.className = `badge ${newStatus === 'Accepted' ? 'accepted' : 'rejected'}`;
        } else {
            alert('Failed to update status.');
        }
    } catch (error) {
        console.error('Error updating status:', error);
    }
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

document.addEventListener('DOMContentLoaded', loadApplications);