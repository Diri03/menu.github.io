function CartItem({ cart }) {
  const totalPembelian = cart.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <div>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Jumlah</th>
            <th>Harga</th>
            <th>Total Harga</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>Rp {item.price.toLocaleString()}</td>
              <td>Rp {item.totalPrice.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="card-text" style={{ fontWeight: "bold", marginTop: "16px" }}>
        Total Pembelian = Rp {totalPembelian.toLocaleString()}
      </p>
    </div>
  );
}

export default CartItem;