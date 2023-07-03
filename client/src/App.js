import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shipping from "./pages/Shipping";
import NotFound from "./components/NotFound";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import ProfileScreen from "./pages/ProfileScreen";
import OrderList from "./pages/admin/OrderList";
import ProductList from "./pages/admin/ProductList";
import ProductEdit from "./pages/admin/ProductEdit";
import UserList from "./pages/admin/UserList";
import UserEdit from "./pages/admin/UserEdit";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/page/:pageNumber" element={<Home />} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<Home />}
            />
            <Route
              path="/search/:keyword/product/:id"
              element={<ProductPage />}
            />
            <Route
              path="/page/:pageNumber/product/:id"
              element={<ProductPage />}
            />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/profile" element={<ProfileScreen />} />

            <Route path="/admin/orderlist" element={<OrderList />} />
            <Route path="/admin/productlist" element={<ProductList />} />
            <Route
              path="/admin/productlist/:pageNumber"
              element={<ProductList />}
            />
            <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
            <Route path="/admin/userlist" element={<UserList />} />
            <Route path="admin/userlist/:id/edit" element={<UserEdit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
