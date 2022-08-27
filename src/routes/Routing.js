import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { map } from "lodash";
import configRouting from "./configRouting";

export default function Routing() {
  return (
    <Router>
      <Routes>
        {map(configRouting, (route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
      </Routes>
    </Router>
  );
}
