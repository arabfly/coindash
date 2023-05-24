import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 6 : 100;

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <div className="cryptocurrencies-page">
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Crypto Currency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <div className="crypto-card-container">
        {cryptos?.map((currency) => (
          <div className="crypto-card" key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <div className="crypto-card-2">
                <div className="crypto-name">
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="icon crypto"
                    preview={false}
                  />
                  <h1>{currency.name}</h1>
                  <p
                    className={
                      currency.change < 0
                        ? "negative-change"
                        : "positive-change"
                    }
                  >
                    {millify(currency.change)}&#37;
                  </p>
                </div>
                <div className="crypto-info">
                  <p>${millify(currency.price)}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cryptocurrencies;
