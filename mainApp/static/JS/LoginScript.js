
//Login Page

const login = document.querySelector("form");

if (login) {

    login.addEventListener("submit", function (e) {
        e.preventDefault();

        const input = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const storedUser = users.find(user => (user.username === input || user.email === input) && user.password === password);

        if (storedUser) {
            localStorage.setItem("currentUser", JSON.stringify(storedUser));

            if (storedUser.type === "company") {
                window.location.href = "dashboard.html";
            } else {
                window.location.href = "browse.html";
            }
        } else {
            alert("Incorrect username/email or password. Please try again.");
        }
    });
}