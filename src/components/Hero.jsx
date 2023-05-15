import React from "react";
import icon from "./images/logo.png";
import bitcoin from "./images/illustration.png";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-main">
        <div className="hero-text">
          <div className="hero-title-logo-container">
            <img className="hero-logo" src={icon} alt="icon" />
            <h1 className="hero-title">COINDASH</h1>
          </div>
          <div className="hero-container-text">
            <p className="hero-p">
              Explore the world of crypto with us. Discover the latest news,
              trends, and insights that will help you stay ahead in this
              exciting and rapidly evolving market.
            </p>
          </div>
          <button className="hero-btn">View Cryptos</button>
        </div>
        <div className="hero-img">
          <img className="hero-bitcoin" src={bitcoin} alt="bitcoin" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
