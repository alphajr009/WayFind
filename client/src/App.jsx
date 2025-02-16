import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import PlanTrip from "./pages/PlanTrip/PlanTrip";


function App() {
  return (
    <div className="App">
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} exact />  
          <Route path="/home" element={<Home />} exact />  
          <Route path="/plantrip" element={<PlanTrip />} exact />     
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
