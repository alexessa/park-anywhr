import { Route, Routes } from "react-router-dom";

import { MainLayout } from "./components";
import ParkingAreaComponent from "./components/parking-area/parking-area.component";
import CreateParkingArea from "./components/parking-area/create-parking-area.component";
import UpdateParkingArea from "./components/parking-area/update-parking-area.component";
import "./index.css";

export const App = () => {
  return (
    <>
      <MainLayout />
      <Routes>
        <Route path="/" element={<ParkingAreaComponent />} />
        <Route path="parking/:parkingId" element={<UpdateParkingArea />} />
        <Route path="/add-parking-area" element={<CreateParkingArea />} />
      </Routes>
    </>
  );
};

export default App;
