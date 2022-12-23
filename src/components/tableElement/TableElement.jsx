import React, { useState, useEffect, useContext } from "react";
import "./TableElement.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SettingsBackupRestoreRoundedIcon from "@mui/icons-material/SettingsBackupRestoreRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import axios from "axios";
import { StateContext } from "../../context/context";
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import refresh from "../../api/refresh";
import { CopyToClipboard } from 'react-copy-to-clipboard';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TableElement(props) {
  const { index, item } = props;
  const { loggedIn, loginToggle, setloginToggle } = useContext(StateContext)
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [id, setId] = useState("")
  const [number, setNumber] = useState("")

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openSms, setOpenSms] = useState(false);
  const handleOpenSms = () => setOpenSms(true);
  const handleCloseSms = () => setOpenSms(false);
  const navigate = useNavigate()
  const [copied, setcopied] = useState(false)

  useEffect(() => {
    setName(item.name)
    setSurname(item.surname)
    setId(item.certificateID)
    setNumber(item.number)
  }, [item])


  useEffect(() => {
    copied && setTimeout(() => {
      setcopied(false)
    }, 3000);
  }, [copied])


  const updateData = (e, id) => {
    try {
      axios.put(`${process.env.REACT_APP_API_KEY}api/update/${id}`, {
        name: name,
        number: number,
        certificateID: id,
      }, {
        headers: {
          Authorization: `Bearer ${loggedIn}`
        }
      }).then(res => {
        setloginToggle(!loginToggle)
      }).catch(err => {
        refresh(err.response.status, err.response.statusText)
      })
    } catch (error) {
    }
  }
  const deleteData = (id) => {
    try {
      axios.delete(`${process.env.REACT_APP_API_KEY}api/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${loggedIn}`
        }
      }).then(res => {
        setloginToggle(!loginToggle)
      }).catch(err => {
        refresh(err.response.status, err.response.statusText)
      })
    } catch (error) {

    }
  }

  const sendSMS = (e, id) => {
    try {
      axios.post(`${process.env.REACT_APP_API_KEY}api/sms/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${loggedIn}`
        }
      }).then(res => {}).catch(err => {
        refresh(err.response.status, err.response.statusText)
      })
    } catch (error) { }
  }

  return (
    <TableRow
      key={index}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell className="main" align="left">
        <p>{item.certificateID}</p>
      </TableCell>
      <TableCell className="main td-input" align="left">
        {editing ? (
          <input value={name} onChange={(e) => setName(e.target.value)} className="tableInput" type="text" />
        ) : (
          <p>{item.name}</p>
        )}
      </TableCell>
      <TableCell className="main td-input" align="left">
        {editing ? (
          <input value={number} onChange={(e) => setNumber(e.target.value)} className="tableInput" type="text" />
        ) : (
          <p className="center"> {item.number}</p>
        )}
      </TableCell>
      <TableCell className="main td-table" align="left">
        <div className="d-flex fl-column">
          {editing

            ? <div
              onClick={(e) => {
                updateData(e, id)
                setEditing(false)
              }} className="d-flex align-center pointer ">
              <DoneRoundedIcon className="manageIcons doneAnim refresh pointer" />
              Yakunlash
            </div>
            :
            <div onClick={() => setEditing(true)} className="d-flex align-center pointer ">
              <BorderColorRoundedIcon className="manageIcons refresh pointer" />
              Tahrirlash
            </div>
          }
          <div onClick={() => { navigate(`/certificates/${id}`) }} className="d-flex align-center pointer ">
            <PlagiarismIcon title={"sertifikatni ko'rish"} className="manageIcons delete pointer" />
            Sertifikat
          </div>
          <div onClick={handleOpenSms} className="d-flex align-center pointer ">
            <SettingsBackupRestoreRoundedIcon className="manageIcons refresh pointer" />
            SMS
          </div>
          <div
            onClick={handleOpen}
            //  onClick={() => deleteData(id)}
            className="d-flex align-center pointer ">
            <DeleteForeverRoundedIcon className="manageIcons delete pointer" />
            O'chirish
          </div>
          <CopyToClipboard text={`http://banktraining.uz/userCertificates/${id}`}
            onCopy={() => setcopied(true)}>
            <div
              className="d-flex align-center pointer ">
              {copied ?
                <DoneRoundedIcon className="doneAnim manageIcons refresh pointer" /> :
                <ContentCopyIcon className="manageIcons refresh pointer" />
              }
              {copied ? "Copied" : "Copy"}
            </div>
          </CopyToClipboard>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <p className="main bold">
                Malumotlar o'chirilmoqda !!!
              </p>
              <br />
              <div className="d-flex justify-end">
                <button className="modalSubmit callUs" onClick={() => {
                  deleteData(id)
                  handleClose()
                }}>
                  Ok
                </button>
              </div>
            </Box>
          </Modal>
          <Modal
            open={openSms}
            onClose={handleCloseSms}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <p className="main bold">
                Ushbu foydalanuvchiga qaytadan SMS jo'natilmoqda !!!
              </p>
              <br />
              <div className="d-flex justify-end">

                <button className="modalSubmit callUs" onClick={(e) => {
                  sendSMS(e, id)
                  handleCloseSms()
                }}>
                  Ok
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      </TableCell>
    </TableRow>
  );
}
