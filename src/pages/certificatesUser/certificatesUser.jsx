
import React, { useEffect, useContext, useState } from 'react'
import { NavbarAdmin, NavbarMobile } from '../../components/navbarAdmin/NavbarAdmin'
import "../certificates/certificates.css"
import Grid from "@mui/system/Unstable_Grid";

import FeedbackIcon from '@mui/icons-material/Feedback';
import { MagnifyingGlass } from 'react-loader-spinner';
import axios from 'axios';
import { StateContext } from '../../context/context';
import { PDFReader } from 'reactjs-pdf-reader';
import DownloadIcon from '@mui/icons-material/Download';
import { NavbarUser, NavbarUserMobile } from '../../components/navbarUser/NavbarUser';
import { useNavigate } from 'react-router-dom';

export default function CertficatesUser() {
  const { loggedIn } = useContext(StateContext)
  const [allData, setallData] = useState([])
  const [certId, setCertId] = useState("")
  const [notFound, setnotFound] = useState(true)
  const [loader, setLoader] = useState(false)

  const [link, setLink] = useState("")
  const navigate = useNavigate()
  const [failure, setfailure] = useState(null)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  useEffect(() => {
    setInnerWidth(window.innerWidth)
  }, [window.innerWidth])


  const searchCertificate = () => {
    try {
      certId && axios.get(`${process.env.REACT_APP_API_KEY}api/searchById/${certId}`).then(res => {
        if (res.data.data) {
          setnotFound(false)
          setLink(res.data.data.link)
          setfailure(false)
        } else {
          setnotFound(true)
          setLink("")
          setfailure(true)
        }
      }).catch(err => { })
    } catch (error) {
    }
  }
  const downloadCertificate = () => {
    fetch(`${process.env.REACT_APP_API_KEY}auth/download/${certId}`).then(response => {
      response.blob().then(blob => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = `${process.env.REACT_APP_API_KEY}auth/download/${certId}.pdf`;
        alink.click();
      })
    })
  }
  return (
    <div className='certificates certificatesUser'>
      {/* <NavbarUser /> */}
      <Grid className="navbar d-flex justify-between user" container>
        <Grid item xs={6} md={4}>
          <h1 onClick={() => navigate("/")} className="main pointer">Banktraining</h1>
        </Grid>
        <Grid
          item xs={6} md={4}
          className="d-flex justify-end"
        >
          {!notFound &&
            <button className='callUs downloadUser d-flex align-center' onClick={downloadCertificate}>
              {innerWidth > 400 && "Yuklab olish"} <DownloadIcon style={{ marginLeft: innerWidth > 400 ? "10px" : "0" }} />
            </button>}
        </Grid>
      </Grid>
      <div className="mainComp">
        <Grid container>
          <Grid className="d-flex justify-between align-center d-sm-block" item xs={12}>
            <p className="headerText main">Id bo'yicha izlash</p>
          </Grid>
          <Grid className="d-flex justify-between align-center" item xs={12} xsOffset={0} md={6} mdOffset={3}>
            <input value={certId} onChange={(e) => setCertId(e.target.value)} className='searchInput' type="text" />
            <button onClick={searchCertificate} className="callUs">Izlash</button>
          </Grid>
          {
            loader &&
            <Grid className="center errorBlock" item xs={6} xsOffset={3}>
              <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="mainIcon"
                glassColor='#c0efff'
                color='#34438e'
              />
              <p>Sertifikat yuklanmoqda...</p>
            </Grid>
          }

          <Grid className="center errorBlock" item xs={12}>
            {
              !notFound
                ?
                <>
                  <PDFReader className="pdf-wrapper" url={`${process.env.REACT_APP_API_KEY}auth/download/${certId}`} />
                </> : failure &&
                <div className='center'>
                  <FeedbackIcon className='mainIcon' />
                  <p>Sertifikat topilmadi!!</p>
                </div>
            }
          </Grid>

        </Grid>
      </div>
    </div>
  )
}