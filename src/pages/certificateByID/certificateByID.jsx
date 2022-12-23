import React, { useEffect, useContext, useState } from 'react'
import { NavbarAdmin, NavbarMobile } from '../../components/navbarAdmin/NavbarAdmin'
import "../certificates/certificates.css"
import Grid from "@mui/system/Unstable_Grid";
import FeedbackIcon from '@mui/icons-material/Feedback';
import { MagnifyingGlass } from 'react-loader-spinner';
import axios from 'axios';
import { StateContext } from '../../context/context';
import file from "../../assets/certificate_11-30.pdf"
import { PDFReader } from 'reactjs-pdf-reader';
import { useNavigate, useParams } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import refresh from '../../api/refresh';

export default function CertficatesByID() {
    const { loggedIn } = useContext(StateContext)
    const [allData, setallData] = useState([])
    const [certId, setCertId] = useState("")
    const [notFound, setnotFound] = useState(true)
    const [loader, setLoader] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()
    const [failure, setfailure] = useState(null)

    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    useEffect(() => {
        setInnerWidth(window.innerWidth)
    }, [window.innerWidth])

    useEffect(() => {
        try {
            id && axios.get(`${process.env.REACT_APP_API_KEY}api/searchById/${id}`, {
            }).then(res => {
                if (res.data.data) {
                    setnotFound(false)
                    setfailure(false)
                } else {
                    setnotFound(true)
                    setfailure(true)
                }
            }).catch(err => {
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
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = `${process.env.REACT_APP_API_KEY}auth/download/${id}.pdf`;
                alink.click();
            })
        })
    }
    return (
        <div className='certificates certificatesUser'>
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
                                    <PDFReader className="pdf-wrapper" onDocumentComplete={() => {
                                        setTimeout(() => {
                                            setLoader(false)
                                        }, 3000);
                                    }} url={`${process.env.REACT_APP_API_KEY}auth/download/${id}`} />
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