import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../store/slices/user";
import { setCredentials } from "../store/slices/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState(""); // State variable to hold the email input value
  const [password, setPassword] = useState(""); // State variable to hold the password input value

  const dispatch = useDispatch(); // Access the dispatch function from Redux
  const navigate = useNavigate(); // Access the navigation function from React Router

  const [login, { isLoading }] = useLoginMutation(); // Use the login mutation and get the loading state

  const { userInfo } = useSelector((state) => state.auth); // Get the user info from the Redux store

  const { search } = useLocation(); // Get the current location
  const sp = new URLSearchParams(search); // Create a URLSearchParams object from the query string
  const redirect = sp.get("redirect") || "/"; // Get the redirect parameter from the query string or set a default value

  useEffect(() => {
    // Perform an effect when the user info or redirect value changes
    if (userInfo) {
      navigate(redirect); // Redirect the user to the specified page after successful login
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap(); // Call the login mutation and handle the response

      dispatch(setCredentials({ ...res })); // Set the user credentials in the Redux store
      navigate(redirect); // Redirect the user to the specified page after successful login
    } catch (error) {
      toast.error(error?.data?.message || error?.error); // Display an error message using toast
    }
  };

  // test customer login
  const testCustomerLoginHandler = async () => {
    try {
      const res = await login({
        email: "rock@gmail.com",
        password: "123456",
      }).unwrap(); // Call the login mutation and handle the response

      dispatch(setCredentials({ ...res })); // Set the user credentials in the Redux store
      navigate(redirect); // Redirect the user to the specified page after successful login
    } catch (error) {
      toast.error(error?.data?.message || error?.error); // Display an error message using toast
    }
  };

  // test admin login
  const testAdminLoginHandler = async () => {
    try {
      const res = await login({
        email: "admin@gmail.com",
        password: "123456",
      }).unwrap(); // Call the login mutation and handle the response

      dispatch(setCredentials({ ...res })); // Set the user credentials in the Redux store
      navigate(redirect); // Redirect the user to the specified page after successful login
    } catch (error) {
      toast.error(error?.data?.message || error?.error); // Display an error message using toast
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        {/* Email input field */}
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* Password input field */}
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Submit button */}
        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          disabled={isLoading}
        >
          Sign In
        </Button>

        {/* Loading indicator */}
        {isLoading && <h3>...Loading</h3>}
      </Form>

      {/* test customer login button */}
      <Button
        type="submit"
        variant="primary"
        className="mt-3"
        disabled={isLoading}
        onClick={testCustomerLoginHandler}
      >
        Test Customer Login
      </Button>

      {/* test admin login button */}
      <Button
        type="submit"
        variant="primary"
        className="mt-3 mx-3"
        disabled={isLoading}
        onClick={testAdminLoginHandler}
      >
        Test Admin Login
      </Button>

      {/* Link to registration page */}
      <Row className="py-3">
        <Col>
          New customer?{" "}
          {/* Link to the registration page with a redirect parameter */}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
