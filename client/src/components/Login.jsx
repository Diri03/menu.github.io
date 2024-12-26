import { useState } from "react";

function Login({ onRegister, onSuccessLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    async function handleLogin(e) {
      e.preventDefault();
    
      if (!username || !password) {
        alert("Username dan password tidak boleh kosong!");
        return;
      }
    
      try {
        const login_url = "https://menu-github-io-server.vercel.app/api/auth/login"
        // const login_url = "http://localhost:3000/api/auth/login";
        const response = await fetch(login_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          // Login berhasil
          alert("Login berhasil!");
          onSuccessLogin(); // Panggil fungsi untuk berpindah ke halaman berikutnya
        } else {
          // Tampilkan pesan kesalahan dari backend
          alert(data.message || "Login gagal. Periksa username dan password Anda.");
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        alert("Terjadi kesalahan pada server. Coba lagi nanti.");
      }
    }
  
    return (
      <div className="container-form">
        <div className="logo1">
          <h1>Selamat Datang</h1>
        </div>
        <form onSubmit={handleLogin}>
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
            Login
          </button>
        </form>
        <p>
          Belum punya akun?{" "}
          <span onClick={onRegister} className="link">
            Register
          </span>
        </p>
      </div>
    );
  }
  
  export default Login;  