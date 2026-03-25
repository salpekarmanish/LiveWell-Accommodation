import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from './pages/PageNotFound';
import Private from './ui/private';
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import styled from 'styled-components';
import PropertySearch from './pages/PropertySearch';
import PropertyDetailPage from './pages/PropertyDetailPage ';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AddFlat from './pages/AddFlat';
import MediaUploadPage from './pages/MediaUploadPage ';
import UpdateFlat from './pages/UpdateFlat';
import SignupForm from './pages/SignupForm';
import WhyChooseUs from './components/WhyChooseUs';
import AboutUs from './components/AboutUsChoose';
import AllProperties from './pages/AllProperties';
import OtpVerification from './pages/OtpVerification';
import AnalyticsDashboard from './pages/Admin/AnalyticsDashboard';
import VerifyUserPage from './pages/Admin/VerifyUserPage';
import ComplaintsPage from './pages/Admin/ComplaintsPage';
import SearchUserPage from './pages/Admin/SearchUserPage';
import AdminLogin from './pages/Admin/AdminLogin';
import Property360View from './components/Property360View';
import RegisterProperty from './components/Location/RegisterProperty';
import ComplaintPage from './pages/ComplaintPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const AppContainer = styled.div`
  font-family: 'Inter', sans-serif;
`;

function App() {

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <AppContainer>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<Private />}>
              <Route path="/property-search" element={<PropertySearch />} />
              <Route path="/property-detail/:flatId" element={<PropertyDetailPage />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/verify-otp" element={<OtpVerification />} />
              <Route path="/all-properties" element={<AllProperties />} />
              <Route path="/all-bookings" element={<AllProperties />} />
              <Route path="/addFlat" element={<AddFlat />} />
              <Route path="/flat/update/:flatId" element={<UpdateFlat />} />
              <Route path="/upload/flat/:flatId" element={<MediaUploadPage />} />
              <Route path="/admin/analysis" element={<AnalyticsDashboard />} />
              <Route path="/admin/verifyUser" element={<VerifyUserPage />} />
              <Route path="/admin/complaints" element={<ComplaintsPage />} />
              <Route path="/admin/searchUsers" element={<SearchUserPage />} />
              <Route path="/get-location" element={<RegisterProperty />} />
              <Route path="/complaints" element={<ComplaintPage />} />

            </Route>
            {/* <Route path="/chat" element={<ChatPageComponent />} /> */}
            <Route path="/property360view" element={<Property360View />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/resetPassword/:resetToken" element={<ResetPassword />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            {/* <Route path="createAdmin" element={<CreateAdmin />} /> */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </AppContainer>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
