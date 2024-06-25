import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import login_img from "./img/bg_1.jpg"
import { toast } from 'react-toastify';

function LoginPage({ setIsAuthenticated, setIsAdmin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', { username, password })
      .then(response => {
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('isAdmin', response.data.is_admin);
        localStorage.setItem('userId', response.data.user_id); 
        setIsAuthenticated(true);
        toast.success('Login successful')
        setIsAdmin(response.data.is_admin);
        navigate('/');
      })
      .catch(error => {
        setError('Invalid credentials');
        console.error('Error logging in:', error);
      });
  };

  return (
    <div className="container py-5" style={{ backgroundColor: '#f7f9fc', minHeight: '100vh' }}>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm">
            <div className="row g-0">
              <div className="col-md-6">
                <img src={login_img} alt="Login"className="img-fluid" style={{ height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h1 className="text-center mb-4" style={{ color: '#343a40' }}>Login</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username</label>
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
                      <label htmlFor="password" className="form-label">Password</label>
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
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#fb771a', borderColor: '#007bff' }}>Login</button>
                    <div className="mt-3 text-center">
                      <Link to="/forgot-password" style={{ color: '#fb771a' }}>Forgot Password?</Link>
                    </div>
                    <div className="mt-3 text-center">
                      <span>Not a member? </span>
                      <Link to="/signup" style={{ color: '#fb771a' }}>Signup</Link>
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

export default LoginPage;
