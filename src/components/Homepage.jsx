import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../components";
import Loader from "./Loader";
import Hero from "./Hero";

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
      <main className="homepage">
        <h1 level={2} className="heading">
          GLOBAL STATISTICS
        </h1>
        <div className="grid-container">
          <Col className="grid-item">
            <p>TOTAL CRYPTOS</p>
            <p className="grid-stat">{globalStats.total}</p>
          </Col>
          <span class="vertical-line"></span>
          <Col className="grid-item">
            <p>TOTAL MARKET CAP</p>
            <p className="grid-stat">{millify(globalStats.totalMarketCap)}</p>
          </Col>
          <span class="vertical-line"></span>
          <Col className="grid-item">
            <p>TOTAL 24H VOLUME</p>
            <p className="grid-stat">
              {millify(globalStats.total24hVolume.toString())}
            </p>
          </Col>
          <span class="vertical-line"></span>
          <Col className="grid-item">
            <p>TOTAL MARKETS</p>
            <p className="grid-stat">{millify(globalStats.totalMarkets)}</p>
          </Col>
        </div>
        <div className="home-heading-container">
          <h1 className="home-title">Top Cryptocurrencies</h1>
          <h1 className="show-more">
            <Link className="home-link" to={"/cryptocurrencies"}>
              View All
            </Link>
          </h1>
        </div>
        <Cryptocurrencies simplified />
        <div className="home-heading-container">
          <h1 className="news-home-title">Latest Crypto News</h1>
          <h1 className="show-more">
            <Link className="home-link" to={"/news"}>
              Explore
            </Link>
          </h1>
        </div>
        <News simplified />
      </main>
    </div>
  );
};

export default Homepage;
