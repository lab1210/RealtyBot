import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/UserProfilePage.css";
import { Link } from "react-router-dom";


function UserProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Make sure userId is stored in localStorage during login
    axios
      .get(`http://localhost:5000/api/user/profile`, {
        params: { user_id: userId },
      })
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => {
        setError("Error fetching user profile");
        console.error("Error fetching user profile:", error);
      });
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-5">
      <h1>User Profile</h1>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Username: {userProfile.username}</h5>
          <p className="card-text">Email: {userProfile.email}</p>
        </div>
      </div>
      <h2>Saved Properties</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {userProfile.saved_properties.map((property) => (
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
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">
                      <i className="fas fa-bed"></i>
                      {property.bedrooms}
                      Beds
                    </small>

                    <small className="text-muted">
                      <i className="fas fa-bath"></i>
                      {property.bathrooms} Baths
                    </small>
                    <small className="text-muted">
                      <i className="fas fa-car"></i>
                      {property.parking_spaces} Parking
                    </small>
                  </div>
                </div>
                <Link to={`/properties/${property.id}`} className="btn btn-dark me-2">
          View Details
        </Link>
            </div>
          </div>
        ))}
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default UserProfilePage;
