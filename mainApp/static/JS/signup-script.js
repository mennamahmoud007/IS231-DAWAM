// ============================================
//              Sign-Up Page
// ============================================


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

    signupForm.addEventListener("submit", function(e) {

        
        e.preventDefault();
        

        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirm_password").value;
        let email = document.getElementById("email").value.trim();
        let isCompany = companyCheck.checked;
        let companyName = document.getElementById("company_name").value.trim();

        if (password !== confirmPassword) {
            confirmPasswordError.textContent = "Passwords do not match.";
            confirmPasswordError.style.display = "block";
            document.getElementById("confirm_password").classList.add("input-error");
            return;
        }

        let user = {
            username: username,
            password: password,
            email: email,
            type: isCompany ? "company" : "user",
            company: isCompany ? companyName : null
        };
        
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        const successMessage = document.getElementById("signupSuccess");
        successMessage.textContent = "Signed-up successfully!";
        successMessage.style.display = "block";


        localStorage.setItem("currentUser", JSON.stringify(user));
        
        setTimeout(() => {
            successMessage.style.display = "none";

            if (isCompany) {
            window.location.href = "dashboard.html";
            } else {
            window.location.href = "browse.html";
            }
        },2000);
    });
}

