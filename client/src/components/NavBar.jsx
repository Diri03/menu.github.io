import "../App.css";
import CartItem from "./CartItem";

function NavBar({ cart, onCategoryChange, onResetCart }) {
  return (
    <>
      <nav className="navbar1">
        <div className="container navbartop">
          <div className="logo1">
            <h1>DIRI</h1>
          </div>
          <button type="button" className="btn tombol mt-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" style={{ height: "90%"}}>Cart - {cart.length}</button>
        </div>

        <ul className="menu1">
          <li>
            <a href="#" onClick={() => onCategoryChange(null)}>Semua</a>
          </li>
          <li>
            <a href="#" onClick={() => onCategoryChange(1)}>Makanan</a>
          </li>
          <li>
            <a href="#" onClick={() => onCategoryChange(2)}>Minuman</a>
          </li>
        </ul>
      </nav>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">Chart</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <CartItem cart={cart} />
          <button type="button" className="tombol p-1 mt-2" style={{ width: "100%" }} onClick={ onResetCart }>Reset</button>
          <button type="button" data-bs-dismiss="offcanvas" className="tombol p-1 mt-2" style={{ width: "100%" }} onClick={ () => {onResetCart; alert("Pesanan Sudah Diterima");} }>Pesan</button>
        </div>
      </div>
    </>
  )
}

export default NavBar;