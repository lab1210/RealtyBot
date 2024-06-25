import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/HomePage.css';
import slide1 from "./img/home_img.avif"
import slide2 from "./img/carousel-1.jpg"
import slide3 from "./img/carousel-2.jpg"


function HomePage() {
  return (
    <div className="container py-5">
      <div id="realtyCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#realtyCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#realtyCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#realtyCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={slide1} className="d-block w-100" alt="Real Estate 1" />
            <div className="carousel-caption d-none d-md-block">
              <h2>Beautiful Homes</h2>
              <p>Find the home of your dreams with Realty Bot.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={slide2} className="d-block w-100" alt="Real Estate 2" />
            <div className="carousel-caption d-none d-md-block">
              <h2>Luxury Apartments</h2>
              <p>Discover luxury living in prime locations.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={slide3} className="d-block w-100" alt="Real Estate 3" />
            <div className="carousel-caption d-none d-md-block">
              <h2>Commercial Properties</h2>
              <p>Invest in commercial properties with high ROI.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#realtyCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#realtyCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="jumbotron mt-4">
        <h1 className="display-4">Welcome to Realty Bot</h1>
        <p className="lead">Find your dream property with our advanced recommendation system.</p>
        <hr className="my-4" />
      </div>
    </div>
  );
}

export default HomePage;
