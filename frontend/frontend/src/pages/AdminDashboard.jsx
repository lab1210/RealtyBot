import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyForm from './PropertyForm';
import './css/AdminDashboard.css';

function AdminDashboardPage() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    axios.get('http://localhost:5000/api/properties')
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
      });
  };

  const handleAddProperty = (propertyData) => {
    axios.post('http://localhost:5000/api/admin/add', propertyData)
      .then(() => {
        fetchProperties();
      })
      .catch(error => {
        console.error('Error adding property:', error);
      });
  };

  const handleEditProperty = (id, propertyData) => {
    axios.put(`http://localhost:5000/api/admin/edit/${id}`, propertyData)
      .then(() => {
        fetchProperties();
        setSelectedProperty(null);
      })
      .catch(error => {
        console.error('Error editing property:', error);
      });
  };

  const handleDeleteProperty = (id) => {
    axios.delete(`http://localhost:5000/api/admin/delete/${id}`)
      .then(() => {
        fetchProperties();
      })
      .catch(error => {
        console.error('Error deleting property:', error);
      });
  };

  const handleEditClick = (property) => {
    setSelectedProperty(property);
  };

  const handleCancelEdit = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="container py-5">
      <h1>Admin Dashboard</h1>
      <div className="mb-3">
        <PropertyForm
          onSubmit={selectedProperty ? (data) => handleEditProperty(selectedProperty.id, data) : handleAddProperty}
          property={selectedProperty}
        />
        {selectedProperty && <button className="btn btn-secondary mt-3" onClick={handleCancelEdit}>Cancel Edit</button>}
      </div>
      <h2>Properties</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {properties.map((property) => (
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
                <p className="card-text">{property.description}</p>
                <p className="card-text"><strong>Bedrooms:</strong> {property.bedrooms}</p>
                <p className="card-text"><strong>Bathrooms:</strong> {property.bathrooms}</p>
                <p className="card-text"><strong>Parking Spaces:</strong> {property.parking_spaces}</p>
                <button className="btn btn-primary me-2" onClick={() => handleEditClick(property)}><i className="fas fa-edit"></i></button>
                <button className="btn btn-danger" onClick={() => handleDeleteProperty(property.id)}><i className="fas fa-trash"></i></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboardPage;
