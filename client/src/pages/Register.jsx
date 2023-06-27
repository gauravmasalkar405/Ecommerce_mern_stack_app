import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../store/slices/user";
import { setCredentials } from "../store/slices/auth";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // State variable to hold the email input value
  const [password, setPassword] = useState(""); // State variable to hold the password input value
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch(); // Access the dispatch function from Redux
  const navigate = useNavigate(); // Access the navigation function from React Router

  const [register, { isLoading }] = useRegisterMutation(); // Use the login mutation and get the loading state

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

    if (password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap(); // Call the login mutation and handle the response

        dispatch(setCredentials({ ...res })); // Set the user credentials in the Redux store
        navigate(redirect); // Redirect the user to the specified page after successful login
      } catch (error) {
        toast.error(error?.data?.message || error?.error); // Display an error message using toast
      }
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

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

        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Submit button */}
        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          disabled={isLoading}
        >
          Sign Up
        </Button>

        {/* Loading indicator */}
        {isLoading && <h3>...Loading</h3>}
      </Form>

      {/* Link to registration page */}
      <Row className="py-3">
        <Col>
          Already have an account?{" "}
          {/* Link to the registration page with a redirect parameter */}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
