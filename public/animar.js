const animado = document.getElementsByClassName("animado");

function deteccionScroll() {
  //Detecta la cantidad de scroll bajada y se guarda
  let scrollTop = document.documentElement.scrollTop;

  for (let i = 0; i < animado.length; i++) {
    //offsetTop detecto la altura que hay desde el inicio de la ventana hasta el comienzo del elemento
    let alturaAnimado = animado[i].offsetTop;
    if (alturaAnimado - 450 < scrollTop) {
      animado[i].style.opacity = 1;
    }
  }
}

window.addEventListener("scroll", deteccionScroll);
