import React, { useContext, useEffect, useState } from "react";
import "./addFileComp.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { StateContext } from "../../context/context";
import Flip from "react-reveal/Flip";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
import axios from "axios";
import refresh from "../../api/refresh";

export default function AddFileComp() {
  const { setAddFileOpen, addFileOpen, loggedIn, loginToggle, setloginToggle } = useContext(StateContext);
  const [file, setFile] = useState("");
  const [succesfulUpload, setsuccesfulUpload] = useState(false)
  const [uploadError, setuploadError] = useState(false)


  useEffect(() => {
    succesfulUpload && setTimeout(() => {
      setsuccesfulUpload(false)
      setAddFileOpen(false)
    }, 1500);
  }, [succesfulUpload])

  const sendFileFunc = (e) => {
    const formData = new FormData()
    formData.append("file", file[0])
    // https://bank-training-uz.herokuapp.com/api/getAll/1
    try {
      axios.post(`${process.env.REACT_APP_API_KEY}api/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${loggedIn}`
          }
        }).then(res => {
          setsuccesfulUpload(true)
          setuploadError(false)
          setloginToggle(!loginToggle)
        }).catch(err => {
          setuploadError(true)
          refresh(err.response.status, err.response.statusText)
        })
    } catch (error) {

    }
  }

  return (
    <div className={`${addFileOpen ? "addActive" : "d-none"}`}>
      <Flip top>
        <div className="relative">
          <div className="content">
            <p className="w-100 headerText main center">
              Fayl kiriting (excel)
            </p>
            <div>
              {file && (
                <p className="main d-flex align-center justify-center">
                  {" "}
                  <FileCopyRoundedIcon /> {file[0].name}
                </p>
              )}

              <input
                onChange={(e) => setFile(e.target.files)}
                className="v-hidden"
                type="file"
                id="file"
              />
              <label className="pointer" htmlFor="file">
                <div className="addFileWrapper">
                  <p className="main center">
                    <FileCopyRoundedIcon />
                  </p>
                  <p className="center">...</p>
                  <p className="center">Faylni tanlang</p>
                </div>
              </label>
            </div>
            <button onClick={() => {
              sendFileFunc()
            }} className="sendFile">
              Jo'natish
            </button>


            {succesfulUpload && <p className="center">Fayl muvaffaqiyatli yuklandi</p>}
            {uploadError && <p style={{ color: "red" }} className="center">Fayl yuklashda xatolik yuz berdi</p>}

            <CloseRoundedIcon
              onClick={() => setAddFileOpen(false)}
              className="pointer main closeIcon"
            />
          </div>
        </div>
      </Flip>
    </div>
  );
}
