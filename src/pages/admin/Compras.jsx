import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCardSales from "@/components/ventas/ProductCardSales";
import { Plus, CheckCircle } from "lucide-react";
import CartSummaryBuying from "@/components/compras/BuyingCartSummary";
import NewProduct from "@/components/compras/NewProductModal";
import { ExtraerInfoCompra } from "@/services/ProductosService";
import { agregarCompraProducto } from "@/services/CompraHitorialService";
import { useOutletContext } from "react-router-dom";
import { GetIDTotals } from "../../services/ProductosService";
import ProductCardBought from "@/components/compras/ProductCardBought";

const sampleProducts = [
  {
    ID_Producto: 101,
    Nombre: "Camiseta Básica Blanca",
    Precio_Compra: 200.0,
    Precio_Producto: 250.0,
    Descripcion_Marca: "Man's Style",
    url_image: "https://via.placeholder.com/300x300?text=Camiseta+Blanca",
    Descripcion_Categoria: "Ropa",
    Descripcion_Sucursal: "Tienda Central",
    ID_Sucursal: 1,
    Cantidad: 12,
  },
  {
    ID_Producto: 102,
    Nombre: "Jeans Regular Fit",
    Precio_Compra: 450.0,
    Precio_Producto: 560.0,
    Descripcion_Marca: "DenimCo",
    url_image: "https://via.placeholder.com/300x300?text=Jeans",
    Descripcion_Categoria: "Pantalones",
    Descripcion_Sucursal: "Sucursal Norte",
    ID_Sucursal: 2,
    Cantidad: 8,
  },
  {
    ID_Producto: 103,
    Nombre: "Chaqueta Bomber",
    Precio_Compra: 1200.0,
    Precio_Producto: 1500.0,
    Descripcion_Marca: "UrbanWear",
    url_image: "https://via.placeholder.com/300x300?text=Chaqueta",
    Descripcion_Categoria: "Abrigos",
    Descripcion_Sucursal: "Tienda Central",
    ID_Sucursal: 1,
    Cantidad: 5,
  },
  {
    ID_Producto: 104,
    Nombre: "Zapatillas Running",
    Precio_Compra: 800.0,
    Precio_Producto: 999.0,
    Descripcion_Marca: "RunFast",
    url_image: "https://via.placeholder.com/300x300?text=Zapatillas",
    Descripcion_Categoria: "Calzado",
    Descripcion_Sucursal: "Sucursal Sur",
    ID_Sucursal: 3,
    Cantidad: 20,
  },
  {
    ID_Producto: 105,
    Nombre: "Gorra Trucker",
    Precio_Compra: 120.0,
    Precio_Producto: 150.0,
    Descripcion_Marca: "CapHouse",
    url_image: "https://via.placeholder.com/300x300?text=Gorra",
    Descripcion_Categoria: "Accesorios",
    Descripcion_Sucursal: "Tienda Central",
    ID_Sucursal: 1,
    Cantidad: 30,
  },
  {
    ID_Producto: 106,
    Nombre: "Suéter de Punto",
    Precio_Compra: 650.0,
    Precio_Producto: 820.0,
    Descripcion_Marca: "Knit&Co",
    url_image: "https://via.placeholder.com/300x300?text=Sueter",
    Descripcion_Categoria: "Ropa",
    Descripcion_Sucursal: "Sucursal Norte",
    ID_Sucursal: 2,
    Cantidad: 7,
  },
  {
    ID_Producto: 107,
    Nombre: "Camisa Formal",
    Precio_Compra: 300.0,
    Precio_Producto: 375.0,
    Descripcion_Marca: "OfficeLook",
    url_image: "https://via.placeholder.com/300x300?text=Camisa",
    Descripcion_Categoria: "Ropa",
    Descripcion_Sucursal: "Sucursal Sur",
    ID_Sucursal: 3,
    Cantidad: 14,
  },
  {
    ID_Producto: 108,
    Nombre: "Cinturón de Cuero",
    Precio_Compra: 180.0,
    Precio_Producto: 220.0,
    Descripcion_Marca: "LeatherPro",
    url_image: "https://via.placeholder.com/300x300?text=Cinturon",
    Descripcion_Categoria: "Accesorios",
    Descripcion_Sucursal: "Tienda Central",
    ID_Sucursal: 1,
    Cantidad: 25,
  },
  {
    ID_Producto: 109,
    Nombre: "Sudadera con Capucha",
    Precio_Compra: 500.0,
    Precio_Producto: 625.0,
    Descripcion_Marca: "CozyWear",
    url_image: "https://via.placeholder.com/300x300?text=Sudadera",
    Descripcion_Categoria: "Ropa",
    Descripcion_Sucursal: "Sucursal Norte",
    ID_Sucursal: 2,
    Cantidad: 10,
  },
  {
    ID_Producto: 110,
    Nombre: "Calcetines Pack x3",
    Precio_Compra: 60.0,
    Precio_Producto: 75.0,
    Descripcion_Marca: "FootBasics",
    url_image: "https://via.placeholder.com/300x300?text=Calcetines",
    Descripcion_Categoria: "Accesorios",
    Descripcion_Sucursal: "Sucursal Sur",
    ID_Sucursal: 3,
    Cantidad: 50,
  },
];

const BuyingPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [lastId, setLastId] = useState(null);
  const [showToastCompra, setShowToastCompra] = useState(false);
  const [priceLeft, setPriceLeft] = useState(false);

  const { setTitle } = useOutletContext();
  useEffect(() => {
    setTitle("Compras");
  }, [setTitle]);

  const fetchProducts = async () => {
    try {
      const productos = await ExtraerInfoCompra();
      setProducts(productos);
      const lastProductId = await GetIDTotals();
      setLastId(lastProductId);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setProducts([]);
      setLastId(null);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtrar productos
  const filteredProducts = products.filter((product) =>
    product.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funciones del carrito
  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.ID_Producto === product.ID_Producto
      );
      return existingItem
        ? prevCart.map((item) =>
            item.ID_Producto === product.ID_Producto
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [
            ...prevCart,
            {
              ...product,
              quantity: 1,
              buyingPrice: product.Precio_Compra || 0,
            },
          ];
    });
  };

  const updateCartItemQuantity = (id, quantity) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.ID_Producto === id ? { ...item, quantity } : item
      )
    );
  };

  const updateCartItemPrice = (id, price) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.ID_Producto === id ? { ...item, buyingPrice: price } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.ID_Producto !== id)
    );
  };

  // Función para completar compra
  const handleCompletePurchase = async () => {
    if (cartItems.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    const faltanPrecios = cartItems.some(
      (item) =>
        item.buyingPrice === undefined ||
        item.buyingPrice === "" ||
        isNaN(item.buyingPrice) ||
        Number(item.buyingPrice) <= 0
    );
    if (faltanPrecios) {
      setPriceLeft(true);
      return;
    }

    try {
      const compraData = {
        Estado: 1,
        Fecha_Compra: new Date().toISOString(), // UseW Sucursal ID from localStorage as int
        DetallesCompra: cartItems.map((item) => ({
          ID_Producto: item.ID_Producto,
          Cantidad: item.quantity,
          Precio_Compra: item.buyingPrice || item.Precio_Producto,
          ID_Sucursal: item.ID_Sucursal,
        })),
        Precio_Compra: cartItems.reduce(
          (total, item) =>
            total + (item.buyingPrice || item.Precio_Producto) * item.quantity,
          0
        ),
        CantidadCompra: cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        ),
      };

      const resultado = await agregarCompraProducto(compraData);

      if (resultado) {
        setCartItems([]);
        setShowToastCompra(true); // Activa el toast al finalizar compra
      } else {
        alert("Error al registrar la compra");
      }
    } catch (error) {
      console.error("Error al completar compra:", error);
      alert("Ocurrió un error al procesar la compra");
    }
  };
  return (
    <motion.div
      className="flex-1 overflow-auto relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <main className="max-w-7xl mx-auto py-6 lg:px-8">
        <div className="mb-4 flex gap-4">
          {/* Buscador */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar productos..."
            className="w-8/12 bg-white text-blue-900 placeholder-blue-400 rounded-lg px-4 py-2 border  border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => setShowAddProductModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center"
          >
            <Plus className="mr-2" size={18} />
            Nuevo Producto
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Lista de productos */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-min">
            {sampleProducts.map((product) => (
              <ProductCardBought
                key={product.ID_Producto}
                name={product.Nombre}
                price={product.Precio_Producto}
                boughtPrice={product.Precio_Compra}
                brand={product.Descripcion_Marca}
                image={product.url_image}
                category={product.Descripcion_Categoria}
                Sucursal={product.Descripcion_Sucursal}
                stock={product.Cantidad}
                onClick={() => addToCart(product)}
              />
            ))}
          </div>

          {/* Resumen del carrito */}
          <div className="w-full lg:w-1/3 bg-white rounded-xl border border-slate-300 ring-1 ring-blue-500/30 shadow-md p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Carrito
            </h2>
            <CartSummaryBuying
              cartItems={cartItems}
              updateCartItemQuantity={updateCartItemQuantity}
              updateCartItemPrice={updateCartItemPrice}
              removeFromCart={removeFromCart}
              priceLeft={priceLeft}
              setPriceLeft={setPriceLeft}
            />
            <button
              onClick={handleCompletePurchase}
              className="mt-6 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center w-full transition-colors"
              disabled={cartItems.length === 0}
            >
              <CheckCircle className="mr-2" size={18} />
              Completar Compra
            </button>
          </div>
        </div>

        <NewProduct
          openAdd={showAddProductModal}
          siguienteId={lastId + 1}
          AddModalClose={() => setShowAddProductModal(false)}
          onProductAdded={() => {
            fetchProducts();
            setShowToast(true); // Activa el toast
            // Activa el toast usando localStorage y ShowToastOnReload
          }}
        />
        <ShowToast
          show={showToast}
          onClose={() => setShowToast(false)}
          message="Producto agregado correctamente"
          iconType="success"
          shadowColor="green"
          tone="solid"
          position="bottom-left"
        />

        <ShowToast
          show={showToastCompra}
          onClose={() => setShowToastCompra(false)}
          message="¡Compra registrada exitosamente!"
          iconType="success"
          shadowColor="green"
          tone="solid"
          position="bottom-left"
        />
      </main>
    </motion.div>
  );
};

export default BuyingPage;
