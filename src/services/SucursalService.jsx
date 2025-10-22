import api from "../Api";

// Obtener todas las sucursales
export const obtenerSucursales = async () => {
  try {
    const response = await api.get("/sucursales");
    return response.data;
  } catch (error) {
    console.error("Error al obtener sucursales:", error);
    return [];
  }
};

// Obtener sucursales asociadas a un producto por ID

export const ObtenerVentasPorDiaSemana = async (idSucursal) => {
  try {
    const response = await api.get(
      `/sucursales/ventas-por-dia-semana/${idSucursal}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener sucursales por ID de producto:", error);
    return [];
  }
};

// Obtener totales relacionados con una sucursal específica
export const obtenerTotalesPorSucursal = async (idSucursal) => {
  try {
    const response = await api.get(`/sucursales/totales/${idSucursal}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener totales por sucursal:", error);
    return null;
  }
};

// Obtener productos agrupados por categoría para una sucursal específica
export const obtenerProductosPorCategoria = async (idSucursal) => {
  try {
    const response = await api.get(`/sucursales/categorias/${idSucursal}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    return [];
  }
};

export const ObtenerTop5MayorStock = async (idSucursal) => {
  try {
    const res = await api.get(
      `/sucursales/productos/top-mayor-stock/${idSucursal}`
    );
    return res.data;
  } catch (error) {
    console.error("Error al obtener productos con mayor stock:", error);
    return [];
  }
};

export const ObtenerProductosBajoStock = async (idSucursal, umbral) => {
  try {
    const res = await api.get(
      `/sucursales/productos/bajo-stock/${idSucursal}/${umbral}`
    );
    return res.data;
  } catch (error) {
    console.error("Error al obtener productos bajo stock:", error);
    return [];
  }
};
