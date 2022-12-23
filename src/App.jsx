import React, { useState, useEffect } from "react";
import "./App.css";
// import Loader from "./components/loader/loader";
import { StateContext } from "./context/context";

import AdminMain from "./pages/adminMain/adminMain";
import Example from "./pages/example/example";
import Homepage from "./pages/homePage/homepage";

import { BrowserRouter, Routes, Route, } from "react-router-dom";
import ProtectedRoutes from "./routes/protectedRoutes";
import Loader from "./components/loader/loader";
import Certficates from "./pages/certificates/certificates";
import CertficatesUser from "./pages/certificatesUser/certificatesUser";
import CertficatesByID from "./pages/certificateByID/certificateByID";
import GalleryComp from "./pages/gallery/gallery";
import "./i18n"
import { useTranslation } from "react-i18next";

function App() {
  const [addFileOpen, setAddFileOpen] = useState(false)
  const [adminNavbarOpen, setadminNavbarOpen] = useState(false)
  const [userNavbarOpen, setuserNavbarOpen] = useState(false)
  const [loggedIn, setloggedIn] = useState("")
  const [loginToggle, setloginToggle] = useState(false)
  const [loader, setLoader] = useState(false)
  const [uploadNew, setUploadNew] = useState(false)


  setTimeout(() => {
    setLoader(true)
  }, 1000);
  useEffect(() => {
    setloggedIn(localStorage.getItem("access"))
  }, [loginToggle])

  const { i18n } = useTranslation()

  useEffect(() => {
    let lang = localStorage.getItem("lang")
    const languageValue = lang
    i18n.changeLanguage(languageValue);
  }, [])

  return (
    <div className="app">
      <StateContext.Provider value={{
        addFileOpen,
        setAddFileOpen,
        adminNavbarOpen,
        setadminNavbarOpen,
        userNavbarOpen,
        setuserNavbarOpen,
        loggedIn,
        setloggedIn,
        loginToggle,
        setloginToggle,
        uploadNew,
        setUploadNew
      }}>
        <BrowserRouter>
          {
            !loader ?
              <Loader />
              :
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/userCertificates" element={<CertficatesUser />} />
                <Route path="/userCertificates/:id" element={<CertficatesByID />} />
                <Route path="/gallery" element={<GalleryComp />} />

                <Route element={<ProtectedRoutes />}>
                  <Route path="/admin" element={<AdminMain />} />
                  <Route path="/certificates/:id" element={<Certficates />} />
                </Route>
              </Routes>
          }
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
}

export default App;