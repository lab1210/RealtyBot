import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PropertyCard.css";
import { toast } from 'react-toastify';
function PropertyCard({ property, userId, fetchProperties }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (userId) {
      axios
        .get("http://localhost:5000/api/user/is_saved", {
          params: { user_id: userId, property_id: property.id },
        })
        .then((response) => {
          setIsSaved(response.data.is_saved);
        })
        .catch((error) => {
          console.error("Error checking if property is saved:", error);
        });
    }
  }, [userId, property.id]);

  const handleSaveProperty = () => {
    axios
      .post("http://localhost:5000/api/user/save_property", {
        user_id: userId,
        property_id: property.id,
      })
      .then((response) => {
        console.log("Property saved:", response.data);
        setIsSaved(true);
        toast.success('Property saved successfully!');
        fetchProperties(); // Refresh the properties list
      })
      .catch((error) => {
        console.error("Error saving property:", error);
      });
  };

  const handleRemoveProperty = () => {
    axios
      .post("http://localhost:5000/api/user/remove_property", {
        user_id: userId,
        property_id: property.id,
      })
      .then((response) => {
        console.log("Property removed:", response.data);
        setIsSaved(false);
        toast.info('Property removed from saved.');
        fetchProperties(); // Refresh the properties list
      })
      .catch((error) => {
        console.error("Error removing property:", error);
      });
  };
  return (
    <div className="col mb-4">
      <div className="card h-100">
        <img
          src={property.image_url}
          className="card-img-top"
          alt={property.address}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <div className="card-title-container">
            <h5 className="card-title">{property.price}</h5>
            {isSaved ? (
              <button className="btn trash" onClick={handleRemoveProperty}>
                <i className="fas fa-trash-alt"></i>
              </button>
            ) : (
              <button className="heart-button" onClick={handleSaveProperty}>
                <i className="fas fa-heart"></i>
              </button>
            )}
          </div>
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
  );
}

export default PropertyCard;
