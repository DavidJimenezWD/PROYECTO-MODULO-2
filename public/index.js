let logeado = false;
let cesta = false;
let usuario = "";

//Mostrar titulos de la categoria PlayStation
fetch("/admin/ps")
  .then((res) => res.json())
  .then((res) => {
    for (let i = 0; i < 6; i++) {
      document.getElementById("div-main").innerHTML += `
      <div class="juegosComprar animado">
        <img src="${res[i].imagen}" id="${res[i].titulo}" data-cat="${res[i].categoria}" class="games"/>
        <div class="comprarGame">
          <button id="comprarGame" onclick="anyadirCesta('${res[i].titulo}','${res[i].precio}')">Añadir</button>
        </div>
      </div>`;
    }
  });

//Mostrar titulos de la categoria Xbox
fetch("/admin/xbx")
  .then((res) => res.json())
  .then((res) => {
    for (let i = 0; i < 6; i++) {
      document.getElementById("div-main").innerHTML += `
      <div class="juegosComprar animado">
        <img src="${res[i].imagen}" id="${res[i].titulo}" data-cat="${res[i].categoria}" class="games"/>
        <div class="comprarGame">
          <button id="comprarGame" onclick="anyadirCesta('${res[i].titulo}','${res[i].precio}')">Añadir</button>
        </div>
      </div>`;
    }
  });

//Mostrar titulos de la categoria PC
fetch("/admin/pc")
  .then((res) => res.json())
  .then((res) => {
    for (let i = 0; i < 8; i++) {
      console.log(res[i].imagen);
      document.getElementById(
        "div-main"
      ).innerHTML += `<div class="juegosPC animado" >
        <img src="${res[i].imagen}" id="${res[i].titulo}" data-cat="${res[i].categoria}" class="games"/>
        <div class="comprarGame">
          <button id="comprarGame" onclick="anyadirCesta('${res[i].titulo}','${res[i].precio}')">Añadir</button>
        </div></div>`;
    }
  });

//Solicito email de quien se a logeado para poder guardar en la DB la cesta

fetch("/userEmail")
  .then((res) => res.text())
  .then((text) => {
    usuario = text;
    logeado = true;
  });

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
          "<button id='pagar' onclick='pagarCompra()'>Pagar</button>";
      });
    document.getElementById("cesta2").style.display = "block";
  } else {
    document.getElementById("cesta2").style.display = "none";
  }
});

//Ocultar ventanas de Login o Registro

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

//Añadir a la cesta y posteriomente a DB por si se deslogea y vuelve a logearse si no a pagado siga teniendolo
function anyadirCesta(titulo, precio) {
  fetch("/basket/anyadirACesta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo, precio, usuario }),
  });
}

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

document
  .getElementById("barra-buscar")
  .addEventListener("keypress", (event) => {
    if (event.keyCode == 13) {
      const titulo = document.getElementById("barra-buscar").value;
      fetch("/admin/buscarTituloPS", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titulo }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.length > 0) {
            location.href = "busquedas.html";
            for (let i = 0; i < res.length; i++) {
              document.getElementById(
                "encontrado"
              ).innerHTML = `<div class="juegosComprar">
              <img src="${res[i].imagen}" id="${res[i].titulo}" data-cat="${res[i].categoria}" class="games"/>
              <div class="comprarGame">
                <button id="comprarGame" onclick="anyadirCesta('${res[i].titulo}','${res[i].precio}')">Añadir</button>
              </div></div>`;
            }
          }
        });
    }
  });
