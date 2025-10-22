import api from "../Api"; // Configuración baseURL para tu API

// Obtener empleados activos
export const obtenerEmpleadosActivos = async () => {
  try {
    const response = await api.get("/empleados/activos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener empleados activos:", error);
    return [];
  }
};

// Obtener ROLESSSSSSSSSS
export const obtenerRoles = async () => {
  try {
    const response = await api.get("/empleados/roles");
    return response.data;
  } catch (error) {
    console.error("Error al obtener empleados activos:", error);
    return [];
  }
};

// Agregar empleado
export const agregarEmpleado = async (empleado) => {
  try {
    const response = await api.post("/empleados/agregar", empleado);
    return response.data;
  } catch (error) {
    console.error(
      "Error al agregar empleado:",
      error.response ? error.response.data : error
    );
    return null;
  }
};

// Actualizar empleado
export const actualizarEmpleado = async (empleadoActualizado) => {
  try {
    const response = await api.put(
      "/empleados/actualizar",
      empleadoActualizado
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar empleado:", error);
    return null;
  }
};

// Eliminar empleado (cambiar estado a inactivo)
export const eliminarEmpleado = async (empleadoEliminado) => {
  try {
    const response = await api.put("/empleados/eliminar", empleadoEliminado);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar empleado:", error);
    return null;
  }
};
