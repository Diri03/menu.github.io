import { useState } from "react";

function Register({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister(e) {
    e.preventDefault();

    if (!username || !password) {
        alert("Username dan password tidak boleh kosong!");
        return;
    }

    try {
        register_url = "https://menu-github-io-server.vercel.app/api/auth/register"
        const response = await fetch(register_url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registrasi berhasil! Silakan login.");
            onLogin(); // Pindah ke halaman login
        } else {
            alert(data.message || "Registrasi gagal. Coba lagi.");
        }
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        alert("Terjadi kesalahan pada server. Coba lagi nanti.");
    }}

    return (
    <div className="container-form">
        <div className="logo1">
            <h1>Registrasi Akun</h1>
        </div>
        <form onSubmit={handleRegister}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
            />
            <button type="submit" className="tombol2">
                Register
            </button>
        </form>
        <p>
            Sudah punya akun?{" "}
            <span onClick={onLogin} className="link">
            Login
            </span>
        </p>
    </div>
    );
}

export default Register;