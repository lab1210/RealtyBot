import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function PropertyListingsPage() {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);
  const [pageSize] = useState(10);

  useEffect(() => {
    fetchProperties(page);
  }, [page]);

  const fetchProperties = (page) => {
    axios.get(`http://localhost:5000/api/properties?page=${page}&page_size=${pageSize}`)
      .then(response => {
        setProperties(response.data.properties);
        setTotalProperties(response.data.total_properties);
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
      });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container py-5">
      <h1>Property Listings</h1>
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
                <Link to={`/properties/${property.id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(page - 1)}>Previous</button>
          </li>
          {Array.from({ length: Math.ceil(totalProperties / pageSize) }, (_, index) => (
            <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
            </li>
          ))}
          <li className={`page-item ${page === Math.ceil(totalProperties / pageSize) ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(page + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PropertyListingsPage;
