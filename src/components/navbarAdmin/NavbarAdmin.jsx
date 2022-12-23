import React, { useContext } from "react";
import Grid from "@mui/system/Unstable_Grid";
import LogoutIcon from "@mui/icons-material/Logout";
import "./NavbarAdmin.css";
import { StateContext } from "../../context/context";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import HomeMaxIcon from "@mui/icons-material/HomeMax";
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import { useNavigate } from "react-router-dom";
export function NavbarAdmin() {
  const {
    setAddFileOpen,
    loginToggle,
    setloginToggle,
    uploadNew,
    setUploadNew
  } = useContext(StateContext);
  const navigate = useNavigate()

  return (
    <Grid className="navbar" container>
      <Grid onClick={() => navigate("/admin")} item xs={4}>
        <h1 className="main pointer">Banktraining</h1>
      </Grid>
      <Grid className="d-flex align-center justify-end" item xs={8}>
        <ul className="d-flex align-center">
          <li onClick={() => navigate("/")}>Bosh sahifa</li>
          <li onClick={() => setUploadNew(true)}>Sert. qo'shish</li>
          <li onClick={() => setAddFileOpen(true)}>Fayl qo'shish</li>
        </ul>
        <LogoutIcon onClick={() => {
          localStorage.removeItem("access")
          navigate("/")
          setloginToggle(!loginToggle)
        }} className="main pointer" />
      </Grid>
    </Grid>
  );
}

export function NavbarMobile() {
  const { setAddFileOpen, adminNavbarOpen, setadminNavbarOpen, loginToggle,
    setloginToggle, setUploadNew } =
    useContext(StateContext);
  const navigate = useNavigate()
  return (
    <Grid className="navbarMobile" container>
      <Grid item xs={4}>
        <h1 onClick={() => {
          setadminNavbarOpen(false)
          navigate("/admin")
        }} className="main">Banktraining</h1>
      </Grid>
      <Grid className="d-flex align-center justify-end" item xs={8}>
        {/* <ul className="d-flex align-center">
          <li>Bosh sahifa</li>
          <li>Asosiy</li>
          <li onClick={() => setAddFileOpen(true)}>Fayl qo'shish</li>
        </ul> */}
        {adminNavbarOpen ? (
          <CloseIcon
            onClick={() => setadminNavbarOpen(false)}
            className="main"
          />
        ) : (
          <MenuIcon onClick={() => setadminNavbarOpen(true)} className="main" />
        )}
      </Grid>
      <div
        className={`
         ${adminNavbarOpen ? "mobileMenuActive" : "mobileMenuActiveNone"
          } mobileMenu`}
      >
        <div className="d-flex align-center justify-between">
          <h1>Banktraining</h1>
          <CloseIcon onClick={() => setadminNavbarOpen(false)} />
        </div>
        <ul>
          <li
            onClick={() => {
              setadminNavbarOpen(false)
              navigate("/")
            }}
            className="d-flex align-center mr-10"
          >
            <HomeMaxIcon /> Bosh sahifa
          </li>
          <li
            className="d-flex align-center mr-10"
            onClick={() => {
              // setAddFileOpen(true);
              setUploadNew(true)
              setadminNavbarOpen(false);
            }}
          >
            <NoteAddIcon />
            Sertifikat qo'shish
          </li>
          <li
            className="d-flex align-center mr-10"
            onClick={() => {
              setAddFileOpen(true);
              setadminNavbarOpen(false);
            }}
          >
            <NoteAddIcon />
            Fayl qo'shish
          </li>
          <li
            onClick={() => {
              setadminNavbarOpen(false);
              localStorage.removeItem("access")
              navigate("/")
              setloginToggle(!loginToggle)
            }}
            className="d-flex align-center mr-10"
          >
            <LogoutIcon />
            Profildan chiqish
          </li>
        </ul>
      </div>
    </Grid>
  );
}
