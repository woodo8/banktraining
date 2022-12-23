import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/system/Unstable_Grid";
import "./adminMain.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { certData } from "../../datas/certificateDatas";
import TableElement from "../../components/tableElement/TableElement";
import { StateContext } from "../../context/context";
import AddFileComp from "../../components/addFileComp/addFileComp";
import { NavbarAdmin, NavbarMobile } from "../../components/navbarAdmin/NavbarAdmin";
import axios from "axios";
import refresh from "../../api/refresh";
import UploadNew from "../../components/uploadNew/uploadNew";
import Pagination from '@mui/material/Pagination';

export default function AdminMain() {
  const { addFileOpen, loggedIn, loginToggle, uploadNew } = useContext(StateContext);
  const [data, setdata] = useState([])

  const [count, setCount] = useState()
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };


  useEffect(() => {
    try {
      loggedIn && axios.get(`${process.env.REACT_APP_API_KEY}api/getAll/${page}`, {
        headers: {
          Authorization: `Bearer ${loggedIn}`
        }
      }).then(res => {
        setdata(res.data.data.content)
      }).catch(err => {
        refresh(err.response.status, err.response.statusText)
      })
    } catch (error) {
    }
  }, [loggedIn, loginToggle, page])
  useEffect(() => {
    try {
      loggedIn && axios.get(`${process.env.REACT_APP_API_KEY}api/getAll/1`, {
        headers: {
          Authorization: `Bearer ${loggedIn}`
        }
      }).then(res => {
        setCount(res.data.data.totalPages)
      }).catch(err => {
        refresh(err.response.status, err.response.statusText)
      })
    } catch (error) {
    }
  }, [loggedIn, loginToggle])
  return (
    <div>
      <NavbarAdmin />
      <NavbarMobile />
      <div className="mainComp">
        <AddFileComp />
        <Grid container>{
          uploadNew &&
          <>
            <Grid item xs={12}>
              <p className="headerText main">Yangi sertifikat yuklash</p>
            </Grid>
            <UploadNew />
          </>
        }
          <Grid item xs={12}>
            <p className="headerText main">Sertifikatlar</p>
          </Grid>
          <Grid style={{ margin: "20px 0" }} item xs={12}>
            <Pagination color="primary" count={count} page={page} onChange={handleChange} showFirstButton showLastButton />
          </Grid>
          <Grid item xs={12} >
            <TableContainer component={Paper}>
              <Table className="whiteCloud" sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="main bold" align="left">
                      Sertifikat raqami
                    </TableCell>
                    <TableCell className="main bold" align="left">
                      Qatnashuvchi
                    </TableCell>
                    <TableCell className="main bold" align="left">
                      Telefon raqami
                    </TableCell>
                    <TableCell className="main bold" align="left">
                      Manage
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length != 0 && data.map((item, index) => (
                    <TableElement key={index} item={item} index={index} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid style={{ margin: "20px 0" }} item xs={12}>
            <Pagination color="primary" count={count} page={page} onChange={handleChange} showFirstButton showLastButton />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
