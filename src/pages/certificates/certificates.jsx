import React, { useEffect, useContext, useState } from 'react'
import { NavbarAdmin, NavbarMobile } from '../../components/navbarAdmin/NavbarAdmin'
import "./certificates.css"
import Grid from "@mui/system/Unstable_Grid";

import FeedbackIcon from '@mui/icons-material/Feedback';
import { MagnifyingGlass } from 'react-loader-spinner';
import axios from 'axios';
import { StateContext } from '../../context/context';
import file from "../../assets/certificate_11-30.pdf"
import { PDFReader } from 'reactjs-pdf-reader';
import { useParams } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import refresh from '../../api/refresh';

export default function Certficates() {
  const { loggedIn } = useContext(StateContext)
  const [allData, setallData] = useState([])
  const [certId, setCertId] = useState("")
  const [notFound, setnotFound] = useState(true)
  const [loader, setLoader] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    try {
      axios.get(`${process.env.REACT_APP_API_KEY}api/searchById/${id}`, {
        headers: {
          Authorization: `Bearer ${loggedIn}`
        }
      }).then(res => {
        if (res.data.data) {
          setnotFound(false)
        } else {
          setnotFound(true)
        }
      }).catch(err => {
        refresh(err.response.status, err.response.statusText)

      })
    } catch (error) {
    }
  }, [id])

  setTimeout(() => {
    setLoader(false)
  }, 3000);

  const downloadCertificate = () => {
    fetch(`${process.env.REACT_APP_API_KEY}auth/download/${id}`).then(response => {
      response.blob().then(blob => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = `${process.env.REACT_APP_API_KEY}auth/download/${id}.pdf`;
        alink.click();
      })
    })
  }
  return (
    <div className='certificates'>
      <NavbarAdmin />
      <NavbarMobile />
      <div className="mainComp">
        <Grid container>
          <Grid className="d-flex justify-between align-center d-sm-block" item xs={12}>
            <p className="headerText main">Id bo'yicha izlash</p>
            <button className='callUs d-flex align-center' onClick={downloadCertificate}>Yuklab olish <DownloadIcon style={{ marginLeft: "10px" }} /></button>
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
              &&
              <>
                <PDFReader className="pdf-wrapper" onDocumentComplete={() => {
                  setTimeout(() => {
                    setLoader(false)
                  }, 3000);
                }} url={`${process.env.REACT_APP_API_KEY}auth/download/${id}`} />
              </>
            }
          </Grid>
        </Grid>
      </div>
    </div>
  )
}