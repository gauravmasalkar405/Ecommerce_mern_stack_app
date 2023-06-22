import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import { productsRoute } from "../api/product";

const Home = () => {
  const [products, setProducts] = useState();

  // fetching products
  useEffect(() => {
    const fetchProducts = async () => {
      const productResponse = await axios.get(`${productsRoute}`);
      setProducts(productResponse.data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>latest products</h1>
      <Row>
        {products &&
          products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default Home;
