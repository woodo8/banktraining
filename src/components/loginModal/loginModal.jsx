// import React, { useState, useEffect } from 'react'
// import Modal from '@mui/material/Modal';
// import { Box } from "@mui/material";
// import "./loginmodal.css"
// import axios from 'axios';




// export default function LoginModal(props) {
//     const [open, setOpen] = useState(false)
    

//     const loginHandle = () => {
//         if (login && password) {
//             try {
//                 axios.post(`${process.env.REACT_APP_API_KEY}auth/check`,
//                     {
//                         username: login,
//                         password: password,
//                     }
//                 ).then(res => console.log(res)).catch(err => console.log(err))
//             } catch (err) {
//                 console.log(err)
//             }
//         }
//     }
//     return (
//         // <Modal
//         //     open={open}
//         //     onClose={handleClose}
//         //     aria-labelledby="modal-modal-title"
//         //     aria-describedby="modal-modal-description"
//         // >
//         //     <Box sx={modalStyle} className="loginContent">
//         //         <div className="d-block">
//         //             <label htmlFor="login">Login</label>
//         //             <br />
//         //             <input onChange={(e) => setLogin(e.target.value)} type="text" id="login" placeholder="login" />
//         //             <br />
//         //             <h1 className='main'>{login}</h1>
//         //             <h1>{password}</h1>
//         //             <label htmlFor="password">Parol</label>
//         //             <br />
//         //             <div className="passwordWrapper">
//         //                 <input onChange={(e) => setPassword(e.target.value)} type="text" id="password" placeholder="password" />
//         //             </div>
//         //             <button onClick={loginHandle} className="callUs">Kirish</button>
//         //         </div>
//         //     </Box>
//         // </Modal>)
// }
