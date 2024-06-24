import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/UserProfilePage.css';

function UserProfilePage() {
  const [user, setUser] = useState({});
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    // Fetch user info and saved properties from the backend
    axios.get('http://localhost:5000/api/user/profile')
      .then(response => {
        setUser(response.data.user);
        setSavedProperties(response.data.savedProperties);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  return (
    <div className="container py-5">
      <h1>User Profile</h1>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">User Information</h5>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
      <h2>Saved Properties</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {savedProperties.map((property) => (
          <div key={property.id} className="col mb-4">
            <div className="card h-100">
              <img
                src={property.image_url}
                className="card-img-top"
                alt={property.address}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{property.price}</h5>
                <p className="card-text">{property.address}</p>
                <button className="btn btn-danger">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfilePage;
