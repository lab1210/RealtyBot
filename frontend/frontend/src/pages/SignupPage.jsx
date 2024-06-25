import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import login_img from "./img/bg_1.jpg";


function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/signup", { username, password, email })
      .then((response) => {
        setMessage("User created successfully");
        setError("");
        navigate('/login');

      })
      .catch((error) => {
        setError("Error creating user");
        setMessage("");
        console.error("Error signing up:", error);
      });
  };

  return (
    <div
      className="container py-5"
      style={{ backgroundColor: "#f7f9fc", minHeight: "100vh" }}
    >
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm">
            <div className="row g-0">
              <div className="col-md-6">
                <img
                  src={login_img} alt="login"
                  className="img-fluid"
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h1 className="text-center mb-4" style={{ color: "#343a40" }}>
                    Signup
                  </h1>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ borderColor: '#6c757d' }}

                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          style={{ borderColor: '#6c757d' }}

                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ borderColor: '#6c757d' }}

                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    {message && (
                      <div className="alert alert-success">{message}</div>
                    )}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100"  style={{ backgroundColor: '#fb771a', borderColor: '#007bff' }}>
                      Signup
                    </button>
                    <div className="mt-3 text-center">
                      <span>Already a member? </span>
                      <Link to="/login"  style={{ color: '#fb771a' }}>Login</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
