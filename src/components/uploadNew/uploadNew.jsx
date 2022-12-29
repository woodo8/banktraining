import React, { useContext, useState } from 'react'
import Grid from "@mui/system/Unstable_Grid";
import "./uploadNew.css"
import { StateContext } from '../../context/context';
import axios from 'axios';
import refresh from '../../api/refresh';

export default function UploadNew() {
    const { setUploadNew, loggedIn, setloginToggle, loginToggle } = useContext(StateContext);
    const [name, setName] = useState("")
    const [certID, setCertID] = useState("")
    const [error, seterror] = useState("")
    const [number, setNumber] = useState("")
    const sendData = () => {
        try {
            name && certID && number ? axios.post(`${process.env.REACT_APP_API_KEY}api/save`,
                {
                    name: name,
                    certificateID: certID,
                    number: number
                }
                ,
                {
                    headers: {
                        Authorization: `Bearer ${loggedIn}`
                    }
                }).then(res => {
                    console.log(res)
                    if (res.data.code == 0) {
                        setName("")
                        setCertID("")
                        setNumber("")
                        setUploadNew(false)
                        setloginToggle(!loginToggle)
                    } else {
                        seterror(res.data.errMessage)
                    }
                }).catch(err => {
                    console.log(err)
                    refresh(err.response.status, err.response.statusText)
                    seterror("Amaliyot muvaffaqiyatsiz yakunlandi. Tizimda muammo yuzga keldi.")
                }) : seterror("Iltimos hamma inputlarni to'ldiring!")
        } catch (error) {
        }
    }

    return (
        <div className='uploadNew w-100'>
            <Grid container className='d-flex justify-between  '>
                <Grid item xs={12} md={6}>
                    <label className='main' htmlFor="name">Ism:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className='d-block' placeholder='Ism kiriting...' type="text" id='name' />
                </Grid>
                <Grid item xs={12} md={6}>
                    <label className='main' htmlFor="cId">Sertifikat raqami:</label>
                    <input value={certID} onChange={(e) => setCertID(e.target.value)} className='d-block' placeholder="Sertifikat id'sini kiriting..." type="text" id='cId' />
                </Grid>
            </Grid>
            <Grid container className='d-flex justify-between  '>
                <Grid item xs={12} md={6}>
                    <label className='main' htmlFor="number">Telefon raqami:</label>
                    <input value={number} onChange={(e) => setNumber(e.target.value)} className='d-block' placeholder="Telefon raqamini kiriting..." type="text" id='number' />                </Grid>
            </Grid>
            <div style={{ color: "red", margin: "20px 0" }} className="center">{error}</div>
            <Grid container className='d-flex justify-between  '>
                <Grid item xs={12} md={6}>
                    <button onClick={sendData} className='callUs' style={{ marginRight: "10px" }}>Yuklash</button>
                    <button className='callUs' onClick={() => setUploadNew(false)}>Bekor qilish</button>
                </Grid>
            </Grid>
        </div>
    )
}
