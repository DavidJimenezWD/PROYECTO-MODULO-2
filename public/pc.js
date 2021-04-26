let usuario = "";
let logeado = false;
const arrayCesta = [];

//Solicito email de quien se a logeado para poder guardar en la DB la cesta
fetch("/userEmail")
  .then((res) => res.text())
  .then((text) => {
    logeado = true;
    usuario = text;
  });

//Mostrar titulos de la categoria PC
fetch("/admin/pc")
  .then((res) => res.json())
  .then((res) => {
    res.forEach((element) => {
      document.getElementById("div-main").innerHTML += `<div class="juegosPC">
      <img src="${element.imagen}" id="${element.titulo}" data-cat="${element.categoria}" class="games"/>
      <div class="comprarGame">
        <button id="comprarGame" onclick="anyadirCesta('${element.titulo}','${element.precio}')">Añadir</button>
      </div></div>`;
    });
  });

//Añadir a la cesta y posteriomente a DB por si se deslogea y vulve a logearse si no a pagado siga teniendolo
function anyadirCesta(titulo, precio) {
  fetch("/basket/anyadirACesta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo, precio, usuario }),
  });
}

/* Mostrar en la cesta lo que el usuario que este logeado hubiera añadido, si no finaliza la compra
aunque se loge otro usuario al volver tendria en la cesta lo que habia ya que se guarda en DB  */

document.getElementById("cesta").addEventListener("click", () => {
  if (document.getElementById("cesta2").style.display === "none") {
    document.getElementById("cesta2").innerHTML = "";
    fetch("/basket/recogerCesta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario }),
    })
      .then((res) => res.json())
      .then((res) => {
        res.forEach((element) => {
          document.getElementById(
            "cesta2"
          ).innerHTML += `${element.titulo} - ${element.precio} </br>`;
        });
        document.getElementById("cesta2").innerHTML +=
          "<button onclick='pagarCompra()'>Pagar</button>";
      });
    document.getElementById("cesta2").style.display = "block";
  } else {
    document.getElementById("cesta2").style.display = "none";
  }
});

//Mostrar ventanas de Login o Registro
document.getElementById("close").addEventListener("click", () => {
  const modal = document.getElementById("modal-container-flex");
  modal.style.opacity = "0";
  modal.style.zIndex = "-1";
});

document.getElementById("close2").addEventListener("click", () => {
  const modal = document.getElementById("modal-container-flex2");
  modal.style.opacity = "0";
  modal.style.zIndex = "-1";
});

//Una vez pagado se elimana de la DB
function pagarCompra() {
  alert("Compra Realizada");
  document.getElementById("cesta2").style.display = "none";
  fetch("/basket/eliminar", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usuario }),
  });
}
