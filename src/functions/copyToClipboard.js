const copyToClipboard = (e, mensaje, texto) => {
  e.preventDefault();
  e.stopPropagation();
  navigator.clipboard.writeText(texto);
  alert(mensaje);
};

export default copyToClipboard;