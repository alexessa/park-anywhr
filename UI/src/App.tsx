import { Route, Routes } from "react-router-dom";

import { MainLayout } from "./components";
import ParkingAreaComponent from "./components/parking-area/parking-area.component";
import "./index.css";

export const App = () => {
  return (
    <>
      <MainLayout />
      <Routes>
        <Route path="/" element={<ParkingAreaComponent />} />
      </Routes>
    </>
  );
};

export default App;
