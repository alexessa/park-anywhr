import { useCallback, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { MainLayout } from "./components";
import ParkingAreaComponent from "./components/parking-area/parking-area.component";
import CreateParkingArea from "./components/parking-area/create-parking-area.component";
import UpdateParkingArea from "./components/parking-area/update-parking-area.component";
import Authentication from "./components/user-related/authentication.component";
import { AuthContext } from "./common/context/authentication-context";
import "./index.css";

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => setIsLoggedIn(true), []);
  const logout = useCallback(() => setIsLoggedIn(false), []);

  let routes: any;

  if (isLoggedIn) {
    routes = (
      <>
        <Routes>
          <Route path="/" element={<ParkingAreaComponent />} />
          <Route path="parking/:parkingId" element={<UpdateParkingArea />} />
          <Route path="/add-parking-area" element={<CreateParkingArea />} />
          <Route path="*" element={<ParkingAreaComponent />} />
        </Routes>
      </>
    );
  } else {
    routes = (
      <>
        <Routes>
          <Route path="/" element={<ParkingAreaComponent />} />
          <Route path="/authenticate" element={<Authentication />} />
          <Route path="*" element={<Authentication />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
      >
        <MainLayout />
        {routes}
      </AuthContext.Provider>
    </>
  );
};

export default App;
