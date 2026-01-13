// import { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../design/users.css";

// function Users() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");


//     if (!token) {
//       navigate("/login");
//       return;
//     }


//     axios
//       .get("http://localhost:4000/api/role/users", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       .catch(() => {

//         localStorage.removeItem("token");
//         navigate("/login");
//       });
//   }, [navigate]);

//   return (
//     <div className="role-page">
//       <div className="role-card">
//         <p className="role-subtitle">Tell us who you are?</p>

//         <div className="role-options">
//           {/* JOB SEEKER */}
//           <button
//             className="role-button primary"
//             onClick={() => navigate("/")}
//           >
//             Job Seeker
//           </button>

//           {/* EMPLOYEE */}
//           <button
//             className="role-button secondary"
//             onClick={() => {
//               localStorage.setItem("role", "employee");
//               navigate("/single");
//             }}
//           >
//             Employee
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Users;
