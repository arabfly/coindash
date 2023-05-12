import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

import Loader from "./Loader";

// Typography and Select
const { Text, Title } = Typography;
const { Option } = Select;

// News
const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  // fetch crypto news
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 7 : 12,
  });

  // get 100 cryptocurrencies
  const { data } = useGetCryptosQuery(100);

  // Loading
  if (!cryptoNews?.value) return <Loader />;

  return (
    <div className="news-page">
      <Row gutter={[24, 24]}>
        {/* Select a Crypto */}
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {/* Cryptocurrencies */}
              {data?.data?.coins.map((coin, i) => (
                <Option value={coin.name} key={i}>
                  {coin.name}
                </Option>
              ))}
            </Select>
          </Col>
        )}

        {/* Crypto News */}
        {cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div class="cardBox">
                <div class="card">
                  <div class="h4">
                    <img
                      className="news-img"
                      src={news?.image?.thumbnail?.contentUrl}
                      alt={news.name}
                      style={{ maxWidth: "200px", maxHeight: "100px" }}
                    />
                    <h1 className="news-title" level={4}>
                      {news.name}
                    </h1>
                    <div className="provider">
                      <img
                        className="news-provider-img"
                        src={news.provider[0]?.image?.thumbnail?.contentUrl}
                        alt={news.provider[0]?.name}
                      />
                      <h1 className="provider-name">
                        {moment(news.datePublished).startOf("ss").fromNow()}
                      </h1>
                    </div>
                  </div>

                  <div class="content">
                    <div class="h3">Description</div>
                    <p>
                      {news.description > 100
                        ? `${news.description.substring(0, 100)}...`
                        : news.description}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
