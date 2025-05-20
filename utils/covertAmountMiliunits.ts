/**
 * Converts a value (number or string) to milliunits by multiplying it by 100.
 *
 * Example:
 * ```
 * const result = convertToMilliunits("25,1");
 * console.log(result); // Output: 2510
 * ```
 */
export function convertToMilliunits(value: number | string | null | undefined): number {
  // Asignar 0 si el valor es null o undefined
  const normalizedValue = value ?? 0;

  if (typeof normalizedValue === "string") {
    // Reemplazar comas por puntos y eliminar espacios
    const cleanedValue = normalizedValue.replace(/,/g, ".").trim();

    // Convertir el valor limpio a número flotante
    const parsedValue = parseFloat(cleanedValue);

    if (isNaN(parsedValue)) {
      throw new Error(
        "Invalid input: value must be a number or a string convertible to a number"
      );
    }

    // Multiplicar por 100 y redondear al entero más cercano
    return Math.round(parsedValue * 100);
  }

  if (typeof normalizedValue === "number") {
    // Multiplicar por 100 y redondear al entero más cercano
    return Math.round(normalizedValue * 100);
  }

  throw new Error("Invalid input: unsupported value type");
}


/**
 * Converts a value (number or string) from milliunits to its original value by dividing it by 100.
 *
 * Example:
 * ```
 * const result = convertFromMilliunits(2510);
 * console.log(result); // Output: 25.1
 * ```
 */
export function convertFromMilliunits(
  value: number | string | null | undefined
): number {
  const normalizedValue = value ?? 0;

  if (typeof normalizedValue === "string") {
    const cleanedValue = normalizedValue.replace(/,/g, ".").trim();
    const parsedValue = parseFloat(cleanedValue);

    if (isNaN(parsedValue)) {
      throw new Error(
        "Invalid input: value must be a number or a string convertible to a number"
      );
    }

    return parsedValue / 100;
  }

  if (typeof normalizedValue === "number") {
    return normalizedValue / 100;
  }

  throw new Error("Invalid input: unsupported value type");
}
