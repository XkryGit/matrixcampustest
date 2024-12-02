import React from "react";
import { Routes, Route } from "react-router-dom";
import routesConfig from "./routesConfig";

const AppRoutes = ({ podcasts }) => (
  <Routes>
    {routesConfig.map(({ path, element: Element }) => (
      <Route key={path} path={path} element={<Element podcasts={podcasts} />} />
    ))}
  </Routes>
);

export default AppRoutes;
