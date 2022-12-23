import React, { useContext, useState, useEffect } from "react";
import Grid from "@mui/system/Unstable_Grid";
import LogoutIcon from "@mui/icons-material/Logout";
import "../navbarAdmin/NavbarAdmin.css";
import "./NavbarUser.css";
import { StateContext } from "../../context/context";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import HomeMaxIcon from "@mui/icons-material/HomeMax";
import LoginIcon from "@mui/icons-material/Login";
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import LoginModal from "../loginModal/loginModal";
import AnchorLink from 'react-anchor-link-smooth-scroll'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from "react-i18next";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "420px",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: "18px",
};

export function NavbarUser() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const { setloginToggle, loginToggle, loggedIn } =
    useContext(StateContext);

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const [show, setShow] = useState(false)

  const [loading, setloading] = useState(false)
  const [lang, setLang] = React.useState('uz');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    let lang = localStorage.getItem("lang")
    const languageValue = lang
    i18n.changeLanguage(languageValue);
    setLang(lang);

  }, [])
  const handleChange = (e) => {
    setLang(e.target.value);
    const languageValue = e.target.value
    i18n.changeLanguage(languageValue);
    localStorage.setItem("lang", e.target.value)

  };
  const loginHandle = () => {
    setloading(true)
    try {
      if (login && password) {
        axios.post(`${process.env.REACT_APP_API_KEY}auth/check`,
          {
            username: login,
            password: password,
          }
        ).then(res => {
          if (res.data.code == 0) {
            localStorage.setItem("access", res.data.data)
            setloginToggle(!loginToggle)
            handleClose()
            navigate("/admin")
          } else {

            setError("Login yoki parolda xatolik bor")
          }
          setloading(false)
        }).catch(err => {
          setloading(false)
        })
      } else {
        setloading(false)
        setError("Login va parolni kiritish majburiy")
      }
    } catch (err) {
      setloading(false)
    }
  }
  return (
    <Grid className="navbar user" container>
      <Grid onClick={() => navigate("/")} item xs={4}>
        <h1 className="main pointer ">Banktraining</h1>
      </Grid>
      <Grid className="d-flex align-center justify-end" item xs={8}>
        <ul className="d-flex align-center">

          <li className="pointer" onClick={() => navigate("/gallery")}><AnchorLink className="main">{t("gallery")}</AnchorLink></li>
          <li className="pointer"> <AnchorLink className="main" href='#about'>{t("about")}</AnchorLink></li>
          <li className="pointer"><AnchorLink className="main" href='#courses'>{t("courses")}</AnchorLink></li>
          <li className="pointer"><AnchorLink className="main" href='#contact'>{t("contacts")}</AnchorLink></li>
          <li onClick={() => navigate("/userCertificates")} className="pointer main">{t("certificates")}</li>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={lang}
            style={{ minWidth: "60px", padding: "5px 32px 5px 14px !important" }}
            onChange={handleChange}
          >
            <MenuItem value={"uz"}>Uz</MenuItem>
            <MenuItem value={"ru"}>Ру</MenuItem>
            {/* <MenuItem value={30}>En</MenuItem> */}
          </Select>
          <li className="d-flex align-center pointer">
            <button onClick={() => loggedIn ? navigate("/admin") : handleOpen()} className="loginButton">
              {t("login")}
            </button>
            {/* <LoginIcon style={{ marginLeft: "10px" }} /> */}
          </li>
        </ul>

      </Grid>
      {/* <LoginModal setOpen={setOpen} open={open} /> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} className="loginContent">
          <div className="d-block">
            <label htmlFor="login">{t("login")}</label>
            <br />
            <input className="input" onChange={(e) => setLogin(e.target.value)} type="text" id="login" placeholder="login" />
            <br />

            <label htmlFor="password">{t("parol")}</label>
            <br />
            <div className="passwordWrapper input">
              <input onChange={(e) => setPassword(e.target.value)} type={show ? "text" : "password"} id="password" placeholder="password" />
              {
                show ?
                  <VisibilityOffOutlinedIcon className="main pointer" onClick={() => setShow(false)} />
                  :
                  <VisibilityOutlinedIcon className="main pointer" onClick={() => setShow(true)} />
              }

            </div>
            <p className="error-message">{error}</p>
            <button
              onClick={loginHandle}
              className="callUs"
              disabled={loading ? true : false
              }
            >
              {
                loading ? <CircularProgress style={{ height: "100% !important" }} /> : "Kirish"
              }
            </button>
          </div>
        </Box>
      </Modal>
    </Grid>
  );
}





// -------------------------------------





export function NavbarUserMobile() {
  const { userNavbarOpen, setuserNavbarOpen, setloginToggle, loginToggle, loggedIn } =
    useContext(StateContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const [loading, setloading] = useState(false)

  const [show, setShow] = useState(false)


  const loginHandle = () => {
    setloading(true)
    try {
      if (login && password) {
        axios.post(`${process.env.REACT_APP_API_KEY}auth/check`,
          {
            username: login,
            password: password,
          }
        ).then(res => {
          if (res.data.code == 0) {
            localStorage.setItem("access", res.data.data)
            setloginToggle(!loginToggle)
            handleClose()
            navigate("/admin")
          } else {

            setError("Login yoki parolda xatolik bor")
          }
          setloading(false)
        }).catch(err => {
          setloading(false)
        })
      } else {
        setError("Login yoki parolda xatolik bor")
      }
    } catch (err) {
    }
  }

  const [lang, setLang] = useState('uz');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    let lang = localStorage.getItem("lang")
    const languageValue = lang
    i18n.changeLanguage(languageValue);
    setLang(lang);
  }, [])

  const handleChange = (e) => {
    setLang(e.target.value);
    const languageValue = e.target.value
    i18n.changeLanguage(languageValue);
    localStorage.setItem("lang", e.target.value)

  };

  return (
    <Grid className="navbarMobile" container>
      <Grid item xs={4}>
        <h1 onClick={() => navigate("/")} className="main">Banktraining</h1>
      </Grid>
      <Grid className="d-flex align-center justify-end" item xs={8}>
        {/* <ul className="d-flex align-center">
          <li>Bosh sahifa</li>
          <li>Asosiy</li>
          <li onClick={() => setAddFileOpen(true)}>Fayl qo'shish</li>
        </ul> */}
        {userNavbarOpen ? (
          <CloseIcon
            onClick={() => setuserNavbarOpen(false)}
            className="main"
          />
        ) : (
          <MenuIcon onClick={() => setuserNavbarOpen(true)} className="main" />
        )}
      </Grid>
      <div
        className={`
         ${userNavbarOpen ? "mobileMenuActive" : "mobileMenuActiveNone"
          } mobileMenu`}
      >
        <div className="d-flex align-center justify-between">
          <h1>Banktraining</h1>
          <CloseIcon onClick={() => setuserNavbarOpen(false)} />
        </div>
        <ul>
          <li
            onClick={() => {
              setuserNavbarOpen(false)
              navigate("/gallery")
            }}
            className="d-flex align-center mr-10"
          >
            <AnchorLink className="white d-flex align-center"><CenterFocusStrongIcon />{t("gallery")}</AnchorLink>
          </li>
          <li
            className="d-flex align-center mr-10"
            onClick={() => {
              setuserNavbarOpen(false);
            }}
          >
            <AnchorLink className="white d-flex align-center" href='#about'> <CenterFocusStrongIcon />
            {t("about")}</AnchorLink>
          </li>
          <li
            onClick={() => {
              setuserNavbarOpen(false);
            }}
            className="d-flex align-center mr-10"
          >
            <AnchorLink className="white d-flex align-center" href='#courses'>  <CenterFocusStrongIcon />
            {t("courses")}</AnchorLink>
          </li>
          <li
            onClick={() => {
              setuserNavbarOpen(false);
            }}
            className="d-flex align-center mr-10"
          >
            <AnchorLink className="white d-flex align-center" href='#contact'> <CenterFocusStrongIcon />
            {t("contacts")}</AnchorLink>
          </li>
          <li
            onClick={() => {
              navigate("/userCertificates")
              setuserNavbarOpen(false);
            }}
            className="d-flex align-center mr-10"
          >
            <CenterFocusStrongIcon /> {t("certificates")}
          </li>
          <li
            className="d-flex align-center mr-10">
            {/* <LoginIcon /> */}
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={lang}
              style={{ minWidth: "80px" }}
              onChange={handleChange}
            >
              <MenuItem value={"uz"}>Uz</MenuItem>
              <MenuItem value={"ru"}>Ру</MenuItem>
              {/* <MenuItem value={30}>En</MenuItem> */}
            </Select>
          </li>
          <li
            className="d-flex align-center mr-10"
            onClick={() => {
              setuserNavbarOpen(false);
              loggedIn ? navigate("/admin") : handleOpen()
            }}>
            <LoginIcon />
            {t("login")}
          </li>
        </ul>
      </div>
      {/* <LoginModal open={open} /> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} className="loginContent">
          <div className="d-block">
            <label htmlFor="login">Login</label>
            <br />
            <input className="input" onChange={(e) => setLogin(e.target.value)} type="text" id="login" placeholder="login" />
            <br />
            <label htmlFor="password">Parol</label>
            <br />
            <div className="passwordWrapper input">
              <input onChange={(e) => setPassword(e.target.value)} type={show ? "text" : "password"} id="password" placeholder="password" />
              {
                show ?
                  <VisibilityOffOutlinedIcon className="main pointer" onClick={() => setShow(false)} />
                  :
                  <VisibilityOutlinedIcon className="main pointer" onClick={() => setShow(true)} />
              }
            </div>
            <p className="error-message">{error}</p>
            <button
              onClick={loginHandle}
              className="callUs"
              disabled={loading ? true : false
              }
            >
              {
                loading ? <CircularProgress style={{ height: "100% !important" }} /> : "Kirish"
              }  Kirish
            </button>
          </div>
        </Box>
      </Modal>
    </Grid>
  );
}
