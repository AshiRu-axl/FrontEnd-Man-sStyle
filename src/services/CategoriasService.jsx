import api from "../Api"; // Asegúrate de que api.js está configurado con la baseURL

// Obtener todas las categorías activas
export const obtenerCategoriasActivas = async () => {
  try {
    const response = await api.get("/categorias/activas");
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías activas:", error);
    return [];
  }
};

// Actualizar una categoría
export const actualizarCategoria = async (categoria) => {
  try {
    const response = await api.put("/categorias/actualizar", categoria);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    return null;
  }
};

// Cambiar estado de una categoría (Eliminar/Inactivar)
export const eliminarCategoria = async (categoria) => {
  try {
    const response = await api.put("/categorias/eliminar", categoria);
    return response.data;
  } catch (error) {
    console.error("Error al cambiar el estado de la categoría:", error);
    return null;
  }
};

// Agregar una nueva categoría
export const agregarCategoria = async (nuevaCategoria) => {
  try {
    const response = await api.post("/categorias/agregar", nuevaCategoria);
    return response.data;
  } catch (error) {
    console.error("Error al agregar una nueva categoría:", error);
    return null;
  }
};
