import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import { useGetProductsQuery } from "../store/slices/products";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { Link } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const Home = () => {
  // page number form params
  const { pageNumber, keyword } = useParams();

  // fetching products
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <h2>...Loading</h2>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <Meta title={"ECOMMERCE STORE: HOME"} />
          <h1>latest products</h1>
          <Row>
            {data?.products &&
              data?.products.map((product) => {
                return (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                );
              })}
          </Row>
          <Paginate pages={data?.pages} currentPage={data?.page}></Paginate>
        </>
      )}
    </>
  );
};

export default Home;
