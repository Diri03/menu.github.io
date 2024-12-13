import { useState } from "react";
import "../App.css";

function CardItem({ product, addToCart }) {
    const [count, setCount] = useState(1);

    function handleKurang() {
        if (count > 1) setCount(count - 1);
    }

    function handleTambah() {
        setCount(count + 1);
    }

    return (
        <>
            <div className="card" style={{ width: "18rem" }}>
                <img src={product.link_image} className="card-img-top" alt="gambar" />
                <div className="card-body">
                    <h5 className="card-title">{ product.name }</h5>
                    <p className="card-text">Rp { product.price.toLocaleString() }</p>
                    <a href="#" className="btn tombol" data-bs-toggle="modal" data-bs-target={"#" + product.id}>Selengkapnya</a>
                </div>
            </div>

            <div className="modal fade" id={ product.id } tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{ product.name }</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="imgModal">
                            <img src={product.link_image} alt="gambar" />
                        </div>
                        <div className="modal-body">
                            { product.description }
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <div className="d-flex justify-content-between" style={{ width: "40%" }}>
                                <button type="button" className="btn tombol" onClick={handleKurang}>&lt;</button>
                                <p style={{ fontWeight: "bold" }}>{count}</p>
                                <button type="button" className="btn tombol" onClick={handleTambah}>&gt;</button>
                            </div>
                            <div>
                                <button type="button" className="btn tombol"
                                onClick={() => {
                                    addToCart(product, count);
                                    }}
                                >Add to Chart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default CardItem;