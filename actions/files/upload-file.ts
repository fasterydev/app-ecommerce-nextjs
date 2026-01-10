export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(
      // TODO: AÑADIR EN ENV
      `https://api.nexus.fastery.dev/files/uploadToFolder/test-ecommerce`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return {
        statusCode: response.status,
        message: errorData.message || "Error al crear el depósito",
        url: "",
      };
    }

    const resUpload = await response.json();

    return {
      statusCode: response.status,
      message: resUpload.message,
      url: resUpload.url,
    };
  } catch (error) {
    console.error("Error en uploadFile:", error);
    throw new Error("Error al subir el archivo");
  }
};
