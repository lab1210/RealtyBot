import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function PropertyListingsPage() {
  const [properties, setProperties] = useState([]);
  const [propertiesPerPage] = useState(10);
  const [pageRange, setPageRange] = useState([1, 5]);

  const userId = localStorage.getItem('userId');
  const query = useQuery();
  const navigate = useNavigate();
  const currentPage = parseInt(query.get('page') || '1', 10);

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

  // Get current properties
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  // Change page
  const paginate = pageNumber => {
    navigate(`?page=${pageNumber}`);
  };

  // Update page range
  const handleNextPageRange = () => {
    const totalPages = Math.ceil(properties.length / propertiesPerPage);
    if (pageRange[1] < totalPages) {
      setPageRange([pageRange[0] + 5, pageRange[1] + 5]);
      paginate(pageRange[0] + 5);
    }
  };

  const handlePreviousPageRange = () => {
    if (pageRange[0] > 1) {
      setPageRange([pageRange[0] - 5, pageRange[1] - 5]);
      paginate(pageRange[0] - 5);
    }
  };

  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const pageNumbers = [];
  for (let i = pageRange[0]; i <= Math.min(pageRange[1], totalPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container py-5">
      <h1>Property Listings</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {currentProperties.map((property) => (
          <PropertyCard key={property.id} property={property} userId={userId} fetchProperties={fetchProperties} />
        ))}
      </div>
      <nav>
        <ul className="pagination justify-content-center" >
          {pageRange[0] > 1 && (
            <li className="page-item">
              <button  style={{color:"#fb771a"}}  className="page-link" onClick={handlePreviousPageRange}>&laquo;</button>
            </li>
          )}
          {pageNumbers.map(number => (
            <li  key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
              <button style={{backgroundColor:"#fb771a", color:"#fff",borderColor:"#fff"}}onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
          {pageRange[1] < totalPages && (
            <li className="page-item">
              <button  style={{color:"#fb771a"}} className="page-link" onClick={handleNextPageRange}>&raquo;</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default PropertyListingsPage;
