console.log("Login script loaded");
//Login Page
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

const login = document.getElementById("loginForm");
console.log("Form found:", login);

if (login) {

    login.addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        const response = await fetch('/api/login/' , {
            method : 'POST',
            headers: {'Content-Type': 'application/json',
                'X-CSRFToken' : getCookie('csrftoken')
            },
            body: JSON.stringify({username, password})
        });

        const data = await response.json();
        if(data.success){
            localStorage.setItem("currentUser" , JSON.stringify({
                username: data.username,
                user_type: data.user_type,
                company_name: data.company_name
            }));
            if (data.user_type === "company_admin") {
                window.location.href = "/dashboard/";
            } else {
                window.location.href = "/browse/";
            }
        }
        else{
            alert(data.errors);
        }
    });
}