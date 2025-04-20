function showLogin() {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('registerForm').classList.remove('active');
}

function showRegister() {
    document.getElementById('registerForm').classList.add('active');
    document.getElementById('loginForm').classList.remove('active');
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (name && email && password) {
        let users = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.some(user => user.email === email);
        if (userExists) {
            alert("User already exists with this email.");
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registered successfully! Please login.");
        showLogin();
    } else {
        alert("Please fill in all fields.");
    }
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password.");
    }
}
