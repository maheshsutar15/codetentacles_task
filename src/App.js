import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";
import Stepperform from "./pages/Stepperform";
import Product from "./pages/sales/Listproduct";
import Addproduct from "./pages/sales/Addproduct";
import { store } from './Redux/Store/Store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.token);
  if (!allowedRoles.includes(role)) {
    window.history.back()
    return
  }
  if (token === "") {
    window.location.href = "/"
    return
  }

  return children;
};

function App() {
  return (
    <>
      <ToastContainer position="top-right"
        autoClose={2000} />

      <Provider store={store}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/List"
                element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <List />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Stepperform"
                element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <Stepperform />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Product"
                element={
                  <ProtectedRoute allowedRoles={['User']}>
                    <Product />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Add-product"
                element={
                  <ProtectedRoute allowedRoles={['User']}>
                    <Addproduct />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </Provider>
    </>
  );
}

export default App;
