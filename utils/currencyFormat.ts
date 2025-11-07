export const currencyFormat = (value: any) => {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  if (!isNaN(numericValue)) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericValue);
  } else {
    return "Invalid value";
  }
};
