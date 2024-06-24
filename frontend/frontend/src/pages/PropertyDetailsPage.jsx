import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/properties/${id}`)
      .then(response => {
        setProperty(response.data);
      })
      .catch(error => {
        console.error('Error fetching property details:', error);
      });
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-5">
      <div className="card">
        <img
          src={property.image_url}
          className="card-img-top"
          alt={property.address}
          style={{ height: "400px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{property.price}</h5>
          <p className="card-text">{property.address}</p>
          <p className="card-text">{property.description}</p>
          <p className="card-text"><strong>Bedrooms:</strong> {property.bedrooms}</p>
          <p className="card-text"><strong>Bathrooms:</strong> {property.bathrooms}</p>
          <p className="card-text"><strong>Parking Spaces:</strong> {property.parking_spaces}</p>

        </div>
      </div>
    </div>
  );
}

export default PropertyDetailsPage;
