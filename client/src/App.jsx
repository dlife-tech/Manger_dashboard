import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//  Auth Components
import Signup from "./Owner_Authentication/Signup";
import Login from "./Owner_Authentication/Login";
import EmailVerification from "./Owner_Authentication/EmailVerification";
import ForgotPassword from "./Owner_Authentication/ForgotPassword";
import ResetPassword from "./Owner_Authentication/ResetPassword";
import ProtectedRoute from "./Owner_Authentication/ProtectedRoute";
import Navbar from "./Owner_Authentication/Navbar.jsx";
import PublicHome from "./Owner_Authentication/PublicHome.jsx";

//  Zustand store
import { useAuthStore } from "./store/authStore";

//  Dashboard and Forms
import Dashboard from "./Dashboard/Dashboard";
import Home from "./Dashboard/Home.jsx";
import HotelRegistration1 from './Dashboard/Hotel_registration/HotelRegistration1';
import HotelRegistration2 from './Dashboard/Hotel_registration/HotelRegistration2';
import ResortRegistration1 from './Dashboard/Resort-Registration/Regisration1';
import ResortRegistration2 from './Dashboard/Resort-Registration/Registration2';
import LodgeRegistration1 from './Dashboard/Lodge-registration/Lodge_registration1';
import LodgeRegistration2 from './Dashboard/Lodge-registration/Lodge_registration2';
import GuestHouseRegistration1 from './Dashboard/Guest-House_Registration/Guest_House_regist.jsx';
import GuestHouseRegistration2 from './Dashboard/Guest-House_Registration/Guest_house_regist2.jsx';
import PlaceRegistration1 from './Dashboard/Place_Registration/Place_Registration1.jsx';
import PlaceRegistration2 from './Dashboard/Place_Registration/Place_Registration2.jsx';
import HouseboatRegistration1 from './Dashboard/HouseboatRegistration/Houseboat_Registration1.jsx';
import HouseboatRegistration2 from './Dashboard/HouseboatRegistration/Houseboat_Registration2.jsx';
import VillaRegistration1 from './Dashboard/Villa-registration/Villa_Registration1.jsx';
import VillaRegistration2 from './Dashboard/Villa-registration/Villa_Registration2.jsx';
import HomestayRegistration1 from './Dashboard/Homestay/Homestay_registration1.jsx';
import HomestayRegistration2 from './Dashboard/Homestay/Homestay_registration2.jsx';
import CottageRegistration1 from './Dashboard/Cottage_registration/Cottage_registration1.jsx';
import CottageRegistration2 from './Dashboard/Cottage_registration/Cottage_registration2.jsx';
import ApartmentRegistration1 from './Dashboard/Apartment_registration/Apartment_registration1.jsx';
import ApartmentRegistration2 from './Dashboard/Apartment_registration/Apartment_registration2.jsx';
import ApartHouse1 from './Dashboard/Apart-Hotel_Registration/Apart_hotel_registration1.jsx';
import ApartHouse2 from './Dashboard/Apart-Hotel_Registration/Apart_hotel_registration2.jsx';
import HostelRegistration1 from './Dashboard/Hostel_registration/Hostel_registration1.jsx';
import HostelRegistration2 from './Dashboard/Hostel_registration/Hostel_registration2.jsx';

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const location = useLocation(); //  Fix added here

  useEffect(() => {
    checkAuth(); // Check localStorage/token when app loads
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
        <div className="text-center">
          <div className="spinner-border text-light" role="status" />
          <div className="mt-2">Checking authentication...</div>
        </div>
      </div>
    );
  }

  //  Show Navbar only on public pages
  const showNavbar = !location.pathname.startsWith("/dashboard");

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        {/*  Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/publichome" element={<PublicHome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/*  Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="HotelRegistration1" element={<HotelRegistration1 />} />
          <Route path="HotelRegistration2" element={<HotelRegistration2 />} />
          <Route path="ResortRegistration1" element={<ResortRegistration1 />} />
          <Route path="ResortRegistration2" element={<ResortRegistration2 />} />
          <Route path="LodgeRegistration1" element={<LodgeRegistration1 />} />
          <Route path="LodgeRegistration2" element={<LodgeRegistration2 />} />
          <Route path="GuestHouseRegistration1" element={<GuestHouseRegistration1 />} />
          <Route path="GuestHouseRegistration2" element={<GuestHouseRegistration2 />} />
          <Route path="PlaceRegistration1" element={<PlaceRegistration1 />} />
          <Route path="PlaceRegistration2" element={<PlaceRegistration2 />} />
          <Route path="HouseboatRegistration1" element={<HouseboatRegistration1 />} />
          <Route path="HouseboatRegistration2" element={<HouseboatRegistration2 />} />
          <Route path="VillaRegistration1" element={<VillaRegistration1 />} />
          <Route path="VillaRegistration2" element={<VillaRegistration2 />} />
          <Route path="HomestayRegistration1" element={<HomestayRegistration1 />} />
          <Route path="HomestayRegistration2" element={<HomestayRegistration2 />} />
          <Route path="CottageRegistration1" element={<CottageRegistration1 />} />
          <Route path="CottageRegistration2" element={<CottageRegistration2 />} />
          <Route path="ApartmentRegistration1" element={<ApartmentRegistration1 />} />
          <Route path="ApartmentRegistration2" element={<ApartmentRegistration2 />} />
          <Route path="ApartHouseRegistration1" element={<ApartHouse1 />} />
          <Route path="ApartHouseRegistration2" element={<ApartHouse2 />} />
          <Route path="HostelRegistration1" element={<HostelRegistration1 />} />
          <Route path="HostelRegistration2" element={<HostelRegistration2 />} />
        </Route>

        {/*  Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
