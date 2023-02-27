const parrafos = document.querySelectorAll(".parrafo");
const secciones = document.querySelectorAll(".seccion");
const papelera  = document.getElementsByClassName("papelera")[0];

parrafos.forEach(parrafo => {
 parrafo.addEventListener("dragstart", e => {
  e.dataTransfer.clearData();
  e.dataTransfer.setData("id_parrafo", parrafo.id);
  parrafo.classList.add("dragging");

  const elementoFantasma = document.querySelector(".imagen-drag");
  elementoFantasma.innerText = parrafo.innerText;
  e.dataTransfer.setDragImage(elementoFantasma, 0, 0);
 });

 parrafo.addEventListener("dragend", () => {
  parrafo.classList.remove("dragging");
  document.querySelector(".imagen-drag").innerText = "";
 });
});

secciones.forEach(seccion => {
 seccion.addEventListener("dragover", e => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "copyMove"; // Por Defecto
 });

 // seccion.addEventListener("dragenter", e => {
 //  e.dataTransfer.setData("id_seccion", seccion.id);
 // });

 seccion.addEventListener("drop", e => {
  const id_parrafo = e.dataTransfer.getData('id_parrafo');
  const id_seccion = e.dataTransfer.getData('id_seccion');

  if (id_seccion != seccion.id) {
   const parrafo = document.getElementById(id_parrafo);
   seccion.appendChild(parrafo);
  }
 });
});

papelera.addEventListener("dragover", e => {
 e.preventDefault();
 
 e.dataTransfer.dropEffect = "move";
});

papelera.addEventListener("drop", e => {
 const parrafo = document.querySelector("#" + e.dataTransfer.getData('id_parrafo'));
 const seccion = parrafo.parentNode;

 seccion.removeChild(parrafo);
});