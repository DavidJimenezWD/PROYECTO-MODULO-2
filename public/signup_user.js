//Muestro la ventana modal para el registro

document.getElementById("btn-modal").addEventListener("click", () => {
  const modal = document.getElementById("modal-container-flex");
  modal.style.zIndex = "1";
  modal.style.display = "flex";
  modal.style.opacity = "1";
});

//Recojo los datos y realizo la peticion enviadolos

document.getElementById("btn-register").addEventListener("click", () => {
  const email = document.getElementById("text-email").value;
  const password = document.getElementById("text-password").value;

  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((res) => res.json())
    .then((res) => {
      alert("Registrado Correctamente");
    });

  //Oculto de nuevo la ventana

  const modal = document.getElementById("modal-container-flex");

  modal.style.opacity = "0";
  modal.style.zIndex = "-1";
});
