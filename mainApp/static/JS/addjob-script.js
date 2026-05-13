// ============================================
//              Add-Job Page
// ============================================

// Function to get CSRF token
function getCSRFToken() {
    // First try to get from cookie
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, 10) === 'csrftoken=') {
                cookieValue = decodeURIComponent(cookie.substring(10));
                break;
            }
        }
    }
    
    // If not found in cookie, try to get from the form's hidden input
    if (!cookieValue) {
        const csrfInput = document.querySelector('[name=csrfmiddlewaretoken]');
        if (csrfInput) {
            cookieValue = csrfInput.value;
        }
    }
    
    return cookieValue;
}

const addjobForm = document.getElementById("addjobForm");

if (addjobForm) {
    // For company name auto fill in add form
    const companyNameField = document.getElementById("company-name");
    if (window.company_name && companyNameField && window.company_name !== 'None') {
        companyNameField.value = window.company_name;
        companyNameField.readOnly = true;
        companyNameField.style.backgroundColor = '#f5f5f5';
    }

    addjobForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        
        // Show loading state
        const submitButton = addjobForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Adding...';
        submitButton.disabled = true;

        // FIXED: Match field names exactly with Django model
        const jobData = {
            title: document.getElementById("job-title").value.trim(),
            schedule: document.getElementById("job-schedule").value,
            category: document.getElementById("category").value.trim(),
            status: document.getElementById("status").value,
            description: document.getElementById("job-description").value.trim(),
            salary: document.getElementById("job-salary").value.trim(),
            education: document.getElementById("education").value.trim(),
            experience: document.getElementById("experience").value,
            gender: document.getElementById("gender").value,
            techSkills: document.getElementById("tech-skills").value.trim(),    // Matches model field name
            softSkills: document.getElementById("soft-skills").value.trim(),    // Matches model field name
            benefits: document.getElementById("benefits").value.trim(),
            company: document.getElementById("company-name").value.trim(),      // 'company' not 'company_name'
            industry: document.getElementById("industry").value.trim(),
            companySize: document.getElementById("company-size").value.trim(),  // Matches model field name
            location: document.getElementById("location").value,                // Matches model field name
            companyLocation: document.getElementById("company-location").value.trim()  // Matches model field name
        };

        // Debug: Log the data being sent
        console.log("Sending job data:", jobData);

        // Use the correct URL (without /api/ prefix)
        const apiUrl = window.location.origin + '/jobs/';
        
        try {
            const csrfToken = getCSRFToken();
            console.log("CSRF Token found:", csrfToken ? "Yes" : "No");
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify(jobData)
            });
            
            const data = await response.json();
            const successMessage = document.getElementById("addjobSuccess");
            
            if (response.ok) {
                successMessage.textContent = "✓ Job added successfully! Redirecting to dashboard...";
                successMessage.style.color = "green";
                successMessage.style.backgroundColor = "#d4edda";
                successMessage.style.padding = "10px";
                successMessage.style.borderRadius = "5px";
                successMessage.style.display = "block";
                successMessage.style.marginTop = "20px";
                
                setTimeout(() => {
                    window.location.href = dashboard_url;
                }, 2000);
            } else {
                // Handle validation errors from Django REST Framework
                let errorMessage = "Error: ";
                if (typeof data === 'object') {
                    // Format the error nicely
                    if (data.hasOwnProperty('detail')) {
                        errorMessage += data.detail;
                    } else {
                        errorMessage += JSON.stringify(data, null, 2);
                    }
                } else {
                    errorMessage += data;
                }
                
                successMessage.textContent = errorMessage;
                successMessage.style.color = "red";
                successMessage.style.backgroundColor = "#f8d7da";
                successMessage.style.padding = "10px";
                successMessage.style.borderRadius = "5px";
                successMessage.style.display = "block";
                successMessage.style.marginTop = "20px";
                console.error("Server error:", data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            const successMessage = document.getElementById("addjobSuccess");
            successMessage.textContent = "❌ Network error: Could not connect to server. Please check if the server is running.";
            successMessage.style.color = "red";
            successMessage.style.backgroundColor = "#f8d7da";
            successMessage.style.padding = "10px";
            successMessage.style.borderRadius = "5px";
            successMessage.style.display = "block";
            successMessage.style.marginTop = "20px";
        } finally {
            // Re-enable button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}