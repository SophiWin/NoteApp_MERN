import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../helpers/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  let { user, dispatch } = useContext(AuthContext);
  let navigate = useNavigate();

  let logout = async () => {
    let res = await axios.post("/api/users/logout");
    if (res.status === 200) {
      dispatch({ type: "LOGOUT" });
      navigate("/sign-in");
    }
  };
  return (
    <nav className="flex justify-between items-center p-4 bg-white ">
      <div>
        <h2 className="font-bold text-2xl pl-4 text-teal-500">Note</h2>
      </div>
      <ul className="flex space-x-10">
        <li>
          <Link to="/" className="hover:text-teal-500">
            Home
          </Link>
        </li>

        <li>
          <Link to="/notes/create" className="hover:text-teal-500">
            Create
          </Link>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/sign-in" className="hover:text-teal-500">
                Login
              </Link>
            </li>

            <li>
              <Link to="/sign-up" className="hover:text-teal-500">
                Register
              </Link>
            </li>
          </>
        )}
        {!!user && (
          <li>
            <button onClick={logout} className="hover:text-teal-500">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
