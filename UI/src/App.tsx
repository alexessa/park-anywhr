import { useCallback, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { MainLayout } from "./components";
import ParkingAreaComponent from "./components/parking-area/parking-area.component";
import CreateParkingArea from "./components/parking-area/create-parking-area.component";
import UpdateParkingArea from "./components/parking-area/update-parking-area.component";
import Authentication from "./components/user-related/authentication.component";
import UserProfile from "./components/user-related/user-profile.component";
import ParkingSpace from "./components/parking-space/parking-space.component";
import CreateCar from "./components/user-related/create-car.component";
import CreateParkingSpace from "./components/parking-space/create-space.component";
import SpaceBookingPage from "./components/booking/space-booking.component";
import BookingsPage from "./components/booking/booking.component";
import ReportsPage from "./components/reports/reports.component";
import { User } from "./models/user";
import { AuthContext } from "./common/context/authentication-context";
import "./index.css";
import "./index2.css";

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>();

  const login = useCallback((user: User) => {
    setIsLoggedIn(true);
    setUser(user);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(undefined);
  }, []);

  let routes: any;

  if (isLoggedIn) {
    routes = (
      <>
        <Routes>
          <Route path="/" element={<ParkingAreaComponent />} />
          <Route path="parking/:parkingId" element={<UpdateParkingArea />} />
          <Route path="parking/space/:parkingId" element={<ParkingSpace />} />
          <Route path="/parking/space/add/:parkingId" element={<CreateParkingSpace />} />
          <Route path="/parking/space/booking/:spaceKey" element={<SpaceBookingPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/add-parking-area" element={<CreateParkingArea />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/car" element={<CreateCar />} />
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
        value={{
          isLoggedIn: isLoggedIn,
          user: user as User,
          login: login,
          logout: logout,
        }}
      >
        <MainLayout />
        {routes}
      </AuthContext.Provider>
    </>
  );
};

export default App;
