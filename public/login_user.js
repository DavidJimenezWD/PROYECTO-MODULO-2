//Muestro la ventana modal para el login

document.getElementById("btn-modal2").addEventListener("click", () => {
  const modal = document.getElementById("modal-container-flex2");
  modal.style.zIndex = "1";
  modal.style.display = "flex";
  modal.style.opacity = "1";
});

document.getElementById("btn-logout").addEventListener("click", () => {
  fetch("/logout")
    .then((res) => res.json())
    .then((res) => {
      document.getElementById("btn-modal").style.display = block;
    });
});

document.getElementById("close").addEventListener("click", () => {
  const modal = document.getElementById("modal-container-flex2");
  modal.style.opacity = "0";
  modal.style.zIndex = "-1";
});
