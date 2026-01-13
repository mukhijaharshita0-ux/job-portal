const API_URL = 'http://localhost:4000/api/users'

const loginForm = document.getElementById("loginForm")
const RegisterForm = document.getElementById("RegisterForm")

if (RegisterForm) {
        RegisterForm.addEventListener("submit", async (e) => {
                e.preventDefault()
                const username = document.querySelector("#registerUser").value
                const email = document.querySelector("#registerEmail").value

                const password = document.querySelector("#registerPassword").value

                const res = await fetch(`${API_URL}/register`, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ username, email, password })
                })
                const data = await res.json()
                //if it is properly run then it returns ok that's why we use if condition
                if (res.ok) {
                        alert("Registration successfully. you can login now")
                        window.location.href = "/login"  //use this to user can automatically redirect to login page
                } else {
                        alert(data.message || "Registration failed.")
                }
        })
}
if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
                e.preventDefault()
                const username = document.querySelector("#loginUser").value
                const password = document.querySelector("#loginPassword").value


                const res = await fetch(`${API_URL}/login`, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ username, password })
                })
                const data = await res.json()
                //if it is properly run then it returns ok that's why we use if condition
                if (res.ok) {
                        localStorage.setItem("token", data.token)  //data token tae from user.routes.js
                        window.location.href = "/Users"  //use this to user can automatically redirect to login page
                } else {
                        alert(data.message || "Login failed.")
                }
        })
}