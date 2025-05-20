export const weightFormat = (value: any) => {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  if (!isNaN(numericValue)) {
    return new Intl.NumberFormat("en-US", {
      style: "unit",
      unit: "pound", // Cambia currency a unit y especifica "pound" para libras
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericValue / 100);
  } else {
    return "Invalid value";
  }
};
