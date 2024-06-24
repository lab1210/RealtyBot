import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/forgot-password', { email })
      .then(response => {
        setMessage('Password reset link sent to your email');
        setError('');
      })
      .catch(error => {
        setError('Error sending password reset link');
        setMessage('');
        console.error('Error in forgot password:', error);
      });
  };

  return (
    <div className="container py-5">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
