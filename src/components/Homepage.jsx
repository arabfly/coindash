import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../components";
import Loader from "./Loader";
import Hero from "./Hero";
import statsImg from "./images/statsImg.jpg";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data.stats;

  if (isFetching) return <Loader />;

  function millify(number, precision = 2) {
    const prefixes = ["", "k", "M", "B", "T", "Q", "Q"];
    const base = 1000;
    let exponent = 1;

    // Handle very large numbers using BigInt constructor
    if (typeof number === "string" && number.startsWith("9")) {
      const bigNumber = BigInt(number);
      exponent = Math.min(
        Math.floor(bigNumber.toString().length / 3),
        prefixes.length - 1
      );
      number = bigNumber / BigInt(base ** exponent);
    } else {
      exponent = Math.min(
        Math.floor(Math.log10(Math.abs(number)) / 3),
        prefixes.length - 1
      );
      number = number / base ** exponent;
    }

    const result = parseFloat(number.toFixed(precision));

    return result + prefixes[exponent];
  }

  return (
    <div className="main-homepage">
      <div>
        <Hero />
      </div>
      <div className="about-us">
        <h1>About Us</h1>
        <p>
          Stay up-to-date on the latest developments in the world of
          cryptocurrencies with our platform. Our website provides users with
          real-time information on global stats, news, and changes in the crypto
          market.
        </p>
      </div>
      <div className="stats-img-container">
        <img className="stats-img" src={statsImg} alt="stats img" />
      </div>
      <main className="homepage">
        <h1 level={2} className="heading">
          GLOBAL STATISTICS
        </h1>
        <div className="grid-container">
          <div className="grid-item">
            <p>TOTAL CRYPTOS</p>
            <p className="grid-stat">{globalStats.total}</p>
          </div>
          <span class="vertical-line"></span>
          <div className="grid-item">
            <p>TOTAL MARKET CAP</p>
            <p className="grid-stat">{millify(globalStats.totalMarketCap)}</p>
          </div>
          <span class="vertical-line"></span>
          <div className="grid-item">
            <p>TOTAL 24H VOLUME</p>
            <p className="grid-stat">
              {millify(globalStats.total24hVolume.toString())}
            </p>
          </div>
          <span class="vertical-line"></span>
          <div className="grid-item">
            <p>TOTAL MARKETS</p>
            <p className="grid-stat">{millify(globalStats.totalMarkets)}</p>
          </div>
        </div>
        <div className="news-heading">
          <div className="home-heading-container">
            <h1 className="home-title">Top Cryptocurrencies</h1>
            <h1 className="show-more">
              <Link className="home-link" to={"/cryptocurrencies"}>
                All
              </Link>
            </h1>
          </div>
          <p className="crypto-p">
            Discover cryptocurrencies with the most current information on
            market trends, price fluctuations and other key data to help you
            make informed invesment decisions
          </p>
        </div>
        <Cryptocurrencies simplified />
        <div className="news-heading">
          <div className="home-heading-container">
            <h1 className="news-home-title">Latest Crypto News</h1>
            <h1 className="show-more">
              <Link className="home-link" to={"/news"}>
                Explore
              </Link>
            </h1>
          </div>
          <p className="news-p">
            Stay informed by using our search feature for the latest news on
            your favorite cryptocurrencies
          </p>
        </div>

        <News simplified />
      </main>
    </div>
  );
};

export default Homepage;
