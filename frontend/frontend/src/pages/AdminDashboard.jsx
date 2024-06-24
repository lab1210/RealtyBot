import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyForm from './PropertyForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/AdminDashboard.css'
function AdminDashboardPage() {
  const [properties, setProperties] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    axios.get('http://localhost:5000/api/properties')
      .then(response => {
        setProperties(response.data.properties);
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
      });
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/admin/delete/${id}`)
      .then(response => {
        fetchProperties();
      })
      .catch(error => {
        console.error('Error deleting property:', error);
      });
  };

  const handleFormSubmit = (property) => {
    if (editingProperty) {
      axios.put(`http://localhost:5000/api/admin/edit/${editingProperty.id}`, property)
        .then(response => {
          fetchProperties();
          setEditingProperty(null);
        })
        .catch(error => {
          console.error('Error updating property:', error);
        });
    } else {
      axios.post('http://localhost:5000/api/admin/add', property)
        .then(response => {
          fetchProperties();
        })
        .catch(error => {
          console.error('Error adding property:', error);
        });
    }
  };

  return (
    <div className="container py-5">
      <h1>Admin Dashboard</h1>
      <PropertyForm onSubmit={handleFormSubmit} property={editingProperty} />
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
                <button className="btn btn-primary me-2" onClick={() => handleEdit(property)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(property.id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboardPage;
