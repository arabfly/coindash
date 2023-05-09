import React from "react";
import icon from "./images/logo.png";
import bitcoin from "./images/bitcoin.png";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-main">
        <div>
          <div className="hero-title-logo-container">
            <img className="hero-logo" src={icon} alt="icon" />
            <h1 className="hero-title">CoinDash</h1>
          </div>
          <p className="hero-p">
            Explore the world of crypto with us. Discover the latest news,
            trends, and insights that will help you stay ahead in this exciting
            and rapidly evolving market.
          </p>
        </div>
        <img className="hero-bitcoin" src={bitcoin} alt="bitcoin" />
      </div>
    </div>
  );
};

export default Hero;
