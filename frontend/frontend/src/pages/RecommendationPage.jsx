import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PropertyCard from "../components/PropertyCard";
import { toast } from "react-toastify";

function RecommendationPage() {
  const [description, setDescription] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken"); // Get the token from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login page if not authenticated
    } else {
      // Load recommendations from local storage if available
      const savedRecommendations = localStorage.getItem("recommendations");
      if (savedRecommendations) {
        setRecommendations(JSON.parse(savedRecommendations));
      }
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error("Please enter a description");

      return;
    }
    setLoading(true);
    axios
      .post(
        "http://localhost:5000/api/recommendations",
        { description },
        {
          headers: { Authorization: token },
        } // Include the token in the request headers
      )
      .then((response) => {
        setRecommendations(response.data);
        localStorage.setItem("recommendations", JSON.stringify(response.data));
      })

      .catch((error) => {
        console.error("Error fetching recommendations:", error);
        toast.error("Unstable Network. Please try again later.");
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
        <button type="submit" className="btn btn-dark">
          Get Recommendations
        </button>
      </form>

      {loading && (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="container py-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-4">
          {recommendations.map((property, index) => (
            <PropertyCard
              key={index}
              property={property}
              userId={userId}
              fetchProperties={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecommendationPage;
