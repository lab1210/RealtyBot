import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function RecommendationPage() {
  const [description, setDescription] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError("Please enter a description.");
      return;
    }
    setLoading(true);
    axios
      .post("http://localhost:5000/api/recommendations", { description })
      .then((response) => {
        setRecommendations(response.data);
        setFetchError("");
        setError("");
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
        setFetchError("Unstable Network. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container py-5">
      <h1>Recommendations</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the type of property you are looking for..."
            required
          ></textarea>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Get Recommendations
        </button>
      </form>
      {fetchError && (
        <div className="alert alert-danger mt-3">{fetchError}</div>
      )}
      {loading && (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-4">
        {recommendations.map((property, index) => (
          <div key={index} className="col mb-4">
            <div className="card h-100">
              <Link to={`/properties/${property.id}`}>
                <img
                  src={property.image_url}
                  className="card-img-top"
                  alt={property.address}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </Link>

              <div className="card-body">
                <h5 className="card-title">{property.price}</h5>
                <p className="card-text">{property.address}</p>
                <div className="d-flex justify-content-between">
                  <small className="text-muted">{property.bedrooms} Beds</small>
                  <small className="text-muted">
                    {property.bathrooms} Baths
                  </small>
                  <small className="text-muted">
                    <i className="fa-child"></i>
                    {property.parking_spaces} Parking
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendationPage;
