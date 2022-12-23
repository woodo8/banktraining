import { Navigate, useNavigate } from "react-router-dom"

export default function refresh(code, statusText) {
    // const navigate = useNavigate()

    if (code == 401 || code == 403 || statusText === "Unauthorized") {
        localStorage.removeItem("access")
        // navigate("/")
    }
}
// import React from 'react'

// export default function refresh() {
//     return (
//         <div>refresh</div>
//     )
// }
