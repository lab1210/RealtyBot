import React, { useState, useEffect } from 'react';

function PropertyForm({ onSubmit, property }) {
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [parkingSpaces, setParkingSpaces] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (property) {
      setAddress(property.address);
      setPrice(property.price);
      setBedrooms(property.bedrooms);
      setBathrooms(property.bathrooms);
      setParkingSpaces(property.parking_spaces);
      setImageUrl(property.image_url);
      setDescription(property.description);
    }
  }, [property]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const propertyData = { address, price, bedrooms, bathrooms, parking_spaces: parkingSpaces, image_url: imageUrl, description };
    onSubmit(propertyData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price</label>
        <input type="text" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
        <input type="number" className="form-control" id="bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="bathrooms" className="form-label">Bathrooms</label>
        <input type="number" className="form-control" id="bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="parkingSpaces" className="form-label">Parking Spaces</label>
        <input type="number" className="form-control" id="parkingSpaces" value={parkingSpaces} onChange={(e) => setParkingSpaces(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="imageUrl" className="form-label">Image URL</label>
        <input type="text" className="form-control" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default PropertyForm;
