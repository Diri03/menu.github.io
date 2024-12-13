import { useState, useEffect } from "react";
import './App.css'
import NavBar from './components/NavBar'
import CardItem from "./components/CardItem";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dataProduct, setDataProduct] = useState([]);
  const [cart, setCart] = useState([]);

  async function getData() {
    const url = "https://spotty-eight-wildebeest.glitch.me";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      setDataProduct(json);
    } catch (error) {
      console.error(error.message);
    }
  }
  
  useEffect(() => {
    getData();
  }, []);

  const filteredProducts = selectedCategory
  ? dataProduct.filter(product => product.category_id === selectedCategory)
  : dataProduct;

  function addToCart(product, count) {
    if (count <= 0) {
      alert("Jumlah produk harus lebih dari 0");
      return;
    }

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Jika produk sudah ada, tambahkan jumlah ke count
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
      <NavBar cart={cart} onCategoryChange={setSelectedCategory}/>
      <main className='container p-4' style={{ background: "hsl(211, 13%, 94%)" }}>
        <div className="d-flex justify-content-center flex-wrap gap-5 align-items-stretch">
          {filteredProducts.map((product, idx) => (
            <CardItem product={product} addToCart={addToCart} key={idx} />
          ))}
        </div>
      </main>
    </>
  )
}

export default App