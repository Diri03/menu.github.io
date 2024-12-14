import { useState } from "react";
import "../App.css";

function CardItem({ product, addToCart }) {
    const [count, setCount] = useState("1"); // Mulai dengan string "1"

    function handleKurang() {
        if (parseInt(count) > 1) setCount((prev) => String(parseInt(prev) - 1));
    }

    function handleTambah() {
        setCount((prev) => String(parseInt(prev) + 1));
    }

    function handleInputChange(e) {
        const value = e.target.value;

        // Validasi input: hanya angka positif atau kosong
        if (/^\d*$/.test(value)) { // Regex untuk hanya angka atau string kosong
            if (value === "" || parseInt(value) >= 1) {
                setCount(value); // Set nilai hanya jika valid
            }
        }
    }

    function handleInputBlur() {
        // Pastikan input kosong menjadi "1" saat kehilangan fokus
        if (count === "" || parseInt(count) < 1) {
            setCount("1");
        }
    }

    return (
        <>
            <div className="card" style={{ width: "18rem" }}>
                <img src={product.link_image} className="card-img-top" alt="gambar" />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Rp {product.price.toLocaleString()}</p>
                    <a href="#" className="btn tombol" data-bs-toggle="modal" data-bs-target={"#" + product.id}>Selengkapnya</a>
                </div>
            </div>

            <div className="modal fade" id={product.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{product.name}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="imgModal">
                            <img src={product.link_image} alt="gambar" />
                        </div>
                        <div className="modal-body">
                            {product.description}
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <div className="d-flex justify-content-between align-items-center" style={{ width: "40%" }}>
                                <button type="button" className="btn tombol" onClick={handleKurang}>&lt;</button>
                                
                                {/* Input Manual sebagai Teks */}
                                <input
                                    type="text"
                                    value={count}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    style={{
                                        width: "50px",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        borderRadius: "4px",
                                        border: "1px solid #ccc"
                                    }}
                                />

                                <button type="button" className="btn tombol" onClick={handleTambah}>&gt;</button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="btn tombol"
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                        addToCart(product, parseInt(count));
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardItem;