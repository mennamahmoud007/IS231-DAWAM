// ============================================
//              Sign-Up Page
// ============================================

function getCookie(name){
    let cookieValue = null;
    if(document.cookie && document.cookie != ''){
        const cookies = document.cookie.split(';');
        for(let cookie of cookies){
            cookie = cookie.trim();
            if(cookie.startsWith(name + '=')){
                cookieValue = decodeURIComponent(cookie.slice(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const signupForm = document.getElementById("signupForm");

if(signupForm) {

    const companyCheck = document.getElementById("company_check");
    const companyField = document.querySelector(".company_name_field");
    const companyInput = document.getElementById("company_name");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    


    // Reset error messages
    confirmPasswordError.style.display = "none";

    // Hide company name field by default
    companyField.style.display = "none";

    // Add event listeners to reset errors on input
    document.getElementById("confirm_password").addEventListener("input", () => {
    confirmPasswordError.style.display = "none";
    document.getElementById("confirm_password").classList.remove("input-error");
    });


    companyCheck.addEventListener("change", () => {
    if (companyCheck.checked) {
        companyField.style.display = "block";
        companyInput.required = true;
    } else {
        companyField.style.display = "none";
        companyInput.required = false;
        companyInput.value = "";
    }
});

    signupForm.addEventListener("submit", async function(e) {

        
        e.preventDefault();
        

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;
        const email = document.getElementById("email").value.trim();
        const isCompany = companyCheck.checked;
        const companyName = document.getElementById("company_name").value.trim();

        //JS validation
        if (password !== confirmPassword) {
            confirmPasswordError.textContent = "Passwords do not match.";
            confirmPasswordError.style.display = "block";
            document.getElementById("confirm_password").classList.add("input-error");
            return;
        }

        const response = await fetch('/api/signup/',{
            method : 'POST',
            headers: {'Content-Type': 'application/json',
                'X-CSRFToken' : getCookie('csrftoken')
            },
            body: JSON.stringify({
                username, 
                email,
                password,
                confirm_password: confirmPassword,
                user_type : isCompany? 'company_admin': 'job_seeker',
                company_name: isCompany? companyName : ''
            })
        });

        const data = await response.json();
        if(data.success){
            localStorage.setItem("currentUser" , JSON.stringify({
                username: data.username,
                user_type: data.user_type,
                company_name: data.company_name
            }));

        const successMessage = document.getElementById("signupSuccess");
        successMessage.textContent = "Signed-up successfully!";
        successMessage.style.display = "block";

        setTimeout(() => {
            if (data.user_type === 'company_admin') {
            window.location.href = "/dashboard/";
            } else {
            window.location.href = "/browse/";
            }
        },500);
    }
    else{
        const firstError = Object.values(data.errors)[0];
        alert(Array.isArray(firstError) ? firstError[0] : firstError);
    }
}
    )};


