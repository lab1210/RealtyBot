import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PropertyForm({ onSubmit, property }) {
  const [formData, setFormData] = useState({
    address: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    parking_spaces: '',
    image_url: '',
    description: ''
  });

  useEffect(() => {
    if (property) {
      setFormData({
        address: property.address,
        price: property.price,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        parking_spaces: property.parking_spaces,
        image_url: property.image_url,
        description: property.description
      });
    } else {
      setFormData({
        address: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        parking_spaces: '',
        image_url: '',
        description: ''
      });
    }
  }, [property]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{property ? 'Edit Property' : 'Add Property'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
            <input
              type="number"
              className="form-control"
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bathrooms" className="form-label">Bathrooms</label>
            <input
              type="number"
              className="form-control"
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="parking_spaces" className="form-label">Parking Spaces</label>
            <input
              type="number"
              className="form-control"
              id="parking_spaces"
              name="parking_spaces"
              value={formData.parking_spaces}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image_url" className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">{property ? 'Update' : 'Add'} Property</button>
        </form>
      </div>
    </div>
  );
}

export default PropertyForm;
