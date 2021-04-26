//Añadir Titulo Nuevo
document.getElementById("btn-anyadir").addEventListener("click", () => {
  anyadirTitulo();
});

//Editar Titulo
document.getElementById("btn-editar").addEventListener("click", () => {
  editarTitulo();
});

//Eliminar Titulo
document.getElementById("btn-eliminar").addEventListener("click", () => {
  eliminarTitulo();
});

//Solicito el nombre de quien se a logeado
fetch("/userName")
  .then((res) => res.text())
  .then((text) => console.log(text));

/* -------------------------------------------------------------------------- */

function anyadirTitulo() {
  const titulo = document.getElementById("titulo-anyadir").value;
  const pegi = document.getElementById("pegi-anyadir").value;
  const genero = document.getElementById("genero-anyadir").value;
  const precio = document.getElementById("precio-anyadir").value;
  const imagen = document.getElementById("imagen-anyadir").value;
  const categoria = document.getElementById("cat-anyadir").value;

  if (categoria === "PS") {
    fetch("/admin/anyadirPS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titulo, pegi, genero, precio, imagen }),
    });
  } else if (categoria === "PC") {
    fetch("/admin/anyadirPC", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titulo, pegi, genero, precio, imagen }),
    });
  } else if (categoria === "XBX") {
    fetch("/admin/anyadirXBX", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titulo, pegi, genero, precio, imagen }),
    });
  }
  alert("Añadido Correctamente");
}

function editarTitulo() {
  const titulo = document.getElementById("titulo-editar").value;
  const pegi = document.getElementById("pegi-editar").value;
  const genero = document.getElementById("genero-editar").value;
  const precio = document.getElementById("precio-editar").value;
  const imagen = document.getElementById("imagen-editar").value;
  const categoria = document.getElementById("cat-editar").value;

  if (categoria === "PS") {
    fetch("/admin/editarPS", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titulo, pegi, genero, precio, imagen }),
    });
  } else if (categoria === "PC") {
    fetch("/admin/editarPC", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titulo, pegi, genero, precio, imagen }),
    });
  } else if (categoria === "XBX") {
    fetch("/admin/editarXBX", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titulo, pegi, genero, precio, imagen }),
    });
  }
  alert("Modificado Correctamente");
}

function eliminarTitulo() {
  const titulo = document.getElementById("titulo-eliminar").value;
  const categoria = document.getElementById("cat-eliminar").value;

  if (categoria === "PS") {
    fetch("/admin/eliminarPS", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titulo }),
    });
  } else if (categoria === "PC") {
    fetch("/admin/eliminarPC", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titulo }),
    });
  } else if (categoria === "XBX") {
    fetch("/admin/eliminarXBX", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titulo }),
    });
  }
  alert("Eliminado Correctamente");
}
