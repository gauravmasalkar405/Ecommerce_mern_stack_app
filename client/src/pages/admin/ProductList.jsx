import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../../store/slices/products";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProductList = () => {
  // user info from state
  const { userInfo } = useSelector((state) => state.auth);

  // get products
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  // create products
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  // delete product
  const deleteHandler = async (id) => {};

  // create product handler
  const createProductHandler = async () => {
    if (window.confirm("Create new product ?")) {
      try {
        await createProduct(userInfo._id);
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <h1>...Loading</h1>}

      {isLoading ? (
        <h2>...Loading</h2>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm mx-2">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductList;
