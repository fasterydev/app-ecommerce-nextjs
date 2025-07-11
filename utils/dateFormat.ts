export const dateFormat = (date: string | Date) => {
  // Intentar convertir el string a un objeto de fecha
  const dateObj = new Date(date);

  // Verificar si la fecha es inválida
  if (isNaN(dateObj.getTime())) {
    return "Fecha no válida";
  }

  // Formatear la fecha
  const formattedDate = new Intl.DateTimeFormat("es-EC", {
    dateStyle: "full",
    // timeStyle: 'medium',
    timeZone: "America/Guayaquil",
  }).format(dateObj);

  // Capitalizar la primera letra
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};
