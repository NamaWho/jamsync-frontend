import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Dashboard from "../components/admin/Dashboard";
import Admin from "../components/admin/Admin";
import Login from "../components/signin/Login";
import Signup from "../components/signup/Signup";
import Homepage from "../components/homepage/Homepage";
import RegisteredUser from "../components/registereduser/RegisteredUser";
import Opportunity from "../components/opportunity/Opportunity";
import Edit from "../components/edit/Edit";
import Application from "../components/application/Application";

const Router = () => {
  return (
    <div className="h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/musicians/:id" element={<RegisteredUser type="musician"/>} />
          <Route path="/bands/:id" element={<RegisteredUser type="band"/>} />
          <Route path="/opportunities/:id" element={<Opportunity />} />
          <Route path="/applications/:id" element={<Application />} />
          {/* protected rout for edit */}
          <Route path="/edit/musician" element={<Edit type="musician"/>} />
          <Route path="/edit/band" element={<Edit type="band"/>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
