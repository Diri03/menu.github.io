import { useState, useEffect } from "react";
import './App.css';
import NavBar from './components/NavBar';
import CardItem from "./components/CardItem";
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isLogin, setIsLogin] = useState(false); // Apakah user sudah login?
  const [isRegister, setIsRegister] = useState(false); // Login atau Register form?
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dataProduct, setDataProduct] = useState([]);
  const [cart, setCart] = useState([]);

  // Fungsi untuk mendapatkan data produk
  async function getData() {
    const url = "https://spotty-eight-wildebeest.glitch.me/api/products";
    // const url = "http://localhost:3000/api/products";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setDataProduct(json);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (isLogin) {
      getData();
    }
  }, [isLogin]);

  const filteredProducts = selectedCategory
    ? dataProduct.filter(product => product.category_id === selectedCategory)
    : dataProduct;

  function handleResetCart() {
    setCart([]);
  }

  function addToCart(product, count) {
    if (count <= 0) {
      alert("Jumlah produk harus lebih dari 0");
      return;
    }

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(cart.map((item) =>
        item.id === product.id
          ? { ...item, count: item.count + count, totalPrice: (item.count + count) * item.price }
          : item
      ));
    } else {
      setCart([...cart, { ...product, count: count, totalPrice: count * product.price }]);
    }
  }

  return (
    <>
      {isLogin ? (
        <>
          <NavBar cart={cart} onCategoryChange={setSelectedCategory} onResetCart={handleResetCart} />
          <main className='container p-4' style={{ background: "hsl(211, 13%, 94%)" }}>
            <div className="d-flex justify-content-center flex-wrap gap-5 align-items-stretch">
              {filteredProducts.map((product, idx) => (
                <CardItem product={product} addToCart={addToCart} key={idx} />
              ))}
            </div>
          </main>
        </>
      ) : (
        // Jika belum login, tampilkan form login atau register
        isRegister ? (
          <Register onLogin={() => setIsRegister(false)} />
        ) : (
          <Login onRegister={() => setIsRegister(true)} onSuccessLogin={() => setIsLogin(true)} />
        )
      )}
    </>
  );
}

export default App;