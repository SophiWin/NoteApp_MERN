import axios from "../helpers/axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function SignInForm() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, seterror] = useState(null);
  let navigate = useNavigate();
  let { dispatch } = useContext(AuthContext);
  let login = async (e) => {
    try {
      e.preventDefault();
      seterror(null);
      let data = {
        email,
        password,
      };

      let res = await axios.post("/api/users/login", data, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch({ type: "LOGIN", payload: res.data.user });
        navigate("/");
      }
    } catch (e) {
      seterror(e.response.data.error);
    }
  };
  return (
    <div className="w-full max-w-lg mx-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={login}
      >
        <h1 className="text-2xl font-bold text-center">Login Form</h1>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            login
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-600"
            to="/sign-up"
          >
            Don't have an account? Register here!
          </Link>
        </div>
      </form>
    </div>
  );
}
