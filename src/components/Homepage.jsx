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
        <Title level={2} className="heading">
          GLOBAL STATISTICS
        </Title>
        <div className="grid-container">
          <div>
            <Col className="grid-item">
              <p>Total Cryptocurrencies</p>
              <Statistic className="grid-stat" value={globalStats.total} />
            </Col>
            <Col className="grid-item">
              <p>Total Market Cap</p>
              <Statistic
                className="grid-stat"
                value={millify(globalStats.totalMarketCap)}
              />
            </Col>
          </div>
          <div>
            <Col className="grid-item">
              <p>Total 24h Volume</p>
              <Statistic
                className="grid-stat"
                value={millify(globalStats.total24hVolume.toString())}
              />
            </Col>
            <Col className="grid-item">
              <p>Total Markets</p>
              <Statistic
                className="grid-stat"
                value={millify(globalStats.totalMarkets)}
              />
            </Col>
          </div>
        </div>
        <div className="home-heading-container">
          <Title level={2} className="home-title">
            Top Cryptocurrencies
          </Title>
          <Title level={3} className="show-more">
            <Link to={"/cryptocurrencies"}>View All</Link>
          </Title>
        </div>
        <Cryptocurrencies simplified />
        <div className="home-heading-container">
          <Title level={2} className="home-title">
            Latest Crypto News
          </Title>
          <Title level={3} className="show-more">
            <Link to={"/news"}>Explore</Link>
          </Title>
        </div>
        <News simplified />
      </main>
    </div>
  );
};

export default Homepage;
