function togglePassword() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eyeIcon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.classList.remove("bi-eye");
    eyeIcon.classList.add("bi-eye-slash");
  } else {
    passwordInput.type = "password";
    eyeIcon.classList.remove("bi-eye-slash");
    eyeIcon.classList.add("bi-eye");
  }
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  error.innerText = "";

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Login inválido");
      return res.json();
    })
    .then(() => {
      carregarUsuario();
    })
    .catch(() => {
      error.innerText = "Email ou senha inválidos";
    });
}

function carregarUsuario() {
  fetch("https://reqres.in/api/users/2")
    .then((res) => res.json())
    .then((data) => {
      const user = data.data;

      document.getElementById("avatar").src = user.avatar;
      document.getElementById("name").innerText =
        user.first_name + " " + user.last_name;
      document.getElementById("userEmail").innerText = user.email;

      document.getElementById("loginCard").classList.add("d-none");
      document.getElementById("userCard").classList.remove("d-none");
    });
}

function logout() {
  document.getElementById("userCard").classList.add("d-none");
  document.getElementById("loginCard").classList.remove("d-none");

  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}
