import { Box } from "@mui/material";
import React, { useState } from "react";
import Login from "./auth/Login";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import BlogHome from "./home/BlogHome";
import Header from "./header/Header";
import CreatePost from "../createpost/CreatePost";
import DetailView from "./detailView/DetailView";
import Update from "./update/Update";
const ProtectedRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login"></Navigate>
  );
};
function Home() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <BrowserRouter>
      <Box
        style={{
          marginTop: "60px",
        }}
      >
        <Routes>
          <Route
            path="/login"
            element={<Login isUserAuthenticated={isUserAuthenticated} />}
          ></Route>
          <Route
            path="/"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
          >
            <Route path="/" element={<BlogHome />}></Route>
          </Route>

          <Route
            path="/create"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
          >
            <Route path="/create" element={<CreatePost />}></Route>
          </Route>
          <Route
            path="/detail/:id"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
          >
            <Route path="/detail/:id" element={<DetailView />}></Route>
          </Route>
          <Route
            path="/update/:id"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
          >
            <Route path="/update/:id" element={<Update />}></Route>
          </Route>
    
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default Home;
